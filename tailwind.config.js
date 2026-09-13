/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e5ff',
          200: '#bcd1ff',
          300: '#8eb3ff',
          400: '#5a89ff',
          500: '#3461ff',
          600: '#1d3ff5',
          700: '#162de1',
          800: '#1826b6',
          900: '#19268f',
          950: '#111857',
        },
        accent: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        ink: {
          900: '#0b1220',
          800: '#111a2e',
          700: '#1f2a44',
          600: '#334155',
          500: '#526079',
          400: '#7c8aa5',
          300: '#a9b4c8',
          200: '#d4dbe7',
          100: '#e8edf5',
          50: '#f5f7fb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,18,32,0.04), 0 8px 24px -8px rgba(11,18,32,0.10)',
        'card-hover': '0 2px 4px rgba(11,18,32,0.06), 0 20px 40px -12px rgba(52,97,255,0.22)',
        glow: '0 0 0 1px rgba(52,97,255,0.12), 0 24px 60px -20px rgba(52,97,255,0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      maxWidth: {
        container: '80rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
