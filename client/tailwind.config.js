/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  themes: {
    light: {
      layout: {
        backgroundColor: "#ffffff",
        textColor: "#333333",
      },
      colors: {
        primary: "#00ABE4",
        secondary: "#6B7280",
      },
    },
    dark: {
      layout: {
        backgroundColor: "black",
        textColor: "#ffffff",
      },
      colors: {
        primary: "#00ABE4",
        secondary: "#6B7280",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
