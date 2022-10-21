const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
      brightness: {
        1: ".1",
        25: ".25",
      },
      fontFamily: {
        sans: ["Nevis", ...defaultTheme.fontFamily.sans],
      },
      height: {
        screen: "calc(var(--vh, 1vh) * 100)",
      },
      animation: {
        "gradient-x": "gradient-x 10s ease infinite",
        "gradient-x-fast": "gradient-x 2s ease infinite",
        "gradient-y": "gradient-y 10s ease infinite",
        "gradient-xy": "gradient-xy 10s ease infinite",
        "dissolve-text": "dissolve-text ease 1",
        "dissolve-appear": "dissolve-appear 3s ease 1",
        "pulse-and-spin": "pulse 2s infinite, spin 5s linear infinite",
        spin: "spin 5s linear infinite",
        "pulse-bright": "pulse 2s infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "25%": {
            "background-size": "300% 300%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "75%": {
            "background-size": "300% 300%",
            "background-position": "right center",
          },
        },
        "dissolve-text": {
          "0%": {
            opacity: 0,
          },
          "15%, 85%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "dissolve-appear": {
          "0%": {
            opacity: 0,
          },
          "40%": {
            opacity: 1,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      colors: {
        black: "#000",
        white: "#fff",
        brand: "#31509E",
        // accent: "#FFC46C",
        // dark: "#1B1B1B",
        dark: "#0E0E18",
        // dark: "#1D1D35",
        light: "#A8C0F0",
        // violet: "#927DE8",
        card: "#494D6A",
      },
    },
  },
  plugins: [
    // Typography
    require("@tailwindcss/typography"),
  ],
};
