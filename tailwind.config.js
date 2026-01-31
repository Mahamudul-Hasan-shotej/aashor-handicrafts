/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a', // Black/Dark Gray for text
        secondary: '#bf9b30', // Gold/Bronze for accents (buttons, price)
        'secondary-hover': '#a68520',
        background: '#ffffff',
        surface: '#f9f9f9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
