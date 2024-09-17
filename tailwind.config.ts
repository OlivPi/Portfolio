/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        'primary': '#F9EFE6',
        'secondary': '#5CD19A',
        'tertiary': '#F7F7F7',
        'quaternary': '#AB9F0E',
      },
      fontFamily: {
        sans: ['var(--font-ibm)'],
        mono: ['var(--font-roboto-mono)']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
