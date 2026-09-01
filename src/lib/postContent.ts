/*
 * Post bodies are authored as plain HTML strings with no ids on their headings,
 * so there was nothing for a table of contents to link to. Rather than hand-
 * writing ids into ~40 headings per post and keeping them in sync, they are
 * derived from the heading text at render time.
 */

export interface Heading {
  id: string;
  text: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60) || 'section';

/**
 * Returns the body with an id on every `<h2>`, plus the list of those headings.
 *
 * Only h2s are collected. The posts use h3 for sub-points inside a section, and
 * including those turned a long post's contents into a wall roughly as long as
 * the post itself.
 */
export const withHeadingIds = (html: string): { html: string; headings: Heading[] } => {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();

  const out = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (match, attrs = '', inner) => {
    // Respect an id the author wrote by hand rather than overwriting it.
    if (attrs && /\sid=/.test(attrs)) return match;

    const text = String(inner).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const base = slugify(text);

    // Two sections can legitimately share a title; ids cannot.
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    headings.push({ id, text });
    return `<h2 id="${id}"${attrs || ''}>${inner}</h2>`;
  });

  return { html: out, headings };
};
