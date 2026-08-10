import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  /**
   * Which of the two surfaces this section sits on. Sections alternate so the
   * page has rhythm, and because the theme is the visitor's choice this is
   * relative to it rather than absolute - `alt` is a slightly raised panel in
   * dark mode and a slightly recessed one in light.
   */
  variant?: 'base' | 'alt';
  id?: string;
  className?: string;
};

/**
 * Themed section wrapper.
 *
 * Surface and text come from the tokens that [data-theme] on <html> rebinds
 * (see index.css), so children styled with bg-surface / text-fg / text-fg-muted
 * / border-line work in either theme with no conditional classes.
 */
const Section = ({ children, variant = 'base', id, className = '' }: SectionProps) => (
  <section
    id={id}
    className={`relative text-fg transition-colors duration-500 ${
      variant === 'alt' ? 'bg-surface-alt' : 'bg-surface'
    } ${className}`}
  >
    {children}
  </section>
);

export default Section;
