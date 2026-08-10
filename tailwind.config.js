/** @type {import('tailwindcss').Config} */
export default {
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
        // Warm amber. Redefining the existing `accent` scale rather than adding
        // a new one migrates every accent-* usage in the app at once.
        accent: {
          DEFAULT: '#e8872a',
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#fedba8',
          300: '#fdc071',
          400: '#fb9d3c',
          500: '#e8872a',
          600: '#d1741f',
          700: '#ad5a1b',
          800: '#8a471c',
          900: '#713b19',
        },
        // Tone-aware tokens. These resolve through CSS custom properties that
        // <Section tone="light|dark"> flips, so one component works in both.
        surface: 'var(--surface)',
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