// Importar las funciones necesarias
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Configuración de tu aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwbeV70aqgK6wPxS7x9WetU4GntRbhFDE",
  authDomain: "planasiaya.firebaseapp.com",
  projectId: "planasiaya",
  storageBucket: "planasiaya.firebasestorage.app",
  messagingSenderId: "841564341630",
  appId: "1:841564341630:web:265c20f3e20c016ea15f2f",
  measurementId: "G-TTBJCLTXRM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar autenticación para usar en Login/Register
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

