/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
      },
      colors: {
        background: '#FAF3EB',
        white: '#FFFEFC',

        orange: {
          50: '#fff7ed',
          80: '#FAF3EB',
          100: '#ffedd5',
          150: '#F5EBDF',
          200: '#fed7aa',
          300: '#fdba74',
          350: '#D4CBC1',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      }
    },
  },
  plugins: [],
}
