

// src/components/CommunityFeed.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Heart, X } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function CommunityFeed() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState([]);
  const { user, profile } = useUser();

  // 🔎 Escuchar fotos públicas
  useEffect(() => {
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

  // 🔎 Escuchar likes y comentarios de la foto seleccionada
  useEffect(() => {
    if (!selectedPhoto) return;

    const likesRef = collection(db, "photos", selectedPhoto.id, "likes");
    const commentsRef = collection(db, "photos", selectedPhoto.id, "comments");

    const unsubLikes = onSnapshot(likesRef, (snapshot) => {
      setLikes(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsubComments = onSnapshot(commentsRef, (snapshot) => {
      setComments(
        snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds)
      );
    });

    return () => {
      unsubLikes();
      unsubComments();
    };
  }, [selectedPhoto]);

  // ❤️ Dar/Quitar like
  const toggleLike = async () => {
    if (!user) return alert("Inicia sesión para dar like ❤️");
    const existingLike = likes.find((l) => l.userId === user.uid);

    if (existingLike) {
      await deleteDoc(doc(db, "photos", selectedPhoto.id, "likes", existingLike.id));
    } else {
      await addDoc(collection(db, "photos", selectedPhoto.id, "likes"), {
        userId: user.uid,
        userName: profile?.displayName || "Anónimo",
      });
    }
  };

  // 💬 Agregar comentario
  const addComment = async () => {
    if (!user || !newComment.trim()) return;
    await addDoc(collection(db, "photos", selectedPhoto.id, "comments"), {
      userId: user.uid,
      userName: profile?.displayName || "Anónimo",
      text: newComment,
      createdAt: new Date(),
    });
    setNewComment("");
  };

  // 🔎 Escuchar likes de todas las fotos (para el contador en grid)
  const [likesCounts, setLikesCounts] = useState({});
  useEffect(() => {
    const unsubscribers = photos.map((photo) => {
      const likesRef = collection(db, "photos", photo.id, "likes");
      return onSnapshot(likesRef, (snapshot) => {
        setLikesCounts((prev) => ({
          ...prev,
          [photo.id]: snapshot.size, // número de likes
        }));
      });
    });

    return () => unsubscribers.forEach((unsub) => unsub());
  }, [photos]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-brand">
        🌍 Comunidad viajera
      </h1>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.userName}
                className="w-full h-40 object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2 text-white">
                <p className="text-sm font-semibold">{photo.userName}</p>
              </div>
              {/* ❤️ Contador de likes */}
              <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{likesCounts[photo.id] || 0}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          Todavía no hay fotos públicas en la comunidad.
        </p>
      )}

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <X size={18} className="text-gray-700 dark:text-gray-300" />
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.userName}
              className="w-full object-contain max-h-[50vh] bg-black"
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
            </div>

            {/* Likes y comentarios */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3">
              {/* Likes */}
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1 ${
                  likes.some((l) => l.userId === user?.uid)
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Heart className="w-5 h-5" />{" "}
                <span>{likes.length} Me gusta</span>
              </button>

              {/* Comentarios */}
              <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded"
                  >
                    <p className="font-semibold">{c.userName}</p>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Input comentario */}
              {user ? (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="flex-1 border rounded px-2 py-1 text-sm"
                  />
                  <button
                    onClick={addComment}
                    className="bg-brand text-white px-3 py-1 rounded text-sm"
                  >
                    Enviar
                  </button>
                </div>
              ) : (
                <p className="text-xs text-gray-500 mt-2">
                  Inicia sesión para comentar 💬
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
