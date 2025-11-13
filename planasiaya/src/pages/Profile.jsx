

// import { useEffect, useState } from "react";
// import { useUser } from "../context/UserContext";
// import { Link } from "react-router-dom";
// import guidesData from "../data/guidesData";
// import { Trash2, Edit3 } from "lucide-react";
// import PhotoUploader from "../components/PhotoUploader";
// import Loader from "../components/Loader";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   doc,
//   updateDoc,
//   arrayRemove,
//   arrayUnion,
// } from "firebase/firestore";
// import { db, auth } from "../firebaseConfig";
// import PageFade from "../components/PageFade";
// import { signOut } from "firebase/auth";

// export default function Profile() {
//   const { user, profile, removeFavorite } = useUser();

//   const [photos, setPhotos] = useState([]);
//   const [loadingPhotos, setLoadingPhotos] = useState(true);
//   const [bio, setBio] = useState(profile?.bio || "");
//   const [savingBio, setSavingBio] = useState(false);

//   // 🔎 Escuchar fotos en tiempo real
//   useEffect(() => {
//     if (!user) return;
//     setLoadingPhotos(true);
//     const q = query(collection(db, "photos"), where("userId", "==", user.uid));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const userPhotos = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPhotos(userPhotos);
//       setLoadingPhotos(false);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   // Guardar bio en Firestore
//   const saveBio = async () => {
//     if (!user) return;
//     try {
//       setSavingBio(true);
//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, { bio });
//     } catch (err) {
//       console.error("❌ Error guardando bio:", err);
//     } finally {
//       setSavingBio(false);
//     }
//   };

//   // Logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       window.location.href = "/login";
//     } catch (err) {
//       console.error("❌ Error cerrando sesión:", err);
//     }
//   };

//   // Si no hay user
//   if (!user) {
//     return (
//       <PageFade>
//         <div className="p-6 text-center">
//           <h1 className="text-2xl font-bold mb-4">👤 Perfil</h1>
//           <p className="mb-4">No has iniciado sesión.</p>
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-brand text-white rounded-lg shadow hover:bg-brand-dark"
//           >
//             Iniciar sesión
//           </Link>
//         </div>
//       </PageFade>
//     );
//   }

//   // 🔎 Favoritos
//   const favoriteDetails = profile?.favorites
//     ?.map((favName) => {
//       for (const country of guidesData) {
//         const match = country.destinations.find((d) => d.name === favName);
//         if (match) return match;
//       }
//       return null;
//     })
//     .filter(Boolean);

//   // 🔎 Ciudades activas (para chat/quedadas)
//   const toggleCityActive = async (cityName) => {
//     if (!user) return;
//     try {
//       const userRef = doc(db, "users", user.uid);
//       if (profile?.activeCities?.includes(cityName)) {
//         await updateDoc(userRef, {
//           activeCities: arrayRemove(cityName),
//         });
//       } else {
//         await updateDoc(userRef, {
//           activeCities: arrayUnion(cityName),
//         });
//       }
//     } catch (err) {
//       console.error("❌ Error activando ciudad:", err);
//     }
//   };

//   return (
//     <PageFade>
//       <div className="p-6 max-w-5xl mx-auto">
//         {/* Cabecera */}
//         <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow">
//             {profile?.photoURL ? (
//               <img
//                 src={profile.photoURL}
//                 alt="Avatar"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-brand to-brand-light text-white font-bold text-3xl">
//                 {profile?.displayName?.charAt(0).toUpperCase() || "U"}
//               </div>
//             )}
//           </div>
//           <div className="flex-1 text-center sm:text-left">
//             <h1 className="text-2xl font-extrabold text-brand mb-2">
//               {profile?.displayName || "Usuario anónimo"}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-2">
//               {profile?.email}
//             </p>
//           </div>

//           <div className="flex flex-col gap-2">
//             <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg shadow hover:bg-brand-dark">
//               <Edit3 size={18} /> Editar perfil
//             </button>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
//             >
//               Cerrar sesión
//             </button>
//           </div>
//         </div>

