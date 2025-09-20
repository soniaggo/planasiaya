


// src/pages/AllMeetups.jsx
import { useState, useEffect } from "react";
import {
  collectionGroup,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import BackButton from "../components/BackButton";

export default function AllMeetups() {
  const [meetups, setMeetups] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const q = query(
      collectionGroup(db, "meetups"),
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetups(data);
    });

    return () => unsubscribe();
  }, []);

  const getFilteredMeetups = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return meetups.filter((m) => {
      if (!m.date) return false;
      const meetupDate = new Date(m.date);
      meetupDate.setHours(0, 0, 0, 0);

      if (filter === "today") {
        return meetupDate.getTime() === today.getTime();
      }

      if (filter === "tomorrow") {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return meetupDate.getTime() === tomorrow.getTime();
      }

      if (filter === "week") {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + 7);
        return meetupDate >= today && meetupDate <= endOfWeek;
      }

      if (filter === "nextWeek") {
        const startNextWeek = new Date(today);
        startNextWeek.setDate(today.getDate() + 2); // después de mañana
        const endNextWeek = new Date(today);
        endNextWeek.setDate(today.getDate() + 15);
        return meetupDate >= startNextWeek && meetupDate <= endNextWeek;
      }

      if (filter === "all") {
        // 👇 Mostrar solo Hoy y Mañana en el modo "general"
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return (
          meetupDate.getTime() === today.getTime() ||
          meetupDate.getTime() === tomorrow.getTime()
        );
      }

      return false;
    });
  };

  const filteredMeetups = getFilteredMeetups();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">🌍 Quedadas Globales</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-lg ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Hoy & Mañana
        </button>
        <button
          onClick={() => setFilter("today")}
          className={`px-3 py-1 rounded-lg ${
            filter === "today"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Hoy
        </button>
        <button
          onClick={() => setFilter("tomorrow")}
          className={`px-3 py-1 rounded-lg ${
            filter === "tomorrow"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Mañana
        </button>
        <button
          onClick={() => setFilter("week")}
          className={`px-3 py-1 rounded-lg ${
            filter === "week"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Esta semana
        </button>
        <button
          onClick={() => setFilter("nextWeek")}
          className={`px-3 py-1 rounded-lg ${
            filter === "nextWeek"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Próxima semana
        </button>
      </div>

      {/* Lista de quedadas */}
      <div className="space-y-3">
        {filteredMeetups.length > 0 ? (
          filteredMeetups.map((meetup) => (
            <div
              key={meetup.id}
              className="p-4 border rounded-lg shadow hover:bg-gray-50"
            >
              <h3 className="text-lg font-bold">{meetup.title}</h3>
              <p className="text-sm text-gray-600">{meetup.description}</p>
              <p className="text-sm">📍 {meetup.city}</p>
              <p className="text-sm">📅 {meetup.date}</p>
              <p className="text-sm">👤 {meetup.userName}</p>
              <p className="text-sm">🎯 Edad: {meetup.ageRange}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay quedadas en este rango.</p>
        )}
      </div>

      <BackButton />
    </div>
  );
}



