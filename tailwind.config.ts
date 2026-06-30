import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tre: {
          50:  '#fdf8f3',
          100: '#f9ede0',
          200: '#f2d9be',
          300: '#e8be94',
          400: '#dc9a68',
          500: '#d07d47',
          600: '#c4622d',
          700: '#a34e25',
          800: '#844025',
          900: '#6b3522',
        },
      },
      fontFamily: {
        sans:  ['var(--font-inter)',     'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia',   'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
