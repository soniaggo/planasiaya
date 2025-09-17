// src/pages/Guides.jsx
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import guidesData from "../data/guidesData";
import { useUser } from "../context/UserContext";

export default function Guides() {
  const { user, profile, addFavorite, removeFavorite } = useUser();

  // Función para alternar favoritos
  const toggleFavorite = (destination) => {
    if (!user) {
      alert("Inicia sesión para guardar favoritos ❤️");
      return;
    }
    if (profile?.favorites?.includes(destination)) {
      removeFavorite(destination);
    } else {
      addFavorite(destination);
    }
  };

  return (
    <div className="p-6">
      {/* SEO dinámico */}
      <SEO
        title="Guías de viaje - PlanAsiaYa"
        description="Explora nuestras guías de viaje por Tailandia, Filipinas e Indonesia. Encuentra información práctica y cultural para tu ruta en Asia."
      />

      {/* Título principal */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-brand">
        🌏 Guías de viaje
      </h1>

      {/* Secciones por país */}
      {guidesData.map((country) => (
        <div key={country.country} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-secondary">
            {country.country}
          </h2>

          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {country.destinations.map((guide) => (
              <div
                key={guide.name}
                className="relative group block bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Botón favorito */}
                <button
                  onClick={() => toggleFavorite(guide.name)}
                  className="absolute top-3 right-3 text-white text-2xl z-10 drop-shadow"
                >
                  {profile?.favorites?.includes(guide.name) ? "❤️" : "🤍"}
                </button>

                {/* Imagen */}
                <Link to={guide.path}>
                  <div className="relative w-full h-40 md:h-48 overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Nombre */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-brand transition-colors">
                      {guide.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


