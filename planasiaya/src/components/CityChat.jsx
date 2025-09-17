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
    <div className="card mt-6">
      <h2 className="text-xl font-bold mb-3">💬 Chat en {city}</h2>

      {/* Área de mensajes */}
      <div className="h-64 overflow-y-auto border rounded-lg p-2 mb-3 bg-gray-50 dark:bg-gray-700">
        {messages.map((msg) => {
          const isMine = msg.userId === user?.uid;
          return (
            <div
              key={msg.id}
              className={`flex mb-2 ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-3 py-2 rounded-lg shadow text-sm ${
                  isMine
                    ? "bg-brand text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                <p className="font-semibold">{isMine ? "Tú" : msg.userName}</p>
                <p>{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.createdAt?.toDate
                    ? msg.createdAt.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
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
            className="input-field"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-semibold shadow-md transition active:scale-95">
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






