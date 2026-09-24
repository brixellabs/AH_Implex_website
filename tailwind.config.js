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
          50: '#f0f5fa',
          100: '#e1ecf6',
          200: '#c3daf0',
          300: '#94bfe4',
          500: '#2a72b8',
          600: '#1c5393',
          700: '#163e6e', // Primary deep logo navy
          800: '#0e294d', // Dark logo shade
          900: '#071830', // Ultra dark background
        },
        navy: {
          950: '#071830',
          900: '#071830',
          850: '#0e294d',
          800: '#0e294d',
          750: '#163e6e',
          700: '#163e6e',
          600: '#1c5393',
          500: '#2a72b8',
          300: '#94bfe4',
          200: '#c3daf0',
          100: '#e1ecf6',
          50: '#f0f5fa',
        },
        gold: {
          300: '#e8d5b5',
          400: '#c5a059',
          500: '#b48c36',
          600: '#9f7828',
          700: '#87621c',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Cinzel', 'serif'],
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