//         {/* Bio editable */}
//         <section className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
//           <h2 className="text-lg font-bold mb-2 text-secondary">✍️ Mi bio</h2>
//           <textarea
//             rows={3}
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
//             placeholder="Escribe algo sobre ti..."
//           />
//           <button
//             onClick={saveBio}
//             disabled={savingBio}
//             className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//           >
//             {savingBio ? "Guardando..." : "Guardar bio"}
//           </button>
//         </section>

//         {/* Favoritos */}
//         <section className="mt-10">
//           <h2 className="text-2xl font-bold mb-4 text-secondary">
//             ❤️ Mis destinos favoritos
//           </h2>
//           {favoriteDetails?.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {favoriteDetails.map((fav, i) => (
//                 <div
//                   key={i}
//                   className="group bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
//                 >
//                   <button
//                     onClick={() => removeFavorite(fav.name)}
//                     className="absolute top-2 right-2 z-10 bg-red-600 p-2 rounded-full shadow hover:bg-red-700 transition"
//                     title="Eliminar favorito"
//                   >
//                     <Trash2 size={18} className="text-white" />
//                   </button>
//                   <Link to={fav.path}>
//                     <div className="relative w-full h-40 md:h-48 overflow-hidden">
//                       <img
//                         src={fav.image}
//                         alt={fav.name}
//                         loading="lazy"
//                         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                     </div>
//                     <div className="p-4">
//                       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-brand transition-colors">
//                         {fav.name}
//                       </h3>
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600 dark:text-gray-300">
//               Todavía no has guardado destinos como favoritos.
//             </p>
//           )}
//         </section>

//         {/* Ciudades activas */}
//         <section className="mt-10">
//           <h2 className="text-2xl font-bold mb-4 text-secondary">
//             🟢 Ciudades activas
//           </h2>
//           {profile?.activeCities?.length > 0 ? (
//             <div className="flex flex-wrap gap-3">
//               {profile.activeCities.map((city, i) => (
//                 <button
//                   key={i}
//                   onClick={() => toggleCityActive(city)}
//                   className="px-4 py-2 rounded-full bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700 transition"
//                 >
//                   {city} ✖
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600 dark:text-gray-300">
//               No tienes ninguna ciudad activa. Marca un destino como favorito o
//               actívalo aquí para chatear y unirte a quedadas.
//             </p>
//           )}
//         </section>

//         {/* Subir foto */}
//         <section className="mt-10">
//           <h2 className="text-2xl font-bold mb-4 text-secondary">
//             📤 Sube tus fotos
//           </h2>
//           <PhotoUploader />
//         </section>

