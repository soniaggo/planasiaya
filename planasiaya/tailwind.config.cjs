// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   darkMode: "class",
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           light: "#4f9cff", // Azul claro
//           DEFAULT: "#1e88e5", // Azul principal
//           dark: "#1565c0", // Azul oscuro
//         },
//         secondary: {
//           light: "#ffb74d", // Naranja claro
//           DEFAULT: "#ff9800", // Naranja principal
//           dark: "#ef6c00", // Naranja oscuro
//         },
//       },
//       fontFamily: {
//         sans: ["Poppins", "sans-serif"],
//         festive: ["Festive", "cursive"],
//       },
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Asegura que Tailwind escanee todos los archivos donde uses clases.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitar el modo oscuro basado en la clase 'dark' en el <html>

  theme: {
    extend: {
      // 1. Colores de Marca (Inspiración: Verde Jade, Azul Océano)
      colors: {
        // Color Primario (Brand): Azul/Verde Profundo, representa confianza y viaje.
        brand: {
          light: '#4DB6AC', // Tono más claro para fondos o hover suave
          DEFAULT: '#00796B', // Color principal de botones y navegación
          dark: '#004D40',   // Tono oscuro para hover o detalles
        },
        // Color Secundario (Secondary): Verde brillante, representa aventura y acción.
        secondary: {
          light: '#81C784', // Tono más claro
          DEFAULT: '#4CAF50', // Color para CTA (Llamadas a la Acción)
          dark: '#2E7D32',   // Tono oscuro para hover
        },
        // Colores Neutros ajustados
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          // ... otros tonos de gris que uses
          800: '#1F2937',
          900: '#111827',
        }
      },

      // 2. Configuración de Fuente (usa la fuente Poppins cargada en index.html)
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },

      // 3. Animaciones Personalizadas (útil para loaders o notificaciones)
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },

    },
  },
  plugins: [],
}