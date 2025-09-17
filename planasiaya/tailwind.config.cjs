module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 👈 importante
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          DEFAULT: "#06b6d4",
          dark: "#0e7490",
          light: "#67e8f9",
        },
      },
    },
  },
  plugins: [],
};
