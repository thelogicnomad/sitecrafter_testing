/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        container: {
          center: true,
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
          },
        },
        extend: {
          colors: {
            'au-primary': 'hsl(220, 50%, 18%)',
            'au-accent': 'hsl(35, 80%, 55%)',
            'au-bg-light': 'hsl(0, 0%, 98%)',
            'au-surface': 'hsl(0, 0%, 100%)',
            'au-text-dark': 'hsl(210, 10%, 15%)',
            'au-text-muted': 'hsl(210, 8%, 45%)',
            'au-success': 'hsl(140, 60%, 40%)',
            'au-error': 'hsl(0, 70%, 55%)',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
          },
          boxShadow: {
            'nav': '0 4px 30px rgba(0, 0, 0, 0.1)',
          }
        },
      },
      plugins: [],
    };