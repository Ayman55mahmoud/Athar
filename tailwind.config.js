/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1a1a1a',
          soft: '#2d2d2d',
          muted: '#4a4a4a',
        },
        sand: {
          DEFAULT: '#c9b8a5',
          light: '#e8ddd0',
          dark: '#b09a82',
        },
        stone: {
          DEFAULT: '#8a8178',
          light: '#a89e94',
        },
        paper: {
          DEFAULT: '#f7f4f1',
          dark: '#ede7e0',
        },
        line: '#e0d9d0',
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1da851',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        'extra-wide': '0.2em',
        'ultra-wide': '0.3em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
