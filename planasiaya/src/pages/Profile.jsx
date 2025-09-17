
// src/pages/Profile.jsx
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import guidesData from "../data/guidesData";
import { Trash2 } from "lucide-react"; // 🗑️ Icono

export default function Profile() {
  const { user, profile, removeFavorite } = useUser();

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">👤 Perfil</h1>
        <p className="mb-4">No has iniciado sesión.</p>
        <Link
          to="/login"
          className="px-4 py-2 bg-brand text-white rounded-lg shadow hover:bg-brand-dark"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  // 🔎 Buscar los datos de los favoritos en guidesData
  const favoriteDetails = profile?.favorites
    ?.map((favName) => {
      for (const country of guidesData) {
        const match = country.destinations.find((d) => d.name === favName);
        if (match) return match;
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="p-6">
      {/* Datos del usuario */}
      <h1 className="text-3xl font-extrabold mb-6 text-brand">👤 Mi Perfil</h1>
      <p className="mb-2">
        <span className="font-semibold">Email:</span> {profile?.email}
      </p>

      {/* Favoritos */}
      <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">❤️ Mis favoritos</h2>

      {favoriteDetails?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteDetails.map((fav, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Botón eliminar favorito con icono */}
              <button
                onClick={() => removeFavorite(fav.name)}
                className="absolute top-2 right-2 z-10 bg-red-600 p-2 rounded-full shadow hover:bg-red-700 transition"
                title="Eliminar favorito"
              >
                <Trash2 size={18} className="text-white" />
              </button>

              {/* Imagen + link */}
              <Link to={fav.path}>
                <div className="relative w-full h-40 md:h-48 overflow-hidden">
                  <img
                    src={fav.image}
                    alt={fav.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Nombre */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-brand transition-colors">
                    {fav.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          Todavía no has guardado destinos como favoritos.
        </p>
      )}
    </div>
  );
}








