// src/components/CityChat.jsx
import { useEffect, useState, useRef } from "react";
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

export default function CityChat({ city }) {
  const { user, profile } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // 📌 Escuchar mensajes en tiempo real
  useEffect(() => {
    const q = query(
      collection(db, "cityChats"),
      where("city", "==", city),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      // 👇 auto-scroll abajo
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsubscribe();
  }, [city]);

  // 📌 Enviar mensaje
  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    await addDoc(collection(db, "cityChats"), {
      city,
      text: newMessage,
      userId: user.uid,
      userName: profile?.displayName || "Anónimo",
      createdAt: serverTimestamp(),
    });
    setNewMessage("");
  };

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">💬 Chat en {city}</h2>

      {/* Área de mensajes */}
      <div className="h-64 overflow-y-auto border rounded p-2 mb-2 bg-gray-50 dark:bg-gray-700 flex flex-col">
        {messages.map((msg) => {
          const isOwn = msg.userId === user?.uid;
          return (
            <div
              key={msg.id}
              className={`flex mb-2 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[75%] text-sm shadow ${
                  isOwn
                    ? "bg-brand text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                {!isOwn && (
                  <p className="font-semibold text-xs mb-0.5">{msg.userName}</p>
                )}
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      {user ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border rounded px-2 py-1"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-brand text-white px-4 py-1 rounded hover:bg-brand-dark"
          >
            Enviar
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Inicia sesión para participar en el chat.
        </p>
      )}
    </div>
  );
}



