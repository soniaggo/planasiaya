


import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import guidesData from "../data/guidesData";
import { Trash2, Edit3 } from "lucide-react";
import PhotoUploader from "../components/PhotoUploader";
import Loader from "../components/Loader";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, profile, removeFavorite } = useUser();
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

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

  // 🔎 Buscar favoritos
  const favoriteDetails = profile?.favorites
    ?.map((favName) => {
      for (const country of guidesData) {
        const match = country.destinations.find((d) => d.name === favName);
        if (match) return match;
      }
      return null;
    })
    .filter(Boolean);

  // 🔹 Escuchar fotos del usuario en tiempo real
  useEffect(() => {
    if (!user) return;
    setLoadingPhotos(true);
    const q = query(collection(db, "photos"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPhotos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(userPhotos);
      setLoadingPhotos(false);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cabecera de perfil */}
      <motion.div
        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Foto de usuario */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-brand to-brand-light flex items-center justify-center text-white font-bold text-3xl shadow-lg">
          {profile?.displayName?.charAt(0).toUpperCase() || "U"}
        </div>

        {/* Info usuario */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-brand mb-2">
            {profile?.displayName || "Usuario anónimo"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {profile?.email}
          </p>
          <p className="text-sm text-gray-500 italic">
            🌏 Mochilero explorando Asia. Amante de la cultura, la naturaleza y
            las aventuras espontáneas.
          </p>
        </div>

        {/* Botón editar */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg shadow hover:bg-brand-dark"
        >
          <Edit3 size={18} /> Editar perfil
        </motion.button>
      </motion.div>

      {/* Favoritos */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-secondary">
          ❤️ Mis destinos favoritos
        </h2>
        {favoriteDetails?.length > 0 ? (
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
            {favoriteDetails.map((fav, i) => (
              <motion.div
                key={i}
                className="group bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <button
                  onClick={() => removeFavorite(fav.name)}
                  className="absolute top-2 right-2 z-10 bg-red-600 p-2 rounded-full shadow hover:bg-red-700 transition"
                  title="Eliminar favorito"
                >
                  <Trash2 size={18} className="text-white" />
                </button>
                <Link to={fav.path}>
                  <div className="relative w-full h-40 md:h-48 overflow-hidden">
                    <motion.img
                      src={fav.image}
                      alt={fav.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-brand transition-colors">
                      {fav.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            Todavía no has guardado destinos como favoritos.
          </p>
        )}
      </section>

      {/* Subir foto */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-secondary">📤 Sube tus fotos</h2>
        <PhotoUploader />
      </section>

      {/* Galería personal */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-secondary">📷 Mis fotos</h2>
        {loadingPhotos ? (
          <Loader text="Cargando tus fotos..." />
        ) : photos.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                className="relative group bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <img
                  src={photo.url}
                  alt="Foto subida"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-2 text-white">
                  <p className="text-sm">{profile?.displayName}</p>
                  <span className="text-xs">
                    {photo.visibility === "public"
                      ? "🌍"
                      : photo.visibility === "friends"
                      ? "👥"
                      : "🔒"}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">Todavía no has subido fotos.</p>
        )}
      </section>
    </motion.div>
  );
}






