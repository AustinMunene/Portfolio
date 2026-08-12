import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FIELDS = { name: '', email: '', message: '' };

/** Netlify expects the body url-encoded, not JSON. */
const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

/**
 * Contact form, submitted to Netlify Forms.
 *
 * There is no API key and no backend here on purpose: Netlify captures the POST
 * at the CDN edge. The catch is that its form detection parses the *static* HTML
 * produced at build time, and this form only exists once React has mounted - so
 * the real registration lives in a hidden copy in index.html. The `name` here and
 * the field names below must stay in step with that copy, or submissions 404.
 */
const ContactForm: React.FC = () => {
  const [values, setValues] = useState(FIELDS);
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Let a failed attempt be retried without the error text lingering.
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    // Read the honeypot off the form rather than state: it is never rendered as
    // a controlled input, so a bot that fills it leaves the value only in the DOM.
    const botField = (form.elements.namedItem('bot-field') as HTMLInputElement)?.value ?? '';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', 'bot-field': botField, ...values }),
      });

      if (!response.ok) throw new Error(`Netlify returned ${response.status}`);

      setStatus('success');
      setValues(FIELDS);
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-xl bg-surface-raised border border-line px-4 py-3 text-sm text-fg ' +
    'placeholder:text-fg-subtle transition-colors duration-200 hover:border-brand-line ' +
    'focus:border-brand-line disabled:opacity-60';

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass glass-strong rounded-2xl p-8 md:p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-soft border border-brand-line mb-4">
          <Check className="w-5 h-5 text-brand" />
        </span>
        <h3 className="text-xl font-display text-fg mb-2">Message sent</h3>
        <p className="text-sm text-fg-muted">
          Thanks - I read everything that comes through here and will get back to you.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-fg-muted hover:text-fg transition-colors underline underline-offset-4"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="glass glass-strong rounded-2xl p-6 md:p-8 text-left"
    >
      {/* Mirrors the hidden static form; Netlify keys the submission off this. */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot: visually gone and skipped by the keyboard, so only a bot fills it. */}
      <p className="hidden" aria-hidden="true">
        <label>
          Do not fill this in: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-medium text-fg-muted mb-2">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium text-fg-muted mb-2">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            disabled={status === 'submitting'}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="contact-message" className="block text-xs font-medium text-fg-muted mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          placeholder="What are you building, and where is it breaking?"
          className={`${inputClass} resize-y min-h-[120px]`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-60 active:scale-95"
        >
          {status === 'submitting' ? 'Sending...' : 'Send message'}
          <Send className={`w-4 h-4 ${status === 'submitting' ? 'animate-pulse' : ''}`} />
        </button>

        {status === 'error' && (
          <span
            className="inline-flex items-center gap-2 text-sm text-fg-muted"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            That did not send. Email me directly and it will reach me.
          </span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
