/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#8A2E4B', // Primary color for ArtisanBake
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#D9AE73', // Secondary accent color
              foreground: '#333333',
            },
            background: '#FDF8F3', // Light, elegant background
            foreground: '#333333', // Dark text for contrast
            card: {
              DEFAULT: '#FFFFFF',
              foreground: '#333333',
            },
            popover: {
              DEFAULT: '#FFFFFF',
              foreground: '#333333',
            },
            muted: {
              DEFAULT: '#E0D9D0', // Muted background elements
              foreground: '#6B6B6B',
            },
            accent: {
              DEFAULT: '#8A2E4B', // Accent for interactive elements
              foreground: '#FFFFFF',
            },
            destructive: {
              DEFAULT: '#DC2626', // Red for errors/destructive actions
              foreground: '#FFFFFF',
            },
            border: '#D4C9BF', // Subtle border color
            input: '#D4C9BF', // Input border color
            ring: '#8A2E4B', // Focus ring color
          },
          fontFamily: {
            sans: ['Poppins', 'Inter', 'sans-serif'],
            serif: ['Playfair Display', 'serif'], // Adding a serif for elegant headings
          },
          borderRadius: {
            xl: '1rem',
            lg: '0.75rem',
            md: '0.5rem',
            sm: '0.375rem',
          },
          boxShadow: {
            'elegant': '0 4px 12px rgba(0, 0, 0, 0.08)',
            'subtle': '0 2px 6px rgba(0, 0, 0, 0.05)',
          },
          transitionTimingFunction: {
            'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
          },
        },
      },
      plugins: [],
    }