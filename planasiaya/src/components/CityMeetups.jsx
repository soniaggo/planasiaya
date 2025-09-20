
// src/components/CityMeetups.jsx
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";

// Íconos
import { FaHiking, FaGlassCheers, FaUmbrellaBeach, FaLandmark } from "react-icons/fa";
import { GiForestCamp } from "react-icons/gi";

export default function CityMeetups() {
  const { user } = useUser();
  const { city } = useParams(); // 👈 obtenemos la ciudad desde la URL
  const navigate = useNavigate();

  const [meetups, setMeetups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "naturaleza",
    ageRange: "indiferente",
  });

  useEffect(() => {
    if (!city) return;

    const q = query(
      collection(db, "cityMeetups", city, "meetups"), // 👈 subcolección por ciudad
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMeetups(data);
    });

    return () => unsubscribe();
  }, [city]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión para crear una quedada");

    await addDoc(collection(db, "cityMeetups", city, "meetups"), {
      ...formData,
      city,
      userId: user.uid,
      userName: user.displayName || "Viajero",
      createdAt: serverTimestamp(),
    });

    setFormData({
      title: "",
      description: "",
      date: "",
      type: "naturaleza",
      ageRange: "indiferente",
    });
    setShowForm(false);
  };

  const typeIcons = {
    naturaleza: <GiForestCamp className="w-6 h-6 text-green-600" />,
    aventura: <FaHiking className="w-6 h-6 text-orange-600" />,
    cultura: <FaLandmark className="w-6 h-6 text-blue-600" />,
    fiesta: <FaGlassCheers className="w-6 h-6 text-pink-600" />,
    relax: <FaUmbrellaBeach className="w-6 h-6 text-yellow-500" />,
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white space-y-4">
      <h2 className="text-xl font-semibold text-blue-700">
        📌 Quedadas en {city}
      </h2>

      {/* Botón volver atrás */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        ⬅️ Volver
      </button>

      {/* Botón para abrir formulario */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {showForm ? "Cancelar" : "➕ Crear quedada"}
      </button>

      {/* Formulario */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 bg-gray-50 p-4 rounded-lg shadow-inner"
        >
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Tipo de quedada */}
          <div>
            <label className="font-semibold">Tipo de quedada:</label>
            <div className="flex space-x-4 mt-2">
              {Object.keys(typeIcons).map((type) => (
                <label key={type} className="flex flex-col items-center">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={formData.type === type}
                    onChange={handleChange}
                    className="mb-1"
                  />
                  {typeIcons[type]}
                  <span className="text-xs capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rango de edad */}
          <div>
            <label className="font-semibold">Rango de edad:</label>
            <select
              name="ageRange"
              value={formData.ageRange}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="indiferente">Indiferente</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-50">36-50</option>
              <option value="50+">50+</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Crear
          </button>
        </form>
      )}

      {/* Lista de quedadas */}
      <div className="space-y-3">
        {meetups.length > 0 ? (
          meetups.map((meetup) => (
            <div
              key={meetup.id}
              className="p-4 border rounded-lg shadow hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                {typeIcons[meetup.type]}
                <h3 className="text-lg font-bold">{meetup.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{meetup.description}</p>
              <p className="text-sm">📅 {meetup.date}</p>
              <p className="text-sm">👤 {meetup.userName}</p>
              <p className="text-sm">🎯 Edad: {meetup.ageRange}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay quedadas todavía en {city}.</p>
        )}
      </div>
    </div>
  );
}





