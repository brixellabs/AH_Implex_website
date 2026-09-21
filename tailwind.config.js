/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B18',
          900: '#0A1224',
          850: '#0E1A33',
          800: '#14254A',
          750: '#1A305F',
          700: '#223E79',
          600: '#2C519D',
          500: '#3A67C2',
          100: '#E8EDF8',
          50: '#F3F6FC',
        },
        gold: {
          300: '#E8D5B5',
          400: '#DAC196',
          500: '#C5A880',
          600: '#A88B63',
          700: '#8A6F48',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'kenburns': 'kenburns 22s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.00) translate(0%, 0%)' },
          '100%': { transform: 'scale(1.07) translate(-1%, -1%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
