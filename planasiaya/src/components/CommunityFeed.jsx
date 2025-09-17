import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

export default function CommunityFeed() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // 🔹 Solo escuchar fotos públicas
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
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photo.url}
                alt={photo.userName}
                className="w-full h-40 object-cover"
              />
              {/* Overlay con info */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2 text-white">
                <p className="text-sm font-semibold">{photo.userName}</p>
                <p className="text-xs">
                  {photo.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Todavía no hay fotos públicas en la comunidad.</p>
      )}
    </div>
  );
}
