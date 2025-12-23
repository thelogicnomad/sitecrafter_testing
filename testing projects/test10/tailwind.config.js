/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B4592',
        secondary: '#F7F9FB',
        accent: '#177D5E',
      },
      fontFamily: {
        sans: ["Inter","Source Sans Pro"],
      },
    },
  },
  plugins: [],
};