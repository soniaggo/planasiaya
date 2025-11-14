// src/hooks/useCityChat.js
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "../context/UserContext";
import { normalizeCity } from "../utils/normalizeCity";

export function useCityChat(chatId) {
  const { user, profile } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isCityActive = !!profile?.activeCities?.some(
    (c) => normalizeCity(c) === normalizeCity(chatId)
  );

  useEffect(() => {
    if (!chatId || !isCityActive) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "cityChats", chatId, "messages"),
      orderBy("createdAt", "asc"),
      limit(100) // 🔹 por si un chat crece mucho
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("No se pudieron cargar los mensajes");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [chatId, isCityActive]);

  const sendMessage = async (text) => {
    if (!user) throw new Error("Debes iniciar sesión");
    if (!text.trim()) return;

    await addDoc(collection(db, "cityChats", chatId, "messages"), {
      text: text.trim(),
      userId: user.uid,
      userName: profile?.displayName || "Viajero",
      createdAt: serverTimestamp(),
    });
  };

  return {
    user,
    profile,
    messages,
    loading,
    error,
    isCityActive,
    sendMessage,
  };
}
