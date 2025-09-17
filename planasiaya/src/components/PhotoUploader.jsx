// src/components/PhotoUploader.jsx
import { useState } from "react";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext";

export default function PhotoUploader() {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if (!file || !user) {
      setMessage("⚠️ Debes seleccionar una foto e iniciar sesión.");
      return;
    }

    const storageRef = ref(storage, `photos/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progreso en %
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(prog));
      },
      (error) => {
        setMessage("❌ Error al subir la foto: " + error.message);
      },
      async () => {
        // Subida completa
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "photos"), {
          url,
          userId: user.uid,
          createdAt: new Date(),
          visibility: "private", // default
        });
        setMessage("✅ Foto subida con éxito!");
        setFile(null);
        setProgress(0);
      }
    );
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold mb-2">📤 Subir foto</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-brand h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-brand text-white rounded hover:bg-brand-dark transition"
      >
        Subir
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}


