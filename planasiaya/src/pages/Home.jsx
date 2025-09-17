import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import logo from "../assets/logo.png";

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80", // Playa
  "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&fit=crop&w=1500&q=80", // Templo
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=80", // Arrozales
];

export default function Home() {
  // Imagen aleatoria en cada carga
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${randomImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-xl px-6">
        <SEO
          title="PlanAsiaYa - Tu guía de viajes social en Asia"
          description="Descubre destinos únicos en Asia, conecta con otros viajeros y comparte experiencias en tiempo real con PlanAsiaYa."
        />

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="PlanAsiaYa Logo"
            className="h-48 md:h-64 lg:h-72 w-auto mb-8 drop-shadow-2xl"
          />
        </div>

        {/* Subtítulo motivador */}
        <p className="text-lg md:text-xl mb-8 text-gray-100 font-medium drop-shadow-md">
          La comunidad viajera para mochileros en Asia 🌏✨
        </p>

        {/* Botones principales */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/guides" className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-semibold shadow-md transition active:scale-95">
            Explora guías
          </Link>
          <Link to="/register" className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200">
            Únete ahora
          </Link>
        </div>
      </div>
    </div>
  );
}






