/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"], // será la predeterminada
      },
      colors: {
        brand: {
          DEFAULT: "#06b6d4", // turquesa principal
          dark: "#0e7490",    // hover/activo
          light: "#67e8f9",   // acento suave
        },
      },
    },
  },
  plugins: [],
};
