/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: '#E1267B',
          'rose-dark': '#B81B62',
          'rose-deep': '#8B144A',
          'rose-light': '#FCEAF2',
          'rose-soft': '#F8D3E4',
          charcoal: '#2D2A2E',
          slate: '#5A5359',
          cream: '#FFF9FB',
          gold: '#C8A464'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(225, 38, 123, 0.08)',
        'glass-lg': '0 16px 48px rgba(225, 38, 123, 0.14)',
      }
    },
  },
  plugins: [],
};
