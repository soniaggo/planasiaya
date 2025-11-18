// src/pages/CityChat.jsx
import { useState } from "react";
import BackButton from "../components/BackButton";
import { displayCityName } from "../utils/normalizeCity";
import { useCityChat } from "../hooks/useCityChat";
import { sanitizeText, isNonEmpty } from "../utils/validation";

export default function CityChat({ chatId }) {
  const [newMessage, setNewMessage] = useState("");

  const { user, messages, loading, error, isCityActive, sendMessage } =
    useCityChat(chatId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 limpiar y validar mensaje antes de enviarlo
    const clean = sanitizeText(newMessage, { maxLength: 500 });
    if (!isNonEmpty(clean)) return; // no mandamos vacíos

    try {
      await sendMessage(clean); // enviamos el texto ya limpio
      setNewMessage("");
    } catch (err) {
      alert(err.message || "Error al enviar el mensaje");
    }
  };

  // ⚠️ returns condicionales DESPUÉS de los hooks

  if (!chatId) {
    return (
      <p className="p-4">
        ⚠️ Chat no válido. Vuelve atrás y selecciona una ciudad.
      </p>
    );
  }

  if (!isCityActive) {
    return (
      <p className="p-4">
        ⚠️ Activa {displayCityName(chatId)} en tu perfil para chatear.
      </p>
    );
  }

  if (loading) {
    return <p className="p-4">Cargando mensajes…</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col h-[90vh] p-4 max-w-2xl mx-auto">
      <BackButton />
      <h2 className="text-xl font-bold mb-4">
        💬 Chat en {displayCityName(chatId)}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-lg max-w-[80%] ${
              m.userId === user?.uid
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200"
            }`}
          >
            <p className="text-xs font-bold mb-1">{m.userName}</p>
            <p className="text-sm break-words">{m.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

