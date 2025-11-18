// src/pages/CityMeetups.jsx
import { useState } from "react";
import { displayCityName } from "../utils/normalizeCity";
import BackButton from "../components/BackButton";
import { useCityMeetups } from "../hooks/useCityMeetups";
import { sanitizeText, isNonEmpty } from "../utils/validation";

export default function CityMeetups({ city }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "naturaleza",
  });

  const {
    user,
    isCityActive,
    meetups,
    loading,
    error,
    createMeetup,
    joinMeetup,
    leaveMeetup,
  } = useCityMeetups(city);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 Limpiar y validar datos antes de crear la quedada
    const title = sanitizeText(formData.title, { maxLength: 120 });
    const description = sanitizeText(formData.description, {
      maxLength: 1000,
    });
    const date = formData.date?.trim() || "";
    const type = formData.type || "naturaleza";

    if (!isNonEmpty(title) || !isNonEmpty(description) || !date) {
      alert("Rellena título, descripción y fecha.");
      return;
    }

    try {
      await createMeetup({ title, description, date, type });
      setFormData({
        title: "",
        description: "",
        date: "",
        type: "naturaleza",
      });
      setShowForm(false);
    } catch (err) {
      alert(err.message || "Error al crear la quedada");
    }
  };

  // Returns condicionales DESPUÉS de hooks
  if (!city) {
    return (
      <p className="p-4">
        ⚠️ Ciudad no válida. Vuelve atrás y selecciona una ciudad.
      </p>
    );
  }

  if (!isCityActive) {
    return (
      <p className="p-4">
        ⚠️ Activa {displayCityName(city)} en tu perfil para ver o crear
        quedadas.
      </p>
    );
  }

  if (loading) {
    return <p className="p-4">Cargando quedadas…</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

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

          // Normalizamos fecha (string o Timestamp)
          let displayDate = "";
          if (m.date) {
            if (m.date.toDate) {
              displayDate = m.date.toDate().toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
            } else {
              displayDate = new Date(m.date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
            }
          }

          return (
            <div
              key={m.id}
              className="p-4 border rounded-lg bg-white shadow"
            >
              <h3 className="text-lg font-bold">{m.title}</h3>
              <p>{m.description}</p>
              {displayDate && <p>📅 {displayDate}</p>}
              <p>👤 {m.userName}</p>

              {user && (
                <button
                  onClick={() =>
                    isJoined ? leaveMeetup(m.id) : joinMeetup(m.id)
                  }
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


