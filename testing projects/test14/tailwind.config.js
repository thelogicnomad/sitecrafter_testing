/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A0E27',
        secondary: '#1A1F3A',
        accent: '#00D9FF',
      },
      fontFamily: {
        sans: ["Orbitron","Inter","system-ui"],
      },
    },
  },
  plugins: [],
};