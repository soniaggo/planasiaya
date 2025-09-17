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

  // 📌 Escuchar quedadas en tiempo real
  useEffect(() => {
    const q = query(
      collection(db, "cityMeetups"),
      where("city", "==", city),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetups(events);
    });

    return () => unsubscribe();
  }, [city]);

  // 📌 Crear quedada
  const createMeetup = async () => {
    if (!newMeetup.trim() || !user) return;
    await addDoc(collection(db, "cityMeetups"), {
      city,
      text: newMeetup,
      userId: user.uid,
      userName: profile?.displayName || "Anónimo",
      createdAt: serverTimestamp(),
    });
    setNewMeetup("");
  };

  return (
    <div className="card mt-6">
      <h2 className="text-xl font-bold mb-3">📅 Quedadas en {city}</h2>

      {meetups.length > 0 ? (
        <ul className="space-y-3">
          {meetups.map((m) => (
            <li
              key={m.id}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow flex flex-col"
            >
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {m.text}
              </p>
              <span className="text-xs text-gray-500">
                Creado por {m.userName}
              </span>
              <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200">
                Unirme
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Todavía no hay quedadas en esta ciudad.</p>
      )}

      {/* Input */}
      {user ? (
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={newMeetup}
            onChange={(e) => setNewMeetup(e.target.value)}
            placeholder="Ej: Cena en Khao San Road"
            className="input-field"
            onKeyDown={(e) => e.key === "Enter" && createMeetup()}
          />
          <button onClick={createMeetup} className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-semibold shadow-md transition active:scale-95">
            Guardar
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-3">
          Inicia sesión para crear quedadas.
        </p>
      )}
    </div>
  );
}



