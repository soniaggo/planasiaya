import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Cargar perfil del usuario en Firestore
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          // Crear documento si no existe
          await setDoc(userRef, {
            email: firebaseUser.email,
            favorites: [],
          });
          setProfile({ email: firebaseUser.email, favorites: [] });
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 👉 Funciones para manejar favoritos
  const addFavorite = async (destination) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: arrayUnion(destination),
    });
    setProfile((prev) => ({
      ...prev,
      favorites: [...(prev?.favorites || []), destination],
    }));
  };

  const removeFavorite = async (destination) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: arrayRemove(destination),
    });
    setProfile((prev) => ({
      ...prev,
      favorites: (prev?.favorites || []).filter((fav) => fav !== destination),
    }));
  };

  return (
    <UserContext.Provider
      value={{ user, profile, loading, addFavorite, removeFavorite }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
