import crypto from 'node:crypto';

/**
 * Sends the "thanks, I'll get back to you" reply to whoever submitted the
 * contact form.
 *
 * Netlify Forms cannot do this itself: its only notification types are a fixed
 * recipient email, Slack, and an outgoing webhook, none of which can address the
 * submitter. So Netlify still captures, filters and stores every submission, and
 * this function - wired to the submission_created webhook - does nothing except
 * send the acknowledgement.
 *
 * Requires three env vars, set in the Netlify UI rather than in the repo:
 *   RESEND_API_KEY       - server-side key; must never reach the client bundle
 *   FORM_WEBHOOK_SECRET  - shared with the webhook, see verify() below
 *   AUTOREPLY_FROM       - e.g. "Austin Munene <hello@your-verified-domain>"
 */

const REPLY_TO = 'saviusmunene@gmail.com';

/**
 * Netlify signs the webhook with a JWS whose payload carries a SHA-256 of the
 * body. Without checking it this endpoint is an open relay - anyone who finds
 * the URL could POST a payload and have Resend send mail from the domain, at
 * the site's expense and over its sending reputation.
 */
const verify = (rawBody: string, signature: string | null, secret: string) => {
  if (!signature) return false;

  const parts = signature.split('.');
  if (parts.length !== 3) return false;
  const [header, payload, provided] = parts;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url');

  // Length-independent compare: timingSafeEqual throws on a length mismatch.
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  // A valid signature over a *different* body would otherwise still pass.
  const claimed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  const actual = crypto.createHash('sha256').update(rawBody).digest('hex');
  return claimed.sha256 === actual;
};

/** The name lands inside an HTML email, so it cannot go in raw. */
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );

export default async (req: Request) => {
  const apiKey = process.env.RESEND_API_KEY;
  const secret = process.env.FORM_WEBHOOK_SECRET;
  const from = process.env.AUTOREPLY_FROM;

  // 200 rather than 500: a missing key is not something a retry will fix, and
  // Netlify would otherwise re-deliver this payload on a schedule forever.
  if (!apiKey || !secret || !from) {
    console.error('form-autoreply: missing RESEND_API_KEY, FORM_WEBHOOK_SECRET or AUTOREPLY_FROM');
    return new Response('not configured', { status: 200 });
  }

  const rawBody = await req.text();

  if (!verify(rawBody, req.headers.get('x-webhook-signature'), secret)) {
    console.warn('form-autoreply: rejected an unsigned or mismatched payload');
    return new Response('bad signature', { status: 401 });
  }

  const submission = JSON.parse(rawBody);
  const data = submission.data ?? {};
  const name: string = (data.name ?? '').trim();
  const email: string = (data.email ?? '').trim();

  // Anything that is not plausibly an address would just bounce.
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    console.warn('form-autoreply: no usable address on the submission');
    return new Response('no recipient', { status: 200 });
  }

  const firstName = escapeHtml(name.split(/\s+/)[0] || 'there');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: REPLY_TO,
      subject: 'Thanks for getting in touch',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">
          <p>Hi ${firstName},</p>
          <p>Thanks for your enquiry - it reached me, and I'll get back to you shortly.</p>
          <p>If it's urgent, replying to this email comes straight to me.</p>
          <p style="margin-top:24px">Austin Munene<br>
            <span style="color:#666">Frontend + QA Engineer</span><br>
            <a href="https://austin.is-a.dev" style="color:#5b5bd6">austin.is-a.dev</a>
          </p>
        </div>
      `.trim(),
    }),
  });

  if (!response.ok) {
    // 500 here on purpose: this one is worth a retry.
    const detail = await response.text();
    console.error(`form-autoreply: Resend returned ${response.status} - ${detail}`);
    return new Response('send failed', { status: 500 });
  }

  return new Response('sent', { status: 200 });
};
