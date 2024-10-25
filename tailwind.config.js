/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Asegúrate de incluir las rutas correctas
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
