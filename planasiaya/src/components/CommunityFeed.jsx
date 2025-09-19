


import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Heart, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommunityFeed() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    // 🔎 Escuchar solo fotos públicas en tiempo real
    const q = query(
      collection(db, "photos"),
      where("visibility", "==", "public"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allPhotos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(allPhotos);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-brand">
        🌍 Comunidad viajera
      </h1>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              {/* Imagen */}
              <img
                src={photo.url}
                alt={photo.userName}
                className="w-full h-40 object-cover"
              />

              {/* Overlay con info */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2 text-white">
                <p className="text-sm font-semibold">{photo.userName}</p>
                <p className="text-xs">
                  {photo.createdAt?.toDate
                    ? photo.createdAt.toDate().toLocaleDateString()
                    : ""}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          Todavía no hay fotos públicas en la comunidad.
        </p>
      )}

      {/* Modal con animación */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <X size={18} className="text-gray-700 dark:text-gray-300" />
              </button>

              {/* Foto grande */}
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.userName}
                className="w-full object-contain max-h-[60vh] bg-black"
              />

              {/* Info */}
              <div className="p-4">
                <p className="font-semibold text-lg">
                  {selectedPhoto.userName || "Anónimo"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedPhoto.createdAt?.toDate
                    ? selectedPhoto.createdAt.toDate().toLocaleString()
                    : ""}
                </p>
                <p className="text-xs mt-1">
                  {selectedPhoto.visibility === "public"
                    ? "🌍 Público"
                    : selectedPhoto.visibility === "friends"
                    ? "👥 Solo amigos"
                    : "🔒 Privado"}
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-around border-t border-gray-200 dark:border-gray-700 p-3">
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 transition">
                  <Heart className="w-5 h-5" /> <span>Me gusta</span>
                </button>
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-brand transition">
                  <MessageCircle className="w-5 h-5" /> <span>Comentar</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

