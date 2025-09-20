/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#4f9cff", // Azul claro
          DEFAULT: "#1e88e5", // Azul principal
          dark: "#1565c0", // Azul oscuro
        },
        secondary: {
          light: "#ffb74d", // Naranja claro
          DEFAULT: "#ff9800", // Naranja principal
          dark: "#ef6c00", // Naranja oscuro
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        festive: ["Festive", "cursive"],
      },
    },
  },
  plugins: [],
};
