/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}', './docs/**/*.{md,mdx}', './blog/**/*.{md,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    // Infima (Docusaurus' own CSS framework) already provides a reset and a
    // `.container` class. Turning these off keeps Tailwind purely additive.
    preflight: false,
    container: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eafaf7',
          100: '#c9f2ea',
          200: '#96e6da',
          300: '#5bd4c4',
          400: '#2bbcaa',
          500: '#12a08f',
          600: '#0a8074',
          700: '#0b665e',
          800: '#0d514c',
          900: '#0e4440',
          950: '#032725',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae3',
          300: '#b0b9ca',
          400: '#8492ab',
          500: '#657490',
          600: '#505d77',
          700: '#424c61',
          800: '#394252',
          900: '#141b26',
          950: '#0b1018',
        },
      },
      fontFamily: {
        sans: ['var(--nh-font-sans)'],
        mono: ['var(--nh-font-mono)'],
        display: ['var(--nh-font-display)'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(11 16 24 / 0.04), 0 8px 24px -12px rgb(11 16 24 / 0.18)',
        'card-hover': '0 1px 2px rgb(11 16 24 / 0.06), 0 18px 40px -16px rgb(11 16 24 / 0.28)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        drift: 'drift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
