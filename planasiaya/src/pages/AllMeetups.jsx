


// src/pages/AllMeetups.jsx
import { useState, useEffect } from "react";
import {
  collectionGroup,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "../context/UserContext";
import BackButton from "../components/BackButton";
import {
  FaHiking,
  FaGlassCheers,
  FaUmbrellaBeach,
  FaLandmark,
} from "react-icons/fa";
import { GiForestCamp } from "react-icons/gi";

export default function AllMeetups() {
  const { user } = useUser();
  const [meetups, setMeetups] = useState([]);

  const typeIcons = {
    naturaleza: <GiForestCamp className="w-5 h-5 text-green-600" />,
    aventura: <FaHiking className="w-5 h-5 text-orange-600" />,
    cultura: <FaLandmark className="w-5 h-5 text-blue-600" />,
    fiesta: <FaGlassCheers className="w-5 h-5 text-pink-600" />,
    relax: <FaUmbrellaBeach className="w-5 h-5 text-yellow-500" />,
  };

  const normalizeToDate = (d) => {
    if (!d) return null;
    if (d instanceof Timestamp) return d.toDate();
    const asDate = new Date(d);
    return isNaN(asDate.getTime()) ? null : asDate;
  };

  const endOfDay = (d) => {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  };

  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const formatDate = (d) => {
    if (!d) return "";
    const date = normalizeToDate(d);
    if (!date) return "";
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  useEffect(() => {
    const now = new Date();
    const max = new Date();
    max.setDate(now.getDate() + 15);

    const q = query(collectionGroup(db, "meetups"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            ref: docSnap.ref,
          };
        });

        // Mantén activas las de hoy hasta 23:59
        const filtered = rows.filter((m) => {
          const eventStart = normalizeToDate(m.date);
          if (!eventStart) return false;
          const eventEnd = endOfDay(eventStart);
          return eventEnd >= now && startOfDay(eventStart) <= max;
        });

        // Opcional: ordena por fecha de evento ascendente (más próximas primero)
        filtered.sort((a, b) => {
          const da = normalizeToDate(a.date)?.getTime() ?? 0;
          const dbb = normalizeToDate(b.date)?.getTime() ?? 0;
          return da - dbb;
        });

        setMeetups(filtered);
      },
      (err) => {
        console.error("❌ Error cargando quedadas globales:", err);
      }
    );

    return () => unsub();
  }, []);

  const joinMeetup = async (ref) => {
    if (!user) return alert("Debes iniciar sesión");
    try {
      await updateDoc(ref, { attendees: arrayUnion(user.uid) });
    } catch (e) {
      console.error("No se pudo unir:", e);
    }
  };

  const leaveMeetup = async (ref) => {
    if (!user) return alert("Debes iniciar sesión");
    try {
      await updateDoc(ref, { attendees: arrayRemove(user.uid) });
    } catch (e) {
      console.error("No se pudo salir:", e);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl sm:text-2xl font-bold text-blue-700">
        🌍 Quedadas globales
      </h1>

      {meetups.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No hay quedadas activas (hoy o próximos 15 días).
        </p>
      ) : (
        <ul className="space-y-3">
          {meetups.map((m) => {
            const isAttending = user && m.attendees?.includes?.(user.uid);
            return (
              <li
                key={m.id}
                className="bg-white rounded-lg shadow border p-3 sm:p-4"
              >
                <div className="flex items-center gap-2">
                  {typeIcons[m.type] || null}
                  <h3 className="font-semibold text-base sm:text-lg">
                    {m.title}
                  </h3>
                </div>

                <div className="mt-1 text-xs sm:text-sm text-gray-700 space-y-0.5">
                  <p>📅 {formatDate(m.date)}</p>
                  {m.city && <p>📍 {m.city}</p>}
                  {m.userName && <p>👤 {m.userName}</p>}
                  {m.ageRange && <p>🎯 Edad: {m.ageRange}</p>}
                </div>

                {m.description && (
                  <p className="mt-2 text-sm text-gray-600">{m.description}</p>
                )}

                {user && (
                  <button
                    onClick={() =>
                      isAttending ? leaveMeetup(m.ref) : joinMeetup(m.ref)
                    }
                    className={`mt-3 w-full py-2 rounded-lg text-white text-sm font-medium ${
                      isAttending
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isAttending ? "❌ Salir de la quedada" : "✅ Unirme a la quedada"}
                  </button>
                )}

                <p className="mt-2 text-[12px] text-gray-500">
                  Asistentes: {m.attendees?.length || 0}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      <BackButton />
    </div>
  );
}


