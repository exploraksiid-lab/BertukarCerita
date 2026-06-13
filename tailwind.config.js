/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Shantell Sans"', 'cursive'],
      },
      colors: {
        theme: {
          green: '#06D6A0',
          pink: '#FF8A9A',
          darkRed: '#2C0E13',
          magenta: '#FF3366',
          palePink: '#FFF0F3',
          maroon: '#800020',
          softPink: '#FFE5EC',
        }
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}
