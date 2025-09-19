
// import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { useUser } from "../context/UserContext";

// export default function CityMeetups({ city, country }) {
//   const { user, profile } = useUser();
//   const [title, setTitle] = useState("");
//   const [meetups, setMeetups] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // 📌 Escuchar quedadas activas en tiempo real
//   useEffect(() => {
//     const now = new Date();
//     const q = query(
//       collection(db, "cityMeetups"),
//       where("city", "==", city),
//       where("expiresAt", ">", now),
//       orderBy("expiresAt", "asc")
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMeetups(data);
//     });

//     return () => unsubscribe();
//   }, [city]);

//   // 📌 Crear quedada
//   const createMeetup = async () => {
//     if (!title.trim() || !user) return;
//     setLoading(true);

//     const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2h
//     await addDoc(collection(db, "cityMeetups"), {
//       title,
//       city,
//       country,
//       authorId: user.uid,
//       authorName: profile?.displayName || "Anónimo",
//       createdAt: serverTimestamp(),
//       expiresAt,
//     });

//     setTitle("");
//     setLoading(false);
//   };

//   return (
//     <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-3">📅 Quedadas en {city}</h2>

//       {user ? (
//         <div className="flex gap-2 flex-wrap mb-4">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Ej: Cena de mochileros"
//             className="flex-1 border rounded px-2 py-1"
//             onKeyDown={(e) => e.key === "Enter" && createMeetup()}
//           />
//           <button
//             onClick={createMeetup}
//             disabled={loading}
//             className="bg-brand text-white px-4 py-1 rounded hover:bg-brand-dark disabled:opacity-50"
//           >
//             {loading ? "Creando..." : "Crear"}
//           </button>
//         </div>
//       ) : (
//         <p className="text-sm text-gray-500">
//           Inicia sesión para crear una quedada.
//         </p>
//       )}

//       <div className="space-y-3">
//         {meetups.length > 0 ? (
//           meetups.map((m) => (
//             <div
//               key={m.id}
//               className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
//             >
//               <div>
//                 <p className="font-bold">{m.title}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">
//                   Autor: {m.authorName}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Expira:{" "}
//                   {m.expiresAt?.toDate
//                     ? m.expiresAt.toDate().toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })
//                     : ""}
//                 </p>
//               </div>
//               <button className="mt-2 sm:mt-0 bg-brand text-white px-3 py-1 rounded-lg shadow hover:bg-brand-dark text-sm font-semibold">
//                 Unirme
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No hay quedadas activas.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// src/components/CityMeetups.jsx
// src/components/CityMeetups.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useUser } from "../context/UserContext";

// 🎯 Importamos iconos realistas desde react-icons
import {
  FaHiking,
  FaUmbrellaBeach,
  FaCampground,
  FaGlassCheers,
} from "react-icons/fa";
import { MdOutlineNaturePeople } from "react-icons/md";

export default function CityMeetups({ city, country }) {
  const { user, profile } = useUser();
  const [meetups, setMeetups] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("aventura");
  const [ageRange, setAgeRange] = useState("indiferente");

  // 🔎 Escuchar quedadas en tiempo real
  useEffect(() => {
    const q = query(
      collection(db, "cityMeetups"),
      where("city", "==", city),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetups(docs);
    });

    return () => unsubscribe();
  }, [city]);

  // 📌 Crear una quedada
  const createMeetup = async () => {
    if (!title.trim() || !user) return;

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 6); // ⏰ 6 horas por defecto

    await addDoc(collection(db, "cityMeetups"), {
      city,
      country,
      title,
      category,
      ageRange,
      authorId: user.uid,
      authorName: profile?.displayName || "Anónimo",
      createdAt: serverTimestamp(),
      expiresAt,
    });

    setTitle("");
    setCategory("aventura");
    setAgeRange("indiferente");
  };

  // 🎨 Iconos de categorías
  const categoryIcons = {
    aventura: <FaHiking className="text-green-600 w-5 h-5" />,
    naturaleza: <MdOutlineNaturePeople className="text-teal-600 w-5 h-5" />,
    relax: <FaUmbrellaBeach className="text-yellow-500 w-5 h-5" />,
    fiesta: <FaGlassCheers className="text-pink-500 w-5 h-5" />,
    camping: <FaCampground className="text-orange-600 w-5 h-5" />,
  };

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">📍 Quedadas en {city}</h2>

      {/* Listado de quedadas */}
      <div className="space-y-3 mb-4">
        {meetups.length > 0 ? (
          meetups.map((m) => (
            <div
              key={m.id}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-bold flex items-center gap-2">
                  {categoryIcons[m.category] || "❓"} {m.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Autor: {m.authorName} • {m.ageRange}
                </p>
              </div>
              <span className="mt-2 sm:mt-0 text-xs text-gray-500">
                Expira:{" "}
                {m.expiresAt?.toDate
                  ? m.expiresAt.toDate().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Sin fecha"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay quedadas aún en esta ciudad.</p>
        )}
      </div>

      {/* Crear nueva quedada */}
      {user ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la quedada..."
            className="w-full border rounded px-3 py-2"
          />

          {/* Select categoría */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="aventura">Aventura 🥾</option>
            <option value="naturaleza">Naturaleza 🌿</option>
            <option value="relax">Relax 🏖️</option>
            <option value="fiesta">Fiesta 🍻</option>
            <option value="camping">Camping ⛺</option>
          </select>

          {/* Select rango de edad */}
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="indiferente">Indiferente</option>
            <option value="20-30">20 - 30 años</option>
            <option value="30-40">30 - 40 años</option>
            <option value="40-55">40 - 55 años</option>
          </select>

          <button
            onClick={createMeetup}
            className="w-full bg-brand text-white px-4 py-2 rounded-lg shadow hover:bg-brand-dark transition"
          >
            Crear quedada
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Inicia sesión para crear una quedada.
        </p>
      )}
    </div>
  );
}
