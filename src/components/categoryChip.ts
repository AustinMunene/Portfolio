/**
 * One chip style for every category, shared by the blog index, a post header and
 * the homepage preview.
 *
 * It used to be a per-category colour map - purple for AI, amber for Career, and
 * so on - written at the 300 weight, which only ever had contrast against a dark
 * surface. In light mode those chips were pastel-on-white and close to
 * illegible, and five hues fought the one-accent rule the palette is built on.
 * Frosted neutral reads the same in both themes, and the category is still named
 * in the label, which is where the information actually lives.
 */
export const CATEGORY_CHIP = 'glass-pill text-fg-muted';

/* The chip on a card sits on top of the cover photo, where `glass-pill` borrows
   the page background and disappears over a light image. Anything laid over a
   photo needs its own contrast, so it carries a dark scrim and white text in
   both themes rather than following the theme tokens. */
export const CATEGORY_CHIP_ON_IMAGE =
  'border border-white/20 bg-black/40 text-white backdrop-blur-md';
