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
        // Deep slate-navy base ("Tech & Futuristic" palette)
        base: {
          DEFAULT: '#0F172A',
          900: '#0A0F1C',
          800: '#0F172A',
          700: '#16203A',
          600: '#1E293B',
          500: '#273349',
        },
        ink: {
          DEFAULT: '#F1F5F9',
          muted: '#94A3B8',
          faint: '#64748B',
        },
        // Semantic accent slots. Primary = cyan, secondary (`violet` slot) = blue.
        // Names are kept stable so components don't need editing on a re-theme.
        accent: {
          DEFAULT: '#06B6D4',
          blue: '#0EA5E9',
          violet: '#3B82F6',
          cyan: '#22D3EE',
          coral: '#FB7185',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
