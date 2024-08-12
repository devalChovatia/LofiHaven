/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sawarabi': ['Sawarabi Mincho', 'sans-serif'],
        'caveat': ['Caveat', 'sans-serif']
      },
    },
  },
  plugins: [],
}
