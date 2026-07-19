/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nvidia-green': '#76B900',
      },
      boxShadow: {
        'neon-green': '0 0 10px rgba(118, 185, 0, 0.5), 0 0 20px rgba(118, 185, 0, 0.3)',
        'neon-green-strong': '0 0 15px rgba(118, 185, 0, 0.7), 0 0 30px rgba(118, 185, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
