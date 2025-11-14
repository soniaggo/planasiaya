


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




