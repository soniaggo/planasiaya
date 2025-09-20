// src/components/MeetupFeed.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHiking, FaUmbrellaBeach, FaGlassCheers, FaCampground } from "react-icons/fa";
import { MdOutlineNaturePeople } from "react-icons/md";

export default function MeetupFeed() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const now = new Date();

    const q = query(
      collection(db, "cityMeetups"),
      where("expiresAt", ">", now),
      orderBy("expiresAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activeMeetups = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetups(activeMeetups);
    });

    return () => unsubscribe();
  }, []);

  // 🎨 Iconos de categorías
  const categoryIcons = {
    aventura: <FaHiking className="text-green-600 w-5 h-5" />,
    naturaleza: <MdOutlineNaturePeople className="text-teal-600 w-5 h-5" />,
    relax: <FaUmbrellaBeach className="text-yellow-500 w-5 h-5" />,
    fiesta: <FaGlassCheers className="text-pink-500 w-5 h-5" />,
    camping: <FaCampground className="text-orange-600 w-5 h-5" />,
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-2">
        📅 Quedadas destacadas
      </h2>

      {meetups.length === 0 && (
        <p className="text-gray-600">No hay quedadas activas ahora mismo.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meetups.map((m, index) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Imagen de fondo con overlay */}
            <div className="relative w-full h-40">
              <img
                src={m.image || "https://source.unsplash.com/random/400x300/?travel,asia"}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Contenido */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-lg">{m.title}</h3>
              <p className="text-sm flex items-center gap-2">
                📍 {m.city} ({m.country}) • {categoryIcons[m.category] || "❓"}
              </p>
              <p className="text-xs opacity-90 mt-1">
                👤 {m.authorName} • expira:{" "}
                {m.expiresAt?.toDate
                  ? m.expiresAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "sin fecha"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

