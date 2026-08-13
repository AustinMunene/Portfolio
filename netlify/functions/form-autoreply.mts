import crypto from 'node:crypto';

/**
 * Handles a contact-form submission: sends the acknowledgement to whoever
 * submitted it, and a formatted notification of the enquiry to me.
 *
 * Netlify Forms cannot do the first of those itself: its only notification
 * types are a fixed recipient email, Slack, and an outgoing webhook, none of
 * which can address the submitter. So Netlify still captures, filters and
 * stores every submission, and this function - wired to the submission_created
 * webhook - sends the two emails.
 *
 * Requires these env vars, set in the Netlify UI rather than in the repo:
 *   RESEND_API_KEY       - server-side key; must never reach the client bundle
 *   FORM_WEBHOOK_SECRET  - shared with the webhook, see verify() below
 *   AUTOREPLY_FROM       - e.g. "Austin Munene <hello@your-verified-domain>"
 *   NOTIFY_TO            - optional; where the enquiry notification goes. Left
 *                          unset, that email is skipped and Netlify's own plain
 *                          email notification remains the only one.
 *
 * Note on NOTIFY_TO while AUTOREPLY_FROM is still the shared onboarding@
 * resend.dev sender: Resend will only deliver to the address that owns the
 * Resend account. Any other value fails with a 403 until a domain is verified.
 */

const REPLY_TO = 'saviusmunene@gmail.com';
const SITE_URL = 'https://www.austin.is-a.dev';
/** wa.me wants the international form with no plus and no leading zero. */
const WHATSAPP_URL = 'https://wa.me/254743988415';
const PHONE_TEL = '+254743988415';
const PHONE_DISPLAY = '0743 988 415';

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

/** Submitted values land inside an HTML email, so they cannot go in raw. */
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );

/** Escaped, with newlines preserved as line breaks. */
const escapeMultiline = (value: string) => escapeHtml(value).replace(/\r?\n/g, '<br>');

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/**
 * Shared shell for both emails.
 *
 * Tables rather than flex/grid: Outlook renders divs with modern layout
 * unpredictably, and a centred table is the one construct every client agrees
 * on. Every colour is inline for the same reason - <style> blocks get stripped.
 *
 * `preheader` is the grey line clients show next to the subject in the inbox
 * list. Without one they scrape the first words of the body, which reads like
 * a broken template.
 */
const layout = ({ preheader, body }: { preheader: string; body: string }) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:#f4f4f7">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="max-width:560px;background:#ffffff;border:1px solid #e5e5eb;border-radius:12px">
          <tr>
            <td style="padding:28px 32px 0">
              <p style="margin:0;font-family:${FONT};font-size:16px;font-weight:600;color:#12121a">
                Austin Munene
              </p>
              <p style="margin:2px 0 0;font-family:${FONT};font-size:13px;color:#6b6b76">
                Frontend &amp; QA Engineer
              </p>
            </td>
          </tr>
          <tr><td style="padding:20px 32px 0"><hr style="border:none;border-top:1px solid #e5e5eb;margin:0"></td></tr>
          <tr>
            <td style="padding:24px 32px 32px;font-family:${FONT};font-size:15px;line-height:1.6;color:#2a2a33">
              ${body}
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:${FONT};font-size:12px;color:#8a8a95">
          Sent from <a href="${SITE_URL}" style="color:#5b5bd6;text-decoration:none">www.austin.is-a.dev</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

type Mail = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

/**
 * Every message carries a plain-text alternative as well as HTML. Text-only
 * clients aside, a multipart message scores better with spam filters than a
 * bare HTML one.
 */
const send = async (apiKey: string, from: string, mail: Mail) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    }),
  });