//         {/* Galería personal */}
//         <section className="mt-10">
//           <h2 className="text-2xl font-bold mb-4 text-secondary">📷 Mis fotos</h2>
//           {loadingPhotos ? (
//             <Loader text="Cargando tus fotos..." />
//           ) : photos.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//               {photos.map((photo) => (
//                 <div
//                   key={photo.id}
//                   className="relative group bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
//                 >
//                   {/* Foto cuadrada */}
//                   <div className="relative w-full pt-[100%]">
//                     <img
//                       src={photo.url}
//                       alt="Foto subida"
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />
//                   </div>
//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-2 text-white">
//                     <p className="text-sm">{profile?.displayName}</p>
//                     <span className="text-xs">
//                       {photo.visibility === "public"
//                         ? "🌍"
//                         : photo.visibility === "friends"
//                         ? "👥"
//                         : "🔒"}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">Todavía no has subido fotos.</p>
//           )}
//         </section>
//       </div>
//     </PageFade>
//   );
// }
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import guidesData from "../data/guidesData";
import { normalizeCity, displayCityName } from "../utils/normalizeCity"; // ✅ nombres bonitos
import { Trash2, Edit3 } from "lucide-react";
import PhotoUploader from "../components/PhotoUploader";
import Loader from "../components/Loader";
import PageFade from "../components/PageFade";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function Profile() {
  const { user, profile, removeFavorite } = useUser();

  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [bio, setBio] = useState(profile?.bio || "");
  const [savingBio, setSavingBio] = useState(false);

  // 🔎 Escuchar fotos en tiempo real
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

  // Guardar bio en Firestore
  const saveBio = async () => {
    if (!user) return;
    try {
      setSavingBio(true);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { bio });
    } catch (err) {
      console.error("❌ Error guardando bio:", err);
    } finally {
      setSavingBio(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (err) {
      console.error("❌ Error cerrando sesión:", err);
    }
  };

  if (!user) {
    return (
      <PageFade>
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
      </PageFade>
    );
  }

  // 🔎 Favoritos → convertir slugs en destinos bonitos
  const favoriteDetails = profile?.favorites
    ?.map((slug) => {
      for (const country of guidesData) {
        const match = country.destinations.find(
          (d) => normalizeCity(d.name) === slug
        );
        if (match) return match;
      }
      return { name: displayCityName(slug), slug };
    })
    .filter(Boolean);

  // 🔎 Ciudades activas → también nombres bonitos
  const activeCities = profile?.activeCities?.map((c) => ({
    slug: normalizeCity(c),
    name: displayCityName(c),
  }));

  // 🔄 Eliminar ciudad activa
  const removeActiveCity = async (citySlug) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        activeCities: arrayRemove(citySlug),
      });
    } catch (err) {
      console.error("❌ Error eliminando ciudad activa:", err);
    }
  };

  return (
    <PageFade>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow">
            {profile?.photoURL ? (
              <img
                src={profile.photoURL}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-brand to-brand-light text-white font-bold text-3xl">
                {profile?.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-extrabold text-brand mb-2">
              {profile?.displayName || "Usuario anónimo"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {profile?.email}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg shadow hover:bg-brand-dark">
              <Edit3 size={18} /> Editar perfil
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Bio editable */}
        <section className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2 text-secondary">✍️ Mi bio</h2>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Escribe algo sobre ti..."
          />
          <button
            onClick={saveBio}
            disabled={savingBio}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {savingBio ? "Guardando..." : "Guardar bio"}
          </button>
        </section>

        {/* Favoritos */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-secondary">
            ❤️ Mis destinos favoritos
          </h2>
          {favoriteDetails?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favoriteDetails.map((fav, i) => (
                <div
                  key={i}
                  className="group bg-white dark:bg-darkCard rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
                >
                  <button
                    onClick={() =>
                      removeFavorite(normalizeCity(fav.name) || fav.slug)
                    }
                    className="absolute top-2 right-2 z-10 bg-red-600 p-2 rounded-full shadow hover:bg-red-700 transition"
                    title="Eliminar favorito"
                  >
                    <Trash2 size={18} className="text-white" />
                  </button>
                  {fav.path ? (
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
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-brand transition-colors">
                          {fav.name}
                        </h3>
                      </div>
                    </Link>
                  ) : (
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-brand transition-colors">
                        {fav.name}
                      </h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              Todavía no has guardado destinos como favoritos.
            </p>
          )}
        </section>

        {/* Ciudades activas */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-secondary">
            🟢 Ciudades activas
          </h2>
          {activeCities?.length > 0 ? (
            <ul className="space-y-2">
              {activeCities.map((city, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-white dark:bg-gray-800 px-4 py-2 rounded shadow"
                >
                  <span>{city.name}</span>
                  <button
                    onClick={() => removeActiveCity(city.slug)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Quitar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No tienes ninguna ciudad activa.
            </p>
          )}
        </section>

        {/* Subir foto */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-secondary">
            📤 Sube tus fotos
          </h2>
          <PhotoUploader />
        </section>

        {/* Galería personal */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-secondary">
            📷 Mis fotos
          </h2>
          {loadingPhotos ? (
            <Loader text="Cargando tus fotos..." />
          ) : photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <div className="relative w-full pt-[100%]">
                    <img
                      src={photo.url}
                      alt="Foto subida"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Todavía no has subido fotos.</p>
          )}
        </section>
      </div>
    </PageFade>
  );
}
