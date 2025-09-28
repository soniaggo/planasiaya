
// src/components/CityChat.jsx
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { db } from "../firebaseConfig";
import { normalizeCity } from "../utils/normalizeCity";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import BackButton from "./BackButton";

export default function CityChat({ chatId }) {
  const { user, profile } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // ✅ Bloqueo si la ciudad no está activa
  if (
    !profile?.activeCities?.some(
      (c) => normalizeCity(c) === normalizeCity(chatId)
    )
  ) {
    return <p>⚠️ Activa esta ciudad en tu perfil para chatear.</p>;
  }

  useEffect(() => {
    if (!chatId) return;
    const q = query(
      collection(db, "cityChats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión");
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "cityChats", chatId, "messages"), {
      text: newMessage,
      userId: user.uid,
      userName: profile?.displayName || "Viajero",
      createdAt: serverTimestamp(),
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[90vh] p-4">
      <BackButton />
      <h2 className="text-xl font-bold mb-4">💬 Chat en {chatId}</h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-lg ${
              m.userId === user?.uid
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200"
            }`}
          >
            <p className="text-sm font-bold">{m.userName}</p>
            <p>{m.text}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="flex gap-2 sticky bottom-0 bg-white p-2"
      >
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


