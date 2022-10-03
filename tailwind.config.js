/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ["Nevis", "sans-serif"],
    },
    colors: {
      black: "#000",
      white: "#fff",
      brand: "#31509E",
      accent: "#FFC46C",
      dark: "#0E0E18",
      light: "#A8C0F0",
      violet: "#927DE8",
      card: "#494D6A",
    },
  },
  plugins: [
    // Typography
    require("@tailwindcss/typography"),
  ],
};
