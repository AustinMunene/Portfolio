import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  /**
   * Which half of the site this section belongs to.
   * `light` = business-facing (services, process, why-me, contact).
   * `dark`  = craft-facing (work, lab, blog).
   * The tonal switch is the signal to the visitor about which mode they are in,
   * so pick it by meaning rather than by visual rhythm.
   */
  tone?: 'light' | 'dark';
  id?: string;
  className?: string;
};

/**
 * Tone-scoped section wrapper.
 *
 * Sets `data-tone`, which rebinds --surface/--fg/--border for everything inside
 * (see index.css). Children styled with the token utilities - bg-surface,
 * text-fg, text-fg-muted, border-line - then work in either tone with no
 * conditional classes and no duplicated markup.
 */
const Section = ({ children, tone = 'dark', id, className = '' }: SectionProps) => (
  <section
    id={id}
    data-tone={tone}
    className={`relative bg-surface text-fg transition-colors duration-500 ${className}`}
  >
    {children}
  </section>
);

export default Section;
