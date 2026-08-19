/** @type {import('tailwindcss').Config} */
export default {
  /*
    Compile `hover:` and `group-hover:` inside `@media (hover: hover)` instead of
    as a bare `:hover`.

    Touch browsers latch :hover on the element you last tapped and hold it until
    you tap something else. Every card here hangs animation off hover -
    group-hover:scale-105 on the cover image, hover:border-brand-line on the
    card, group-hover:translate-x-1 on the arrow - so tapping or scrolling
    through a list of cards was firing and unfiring 300-500ms transitions on
    whichever card was last touched. That is the flicker.
  */
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        // Display only. Playfair Display ships real 400-900 weights, so unlike
        // Instrument Serif a font-semibold override here is safe.
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        // Monochrome. The reference is a black-and-white design: its palette is
        // greyscale and its primary CTA is a plain black pill, so there is no
        // chromatic accent to reproduce. Keeping the scale named `accent` means
        // every existing accent-* utility becomes a neutral in one edit.
        accent: {
          DEFAULT: '#d4d4d8',
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#8f8f98',
          600: '#71717a',
          700: '#52525b',
          800: '#3f3f46',
          900: '#27272a',
        },
        // Tone-aware tokens. These resolve through CSS custom properties that
        // <Section tone="light|dark"> flips, so one component works in both.
        brand: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          // Pre-diluted, because Tailwind 3 cannot apply an /opacity modifier to
          // a raw var() colour - `border-brand/30` compiles to nothing at all.
          // Use brand-line (border-, text-, bg-) wherever a faint accent is wanted.
          line: 'var(--accent-line)',
          fg: 'var(--accent-fg)',
        },
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        'surface-raised': 'var(--surface-raised)',
        fg: {
          DEFAULT: 'var(--fg)',
          muted: 'var(--fg-muted)',
          subtle: 'var(--fg-subtle)',
        },
        line: 'var(--border)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};