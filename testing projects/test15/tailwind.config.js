/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D1B2A',
        secondary: '#1F3A52',
        accent: '#00D9FF',
      },
      fontFamily: {
        sans: ["Orbitron","Rajdhani","Inter","system-ui"],
      },
    },
  },
  plugins: [],
};