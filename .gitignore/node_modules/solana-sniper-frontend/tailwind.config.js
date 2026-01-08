/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        dark: "#0d0d0d",
        panel: "#1a1a1a",
        card: "#262626",
        accent: "#6a5acd",
        accentHover: "#7b6df0",
      },
    },
  },
  plugins: [],
}