export default async (req: Request) => {
  const apiKey = process.env.RESEND_API_KEY;
  const secret = process.env.FORM_WEBHOOK_SECRET;
  const from = process.env.AUTOREPLY_FROM;
  const notifyTo = process.env.NOTIFY_TO;

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
  const message: string = (data.message ?? '').trim();

  // Anything that is not plausibly an address would just bounce.
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    console.warn('form-autoreply: no usable address on the submission');
    return new Response('no recipient', { status: 200 });
  }

  const safeName = escapeHtml(name || 'Someone');
  const firstName = escapeHtml(name.split(/\s+/)[0] || 'there');
  const safeEmail = escapeHtml(email);

  // Nairobi time, so the timestamp matches the clock I actually read.
  const submittedAt = new Date(submission.created_at ?? Date.now()).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Nairobi',
  });

  // ---------------------------------------------------------------- reply
  const replyHtml = layout({
    preheader: `Thanks ${name || 'for getting in touch'} - your enquiry reached me and I'll reply shortly.`,
    body: `
      <p style="margin:0 0 16px">Hi ${firstName},</p>
      <p style="margin:0 0 16px">
        Thanks for your enquiry &mdash; it reached me, and I'll get back to you shortly.
      </p>
      <p style="margin:0 0 16px">
        If it's urgent, kindly reach me directly on
        <a href="${WHATSAPP_URL}" style="color:#5b5bd6;text-decoration:none">WhatsApp</a>
        or call via
        <a href="tel:${PHONE_TEL}" style="color:#5b5bd6;text-decoration:none">${PHONE_DISPLAY}</a>,
        and I'll respond to you immediately.
      </p>
      <p style="margin:24px 0 0">
        Austin Munene<br>
        <span style="color:#6b6b76">Frontend &amp; QA Engineer</span><br>
        <a href="${SITE_URL}" style="color:#5b5bd6;text-decoration:none">${SITE_URL}</a>
      </p>`,
  });

  const replyText = [
    `Hi ${name.split(/\s+/)[0] || 'there'},`,
    '',
    "Thanks for your enquiry - it reached me, and I'll get back to you shortly.",
    '',
    `If it's urgent, kindly reach me directly on WhatsApp or call via ${PHONE_DISPLAY}, and I'll respond to you immediately.`,
    '',
    'Austin Munene',
    'Frontend & QA Engineer',
    SITE_URL,
  ].join('\n');

  const replyRes = await send(apiKey, from, {
    to: email,
    replyTo: REPLY_TO,
    subject: 'Thanks for getting in touch',
    html: replyHtml,
    text: replyText,
  });

  if (!replyRes.ok) {
    // 500 here on purpose: this one is worth a retry. Returning before the
    // notification also stops a retry from sending me duplicate copies.
    const detail = await replyRes.text();
    console.error(`form-autoreply: Resend returned ${replyRes.status} - ${detail}`);
    return new Response('send failed', { status: 500 });
  }

  // --------------------------------------------------------- notification
  if (!notifyTo) {
    console.log('form-autoreply: NOTIFY_TO unset, skipping the enquiry notification');
    return new Response('sent', { status: 200 });
  }

  const notifyHtml = layout({
    preheader: `${name || 'Someone'} <${email}> - ${message.slice(0, 90)}`,
    body: `
      <p style="margin:0 0 20px;font-size:16px;font-weight:600;color:#12121a">New enquiry</p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
             style="font-family:${FONT};font-size:14px;color:#2a2a33">
        <tr>
          <td style="padding:6px 0;color:#6b6b76;width:88px">Name</td>
          <td style="padding:6px 0">${safeName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b6b76">Email</td>
          <td style="padding:6px 0">
            <a href="mailto:${safeEmail}" style="color:#5b5bd6;text-decoration:none">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b6b76">Received</td>
          <td style="padding:6px 0">${escapeHtml(submittedAt)} (EAT)</td>
        </tr>
      </table>
      <p style="margin:22px 0 8px;color:#6b6b76;font-size:13px">Message</p>
      <div style="padding:14px 16px;background:#f7f7fa;border-left:3px solid #5b5bd6;border-radius:4px;
                  font-size:14px;line-height:1.6;color:#2a2a33">
        ${escapeMultiline(message) || '<span style="color:#8a8a95">(no message)</span>'}
      </div>
      <p style="margin:22px 0 0;font-size:13px;color:#6b6b76">
        Replying to this email goes straight to ${safeName}.
      </p>`,
  });

  const notifyText = [
    'New enquiry',
    '',
    `Name:     ${name || 'Unknown'}`,
    `Email:    ${email}`,
    `Received: ${submittedAt} (EAT)`,
    '',
    'Message:',
    message || '(no message)',
    '',
    `Replying to this email goes straight to ${name || 'them'}.`,
  ].join('\n');

  // Reply-To is the enquirer, so hitting Reply answers them rather than me.
  const notifyRes = await send(apiKey, from, {
    to: notifyTo,
    replyTo: email,
    subject: `New enquiry from ${name || email}`,
    html: notifyHtml,
    text: notifyText,
  });

  if (!notifyRes.ok) {
    // Deliberately not a 500: the acknowledgement already went out, and a retry
    // would send the submitter a second copy of it. Netlify's own email
    // notification still covers me, so this is logged and swallowed.
    const detail = await notifyRes.text();
    console.error(`form-autoreply: notification failed, ${notifyRes.status} - ${detail}`);
    return new Response('sent, notification failed', { status: 200 });
  }

  return new Response('sent', { status: 200 });
};
