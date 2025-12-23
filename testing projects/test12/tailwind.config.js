/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        secondary: '#C5A059',
        accent: '#E63946',
      },
      fontFamily: {
        sans: ["Playfair Display","Montserrat","system-ui"],
      },
    },
  },
  plugins: [],
};