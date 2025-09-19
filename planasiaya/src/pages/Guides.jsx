


import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import guidesData from "../data/guidesData";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";

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
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO dinámico */}
      <SEO
        title="Guías de viaje - PlanAsiaYa"
        description="Explora nuestras guías de viaje por Tailandia, Filipinas e Indonesia. Encuentra información práctica y cultural para tu ruta en Asia."
      />

      {/* Título principal */}
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold mb-8 text-brand"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        🌏 Guías de viaje
      </motion.h1>

      {/* Secciones por país */}
      {guidesData.map((country, index) => (
        <motion.div
          key={country.country}
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-secondary">
            {country.country}
          </h2>

          {/* Grid de tarjetas */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {country.destinations.map((guide) => (
              <motion.div
                key={guide.name}
                className="relative group block bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Botón favorito */}
                <motion.button
                  onClick={() => toggleFavorite(guide.name)}
                  className="absolute top-3 right-3 text-white text-2xl z-10 drop-shadow"
                  whileTap={{ scale: 0.8 }}
                >
                  {profile?.favorites?.includes(guide.name) ? "❤️" : "🤍"}
                </motion.button>

                {/* Imagen */}
                <Link to={guide.path}>
                  <div className="relative w-full h-40 md:h-48 overflow-hidden">
                    <motion.img
                      src={guide.image}
                      alt={guide.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
