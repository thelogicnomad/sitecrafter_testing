/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2d5a88',
        secondary: '#1a1c23',
        accent: '#fca311',
      },
      fontFamily: {
        sans: ["Inter","Roboto","system-ui"],
      },
    },
  },
  plugins: [],
};