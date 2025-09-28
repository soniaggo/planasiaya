

import { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setMessage(
          "⚠️ Tu email no está verificado. Te hemos enviado un enlace de verificación."
        );
        setLoading(false);
        return;
      }

      setMessage("✅ Sesión iniciada correctamente");
      navigate("/profile");
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      return setMessage("Introduce tu email para recuperar la contraseña.");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📩 Te hemos enviado un enlace para restablecer tu contraseña.");
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-center mb-4">🔑 Iniciar sesión</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>

      <button
        onClick={handleResetPassword}
        className="mt-3 text-sm text-blue-600 hover:underline"
      >
        ¿Olvidaste tu contraseña?
      </button>

      <p className="mt-4 text-center text-sm">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}


