import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: 'oklch(var(--color-paper-lch) / <alpha-value>)',
          900: 'oklch(var(--color-night-lch) / <alpha-value>)',
          800: 'oklch(var(--color-night-2-lch) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'oklch(var(--color-ink-lch) / <alpha-value>)',
          muted: 'oklch(var(--color-ink-2-lch) / <alpha-value>)',
          faint: 'oklch(var(--color-muted-lch) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--color-accent-lch) / <alpha-value>)',
          blue: 'oklch(var(--color-accent-lch) / <alpha-value>)',
          violet: 'oklch(var(--color-accent-lch) / <alpha-value>)',
          cyan: 'oklch(var(--color-accent-lch) / <alpha-value>)',
          coral: 'oklch(var(--color-error-lch) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-body)'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        content: '1400px',
      },
    },
  },
  plugins: [],
}

export default config
