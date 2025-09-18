

// src/components/PhotoUploader.jsx
import { useState } from "react";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useUser } from "../context/UserContext";
import Loader from "./Loader";

export default function PhotoUploader() {
  const { user, profile } = useUser();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibility, setVisibility] = useState("private"); // "private" | "friends" | "public"
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !user) {
      setMessage("❌ Selecciona una foto primero.");
      return;
    }

    setUploading(true);
    setMessage("");

    const fileRef = ref(storage, `photos/${user.uid}/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percent);
      },
      (error) => {
        setMessage("❌ Error al subir: " + error.message);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        // Guardar en Firestore
        await addDoc(collection(db, "photos"), {
          userId: user.uid,
          userName: profile?.displayName || "Anónimo",
          url,
          visibility,
          createdAt: serverTimestamp(),
        });

        setMessage("✅ Foto subida correctamente.");
        setFile(null);
        setProgress(0);
        setUploading(false);
      }
    );
  };

  if (!user) {
    return <p className="text-sm text-gray-500">Inicia sesión para subir fotos.</p>;
  }

  return (
    <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold text-secondary">📤 Subir foto</h2>

      {/* Selector de archivo */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full text-sm text-gray-700 dark:text-gray-200"
      />

      {/* Select de visibilidad */}
      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="private">🔒 Solo yo</option>
        <option value="friends">👥 Amigos</option>
        <option value="public">🌍 Público</option>
      </select>

      {/* Botón subir */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-semibold shadow transition active:scale-95 disabled:opacity-50"
      >
        {uploading ? "Subiendo..." : "Subir foto"}
      </button>

      {/* Barra de progreso */}
      {uploading && (
        <div>
          <Loader text={`Subiendo foto... ${progress}%`} />
          <div className="w-full bg-gray-200 rounded h-2 mt-2 dark:bg-gray-700">
            <div
              className="bg-brand h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Mensaje final */}
      {message && <p className="text-sm text-center">{message}</p>}
    </div>
  );
}


