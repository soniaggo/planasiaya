
// src/components/CommunityFeed.jsx
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "./BackButton";

export default function CommunityFeed() {
  const { user } = useUser();
  const [photos, setPhotos] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null); // 👈 Modal abierto

  // 🔎 Cargar fotos públicas
  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const publicPhotos = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((photo) => photo.visibility === "public");
      setPhotos(publicPhotos);
    });
    return () => unsubscribe();
  }, []);

  // 🔎 Cargar likes y comentarios
  useEffect(() => {
    photos.forEach((photo) => {
      const likesRef = collection(db, "photos", photo.id, "likes");
      const unsubLikes = onSnapshot(likesRef, (snap) => {
        setLikes((prev) => ({
          ...prev,
          [photo.id]: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        }));
      });

      const commentsRef = collection(db, "photos", photo.id, "comments");
      const unsubComments = onSnapshot(commentsRef, (snap) => {
        setComments((prev) => ({
          ...prev,
          [photo.id]: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        }));
      });

      return () => {
        unsubLikes();
        unsubComments();
      };
    });
  }, [photos]);

  // ❤️ Dar/Quitar like
  const handleLike = async (photoId) => {
    if (!user) return alert("Debes iniciar sesión");
    const existingLike = likes[photoId]?.find((l) => l.userId === user.uid);
    if (existingLike) {
      await deleteDoc(doc(db, "photos", photoId, "likes", existingLike.id));
    } else {
      await addDoc(collection(db, "photos", photoId, "likes"), {
        userId: user.uid,
        userName: user.displayName || "Viajero",
      });
    }
  };

  // 💬 Agregar comentario
  const handleComment = async (photoId) => {
    if (!user) return alert("Debes iniciar sesión");
    const text = commentInputs[photoId];
    if (!text?.trim()) return;

    await addDoc(collection(db, "photos", photoId, "comments"), {
      userId: user.uid,
      userName: user.displayName || "Viajero",
      text,
      createdAt: new Date(),
    });

    setCommentInputs((prev) => ({ ...prev, [photoId]: "" }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🌍 Comunidad</h1>

      {/* Grid de fotos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo.id}
              className="cursor-pointer relative group"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.url}
                alt="Foto"
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:opacity-80 transition"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                ❤️ {likes[photo.id]?.length || 0}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Todavía no hay fotos públicas.</p>
        )}
      </div>

      {/* Modal de foto seleccionada */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-3xl w-full p-4 space-y-4 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              >
                ✖
              </button>

              {/* Foto */}
              <img
                src={selectedPhoto.url}
                alt="Foto"
                className="w-full max-h-[400px] object-contain rounded-lg"
              />

              {/* Info */}
              <p className="font-semibold">👤 {selectedPhoto.userName}</p>

              {/* Likes */}
              <button
                onClick={() => handleLike(selectedPhoto.id)}
                className="text-red-500 font-semibold"
              >
                ❤️ {likes[selectedPhoto.id]?.length || 0} Likes
              </button>

              {/* Comentarios */}
              <div>
                <h3 className="font-semibold">💬 Comentarios</h3>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {comments[selectedPhoto.id]?.map((c) => (
                    <p key={c.id} className="text-sm">
                      <span className="font-bold">{c.userName}: </span>
                      {c.text}
                    </p>
                  ))}
                </div>
                {user && (
                  <div className="flex mt-2 gap-2">
                    <input
                      type="text"
                      value={commentInputs[selectedPhoto.id] || ""}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [selectedPhoto.id]: e.target.value,
                        }))
                      }
                      placeholder="Escribe un comentario..."
                      className="flex-1 border px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => handleComment(selectedPhoto.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Enviar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de navegación */}
      <BackButton />
    </div>
  );
}

