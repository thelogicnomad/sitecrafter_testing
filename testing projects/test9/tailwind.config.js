/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#911B44',
        secondary: '#2D231E',
        accent: '#FC5A30',
      },
      fontFamily: {
        sans: ["Poppins","Open Sans"],
      },
    },
  },
  plugins: [],
};