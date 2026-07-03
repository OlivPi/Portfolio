/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '5rem',
        lg: '6rem',
        xl: '8rem',
      },
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        quaternary: 'var(--color-quaternary)',
        foreground: 'var(--color-foreground)',
        surface: 'var(--color-surface)',
      },
      fontFamily: {
        sans: ['var(--font-ibm)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
