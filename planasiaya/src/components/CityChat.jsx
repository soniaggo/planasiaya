

// src/components/CityChat.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "../context/UserContext";

export default function CityChat({ city: cityProp }) {
  const { user } = useUser();
  const { chatId } = useParams(); // si viene de la URL
  const city = cityProp || chatId; // prioridad a la prop, si no usar la URL

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!city) return; // 👈 evita reventar si aún no hay city

    const q = query(
      collection(db, "cityChats", city, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, [city]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión para chatear");
    if (!newMessage.trim()) return;

    if (!city) return alert("Error: ciudad no encontrada");

    await addDoc(collection(db, "cityChats", city, "messages"), {
      text: newMessage,
      userId: user.uid,
      userName: user.displayName || "Viajero",
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white space-y-4">
      <h2 className="text-xl font-semibold text-blue-700">
        💬 Chat en {city || "cargando..."}
      </h2>

      <div className="max-h-64 overflow-y-auto space-y-2 border p-2 rounded bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 bg-white rounded shadow">
            <p className="text-sm font-bold">{msg.userName}</p>
            <p className="text-gray-700">{msg.text}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">Aún no hay mensajes.</p>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}





