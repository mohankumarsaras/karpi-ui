/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#030405',
          surface: '#0B0D11',
          card: '#101318',
          border: '#1E232B',
          text: '#F8FAFC',
          muted: '#94A3B8',
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E2E2E2',
          text: '#030405',
          muted: '#626262',
        },
        brand: {
          primary: '#0A2460',
          secondary: '#1656B6',
          accent: '#3686C4',
          soft: '#A0B6D6',
          orange: '#F97316',
        },
        // Maintain backwards-compatibility tokens mapped to the palette
        karpi: {
          navy: '#030405',
          blue: '#1656B6',
          'blue-dark': '#0A2460',
          'blue-light': '#3686C4',
          orange: '#3686C4',
          'orange-hover': '#1656B6',
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          slate: '#030405',
          muted: '#626262',
          border: '#E2E2E2',
        }
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(3, 4, 5, 0.04), 0 1px 2px rgba(3, 4, 5, 0.02)',
        'bento': '0 4px 20px -2px rgba(3, 4, 5, 0.05)',
        'bento-dark': '0 8px 30px rgba(0, 0, 0, 0.4)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 6px 16px rgba(10, 36, 96, 0.06)',
      },
      borderRadius: {
        'bento': '1rem',
      }
    },
  },
  plugins: [],
}
