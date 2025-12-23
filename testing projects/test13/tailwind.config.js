/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7B68BE',
        secondary: '#A8D8EA',
        accent: '#FFB6C1',
      },
      fontFamily: {
        sans: ["Quicksand","Inter","sans-serif"],
      },
    },
  },
  plugins: [],
};