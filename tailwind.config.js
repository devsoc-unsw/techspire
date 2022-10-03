/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    }
    // fontSize: {
    //   '1xl': '1rem',
    //   '2xl': '1.5rem',
    //   '3xl': '2rem',
    //   '4xl': '4rem',
    //   '5xl': '3rem',
    //   '6xl': '6rem',
    //   '7xl': '7rem',
    // }
  },
  plugins: [
    // Typography
    require("@tailwindcss/typography"),
  ],
};
