
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

export default function CityMeetups({ city, country }) {
  const { user, profile } = useUser();
  const [title, setTitle] = useState("");
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📌 Escuchar quedadas activas en tiempo real
  useEffect(() => {
    const now = new Date();
    const q = query(
      collection(db, "cityMeetups"),
      where("city", "==", city),
      where("expiresAt", ">", now),
      orderBy("expiresAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetups(data);
    });

    return () => unsubscribe();
  }, [city]);

  // 📌 Crear quedada
  const createMeetup = async () => {
    if (!title.trim() || !user) return;
    setLoading(true);

    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2h
    await addDoc(collection(db, "cityMeetups"), {
      title,
      city,
      country,
      authorId: user.uid,
      authorName: profile?.displayName || "Anónimo",
      createdAt: serverTimestamp(),
      expiresAt,
    });

    setTitle("");
    setLoading(false);
  };

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">📅 Quedadas en {city}</h2>

      {user ? (
        <div className="flex gap-2 flex-wrap mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Cena de mochileros"
            className="flex-1 border rounded px-2 py-1"
            onKeyDown={(e) => e.key === "Enter" && createMeetup()}
          />
          <button
            onClick={createMeetup}
            disabled={loading}
            className="bg-brand text-white px-4 py-1 rounded hover:bg-brand-dark disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Inicia sesión para crear una quedada.
        </p>
      )}

      <div className="space-y-3">
        {meetups.length > 0 ? (
          meetups.map((m) => (
            <div
              key={m.id}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-bold">{m.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Autor: {m.authorName}
                </p>
                <p className="text-xs text-gray-500">
                  Expira:{" "}
                  {m.expiresAt?.toDate
                    ? m.expiresAt.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
              <button className="mt-2 sm:mt-0 bg-brand text-white px-3 py-1 rounded-lg shadow hover:bg-brand-dark text-sm font-semibold">
                Unirme
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay quedadas activas.</p>
        )}
      </div>
    </div>
  );
}
