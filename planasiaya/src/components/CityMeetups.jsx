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

export default function CityMeetups({ city }) {
  const { user, profile } = useUser();
  const [meetups, setMeetups] = useState([]);
  const [newMeetup, setNewMeetup] = useState("");

  // Escuchar quedadas de la ciudad en tiempo real
  useEffect(() => {
    if (!city) return;

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

  // Crear nueva quedada
  const createMeetup = async (e) => {
    e.preventDefault(); // 👈 muy importante
    if (!newMeetup.trim() || !user) return;

    await addDoc(collection(db, "cityMeetups"), {
      city,
      title: newMeetup,
      userId: user.uid,
      userName: profile?.displayName || profile?.email || "Anónimo",
      createdAt: serverTimestamp(),
    });

    setNewMeetup("");
  };

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3 text-purple-600">
        🎉 Quedadas en {city}
      </h2>

      {meetups.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {meetups.map((m) => (
            <li
              key={m.id}
              className="p-3 border rounded bg-gray-50 dark:bg-gray-700"
            >
              <span className="font-semibold">{m.userName}:</span>{" "}
              {m.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          Todavía no hay quedadas en esta ciudad.
        </p>
      )}

      {user ? (
        <form onSubmit={createMeetup} className="flex gap-2">
          <input
            type="text"
            value={newMeetup}
            onChange={(e) => setNewMeetup(e.target.value)}
            placeholder="Ej: Cena en Khao San Road"
            className="flex-1 border rounded px-2 py-1"
          />
          <button
            type="submit"
            className="bg-brand text-white px-4 py-1 rounded hover:bg-brand-dark"
          >
            Guardar
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">
          Inicia sesión para crear quedadas.
        </p>
      )}
    </div>
  );
}

