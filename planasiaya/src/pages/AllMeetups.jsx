import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function AllMeetups() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const now = new Date();

    const q = query(
      collection(db, "cityMeetups"),
      where("expiresAt", ">", now), // 🔥 solo las que no caducaron
      orderBy("expiresAt", "asc")   // ordenadas por caducidad
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMeetups = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetups(allMeetups);
    });

    return () => unsubscribe();
  }, []);

  // 📌 Agrupamos por país y ciudad
  const grouped = meetups.reduce((acc, m) => {
    if (!acc[m.country]) acc[m.country] = {};
    if (!acc[m.country][m.city]) acc[m.country][m.city] = [];
    acc[m.country][m.city].push(m);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-brand">🌍 Quedadas activas</h1>

      {Object.keys(grouped).length === 0 && (
        <p className="text-gray-600">No hay quedadas activas ahora mismo.</p>
      )}

      {Object.entries(grouped).map(([country, cities]) => (
        <div key={country} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-secondary">🇨🇴 {country}</h2>

          {Object.entries(cities).map(([city, meetups]) => (
            <div key={city} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">📍 {city}</h3>
              <div className="space-y-3">
                {meetups.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold">{m.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Autor: {m.authorName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Expira:{" "}
                        {m.expiresAt?.toDate
                          ? m.expiresAt.toDate().toLocaleString([], {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Sin fecha"}
                      </p>
                    </div>
                    <Link
                      to={`/guides/${city.toLowerCase().replace(/\s+/g, "-")}`}
                      className="mt-2 sm:mt-0 inline-block bg-brand text-white px-3 py-1 rounded-lg shadow hover:bg-brand-dark text-sm font-semibold text-center"
                    >
                      Ver en {city}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

