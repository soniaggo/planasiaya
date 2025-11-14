// src/hooks/useCityMeetups.js
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "../context/UserContext";
import { normalizeCity } from "../utils/normalizeCity";

export function useCityMeetups(city) {
  const { user, profile } = useUser();

  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isCityActive = !!profile?.activeCities?.some(
    (c) => normalizeCity(c) === normalizeCity(city)
  );

  // Suscripción a Firestore
  useEffect(() => {
    if (!city || !isCityActive) {
      setMeetups([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "cityMeetups", city, "meetups"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setMeetups(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("No se pudieron cargar las quedadas");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [city, isCityActive]);

  // Crear quedada
  const createMeetup = async (formData) => {
    if (!user) throw new Error("Debes iniciar sesión para crear quedadas");

    await addDoc(collection(db, "cityMeetups", city, "meetups"), {
      ...formData,
      userId: user.uid,
      userName: profile?.displayName || "Viajero",
      attendees: [user.uid],
      createdAt: serverTimestamp(),
    });
  };

  // Unirse / salir de quedada
  const joinMeetup = async (id) => {
    if (!user) return;
    const ref = doc(db, "cityMeetups", city, "meetups", id);
    await updateDoc(ref, { attendees: arrayUnion(user.uid) });
  };

  const leaveMeetup = async (id) => {
    if (!user) return;
    const ref = doc(db, "cityMeetups", city, "meetups", id);
    await updateDoc(ref, { attendees: arrayRemove(user.uid) });
  };

  return {
    user,
    profile,
    meetups,
    loading,
    error,
    isCityActive,
    createMeetup,
    joinMeetup,
    leaveMeetup,
  };
}
