


// src/components/CityMeetups.jsx
// import { useState, useEffect } from "react";
// import { normalizeCity } from "../utils/normalizeCity";
// import {
//   collection,
//   addDoc,
//   query,
//   onSnapshot,
//   orderBy,
//   serverTimestamp,
//   doc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import { useUser } from "../context/UserContext";
// import { FaHiking, FaGlassCheers, FaUmbrellaBeach, FaLandmark } from "react-icons/fa";
// import { GiForestCamp } from "react-icons/gi";
// import BackButton from "./BackButton";
// import { Timestamp } from "firebase/firestore";

// export default function CityMeetups({ city }) {
//   const { user, profile } = useUser();
//   const [meetups, setMeetups] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: "",
//     type: "naturaleza",
//     ageRange: "indiferente",
//   });

//   // ✅ Bloqueo si la ciudad no está activa
//   if (
//     !profile?.activeCities?.some(
//       (c) => normalizeCity(c) === normalizeCity(city)
//     )
//   ) {
//     return <p>⚠️ Activa esta ciudad en tu perfil para ver o crear quedadas.</p>;
//   }

//   // 🔹 Formatear fecha
//   function formatDate(date) {
//     if (!date) return "";
//     if (date instanceof Timestamp) return date.toDate().toLocaleDateString();
//     if (typeof date === "string") return date;
//     return "";
//   }

//   // 🔹 Escuchar quedadas
//   useEffect(() => {
//     const q = query(
//       collection(db, "cityMeetups", city, "meetups"),
//       orderBy("createdAt", "desc")
//     );
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setMeetups(data);
//     });
//     return () => unsubscribe();
//   }, [city]);

//   // 🔹 Formulario
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("Debes iniciar sesión para crear una quedada");

//     await addDoc(collection(db, "cityMeetups", city, "meetups"), {
//       ...formData,
//       city,
//       userId: user.uid,
//       userName: profile?.displayName || "Viajero",
//       attendees: [user.uid],
//       createdAt: serverTimestamp(),
//     });

//     setFormData({
//       title: "",
//       description: "",
//       date: "",
//       type: "naturaleza",
//       ageRange: "indiferente",
//     });
//     setShowForm(false);
//   };

//   // 🔹 Unirse / salir
//   const joinMeetup = async (meetupId) => {
//     if (!user) return alert("Debes iniciar sesión");
//     const meetupRef = doc(db, "cityMeetups", city, "meetups", meetupId);
//     await updateDoc(meetupRef, { attendees: arrayUnion(user.uid) });
//   };

//   const leaveMeetup = async (meetupId) => {
//     if (!user) return alert("Debes iniciar sesión");
//     const meetupRef = doc(db, "cityMeetups", city, "meetups", meetupId);
//     await updateDoc(meetupRef, { attendees: arrayRemove(user.uid) });
//   };

//   const typeIcons = {
//     naturaleza: <GiForestCamp className="w-6 h-6 text-green-600" />,
//     aventura: <FaHiking className="w-6 h-6 text-orange-600" />,
//     cultura: <FaLandmark className="w-6 h-6 text-blue-600" />,
//     fiesta: <FaGlassCheers className="w-6 h-6 text-pink-600" />,
//     relax: <FaUmbrellaBeach className="w-6 h-6 text-yellow-500" />,
//   };

//   return (
//     <div className="p-4 space-y-4 max-w-2xl mx-auto">
//       <h2 className="text-xl font-semibold text-blue-700">
//         📌 Quedadas en {city}
//       </h2>

//       {/* Botón para abrir formulario */}
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         {showForm ? "Cancelar" : "➕ Crear quedada"}
//       </button>

//       {/* Formulario */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-3 bg-gray-50 p-4 rounded-lg shadow-inner"
//         >
//           <input
//             type="text"
//             name="title"
//             placeholder="Título"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded"
//           />
//           <textarea
//             name="description"
//             placeholder="Descripción"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded"
//           />
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded"
//           />
//           {/* Tipo */}
//           <div>
//             <label className="font-semibold">Tipo de quedada:</label>
//             <div className="flex flex-wrap gap-4 mt-2">
//               {Object.keys(typeIcons).map((type) => (
//                 <label key={type} className="flex flex-col items-center">
//                   <input
//                     type="radio"
//                     name="type"
//                     value={type}
//                     checked={formData.type === type}
//                     onChange={handleChange}
//                     className="mb-1"
//                   />
//                   {typeIcons[type]}
//                   <span className="text-xs capitalize">{type}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//           {/* Rango edad */}
//           <div>
//             <label className="font-semibold">Rango de edad:</label>
//             <select
//               name="ageRange"
//               value={formData.ageRange}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             >
//               <option value="indiferente">Indiferente</option>
//               <option value="18-25">18-25</option>
//               <option value="26-35">26-35</option>
//               <option value="36-50">36-50</option>
//               <option value="50+">50+</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             Crear
//           </button>
//         </form>
//       )}

