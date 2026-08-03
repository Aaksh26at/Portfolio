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
          900: 'oklch(var(--color-band-lch) / <alpha-value>)',
          800: 'oklch(var(--color-band-2-lch) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'oklch(var(--color-ink-lch) / <alpha-value>)',
          muted: 'oklch(var(--color-ink-2-lch) / <alpha-value>)',
          faint: 'oklch(var(--color-muted-lch) / <alpha-value>)',
        },
        // Amber. Fills and marks only — `signal.strong` is the text-safe cut.
        signal: {
          DEFAULT: 'oklch(var(--color-signal-lch) / <alpha-value>)',
          strong: 'oklch(var(--color-signal-strong-lch) / <alpha-value>)',
          soft: 'oklch(var(--color-signal-soft-lch) / <alpha-value>)',
          ink: 'oklch(var(--color-signal-ink-lch) / <alpha-value>)',
        },
        // Cobalt. Reserved for evidence: charts, project plates, the world.
        data: {
          DEFAULT: 'oklch(var(--color-data-lch) / <alpha-value>)',
          2: 'oklch(var(--color-data-2-lch) / <alpha-value>)',
          soft: 'oklch(var(--color-data-soft-lch) / <alpha-value>)',
          ink: 'oklch(var(--color-data-ink-lch) / <alpha-value>)',
        },
        band: {
          DEFAULT: 'oklch(var(--color-band-lch) / <alpha-value>)',
          2: 'oklch(var(--color-band-2-lch) / <alpha-value>)',
          ink: 'oklch(var(--color-band-ink-lch) / <alpha-value>)',
          muted: 'oklch(var(--color-band-muted-lch) / <alpha-value>)',
          rule: 'oklch(var(--color-band-rule-lch) / <alpha-value>)',
        },
        rule: {
          DEFAULT: 'oklch(var(--color-rule-lch) / <alpha-value>)',
          2: 'oklch(var(--color-rule-2-lch) / <alpha-value>)',
          strong: 'oklch(var(--color-rule-strong-lch) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        4: 'var(--shadow-4)',
        lift: 'var(--shadow-lift)',
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
