import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { normalizeCity } from "../utils/normalizeCity";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);

        // Escucha en tiempo real el perfil
        const unsubProfile = onSnapshot(userRef, async (snap) => {
          if (snap.exists()) {
            setProfile(snap.data());
          } else {
            // Si no existe, creamos documento de usuario
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || "Viajero",
              photoURL: currentUser.photoURL || "",
              favorites: [],
              activeCities: [],
              bio: "",
              createdAt: new Date(),
            });
          }
          setLoading(false);
        });

        // cleanup del snapshot de perfil cuando cambia de usuario o se desmonta
        return () => unsubProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    // cleanup de la suscripción a auth
    return () => unsub();
  }, []);

  // ⭐ Añadir favorito (y ciudad activa) con actualización optimista del estado
  const addFavorite = async (cityName) => {
    if (!user) return;
    try {
      const slug = normalizeCity(cityName);
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        favorites: arrayUnion(slug),
        activeCities: arrayUnion(slug),
      });

      // actualizamos también el estado local
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              favorites: Array.from(
                new Set([...(prev.favorites || []), slug])
              ),
              activeCities: Array.from(
                new Set([...(prev.activeCities || []), slug])
              ),
            }
          : prev
      );
    } catch (err) {
      console.error("❌ Error añadiendo favorito:", err);
    }
  };

  // ⭐ Quitar favorito (y de ciudades activas) con actualización optimista
  const removeFavorite = async (cityName) => {
    if (!user) return;
    try {
      const slug = normalizeCity(cityName);
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        favorites: arrayRemove(slug),
        activeCities: arrayRemove(slug),
      });

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              favorites: (prev.favorites || []).filter((f) => f !== slug),
              activeCities: (prev.activeCities || []).filter(
                (c) => c !== slug
              ),
            }
          : prev
      );
    } catch (err) {
      console.error("❌ Error quitando favorito:", err);
    }
  };

  // ⭐ Actualizar perfil genérico (bio, activeCities, etc.) + estado local
  const updateProfile = async (updates) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, updates);

      setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
    } catch (err) {
      console.error("❌ Error actualizando perfil:", err);
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        addFavorite,
        removeFavorite,
        updateProfile,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