//       {/* Lista de quedadas */}
//       <div className="space-y-3">
//         {meetups.length > 0 ? (
//           meetups.map((meetup) => {
//             const isAttending = user && meetup.attendees?.includes(user.uid);
//             return (
//               <div
//                 key={meetup.id}
//                 className="p-4 border rounded-lg shadow bg-white"
//               >
//                 <div className="flex items-center space-x-2">
//                   {typeIcons[meetup.type]}
//                   <h3 className="text-lg font-bold">{meetup.title}</h3>
//                 </div>
//                 <p className="text-sm text-gray-600">{meetup.description}</p>
//                 <p className="text-sm">📅 {formatDate(meetup.date)}</p>
//                 <p className="text-sm">👤 {meetup.userName}</p>
//                 <p className="text-sm">🎯 Edad: {meetup.ageRange}</p>

//                 {user && (
//                   <button
//                     onClick={() =>
//                       isAttending
//                         ? leaveMeetup(meetup.id)
//                         : joinMeetup(meetup.id)
//                     }
//                     className={`mt-2 w-full px-3 py-2 rounded-lg text-white ${
//                       isAttending
//                         ? "bg-red-500 hover:bg-red-600"
//                         : "bg-green-500 hover:bg-green-600"
//                     }`}
//                   >
//                     {isAttending
//                       ? "❌ Salir de la quedada"
//                       : "✅ Unirme a la quedada"}
//                   </button>
//                 )}

//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500">
//                     Asistentes: {meetup.attendees?.length || 0}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-500">No hay quedadas todavía en {city}.</p>
//         )}
//       </div>

//       <BackButton />
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { normalizeCity, displayCityName } from "../utils/normalizeCity";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "../context/UserContext";
import BackButton from "./BackButton";

export default function CityMeetups({ city }) {
  const { user, profile } = useUser();
  const [meetups, setMeetups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "naturaleza",
  });

  // 🔒 Bloqueo si la ciudad no está activa
  if (
    !profile?.activeCities?.some(
      (c) => normalizeCity(c) === normalizeCity(city)
    )
  ) {
    return (
      <p className="p-4">
        ⚠️ Activa {displayCityName(city)} en tu perfil para ver o crear quedadas.
      </p>
    );
  }

  useEffect(() => {
    const q = query(
      collection(db, "cityMeetups", city, "meetups"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMeetups(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [city]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión");

    await addDoc(collection(db, "cityMeetups", city, "meetups"), {
      ...formData,
      userId: user.uid,
      userName: profile?.displayName || "Viajero",
      attendees: [user.uid],
      createdAt: serverTimestamp(),
    });

    setFormData({ title: "", description: "", date: "", type: "naturaleza" });
    setShowForm(false);
  };

  const joinMeetup = async (id) => {
    const ref = doc(db, "cityMeetups", city, "meetups", id);
    await updateDoc(ref, { attendees: arrayUnion(user.uid) });
  };

  const leaveMeetup = async (id) => {
    const ref = doc(db, "cityMeetups", city, "meetups", id);
    await updateDoc(ref, { attendees: arrayRemove(user.uid) });
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-blue-700">
        📌 Quedadas en {displayCityName(city)}
      </h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {showForm ? "Cancelar" : "➕ Crear quedada"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 bg-gray-50 p-4 rounded-lg shadow-inner"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded"
          >
            Crear
          </button>
        </form>
      )}

      <div className="space-y-3">
        {meetups.map((m) => {
          const isJoined = m.attendees?.includes(user?.uid);
          return (
            <div key={m.id} className="p-4 border rounded-lg bg-white shadow">
              <h3 className="text-lg font-bold">{m.title}</h3>
              <p>{m.description}</p>
              <p>📅 {m.date}</p>
              <p>👤 {m.userName}</p>

              {user && (
                <button
                  onClick={() => (isJoined ? leaveMeetup(m.id) : joinMeetup(m.id))}
                  className={`mt-2 w-full px-3 py-2 rounded-lg text-white ${
                    isJoined ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {isJoined ? "❌ Salir" : "✅ Unirme"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <BackButton />
    </div>
  );
}




