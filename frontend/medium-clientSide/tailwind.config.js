/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mediumGrey: '#c7c5bf',
        mediumWhite: '#faf8f2'
      }
    },
  },
  plugins: [],
}

