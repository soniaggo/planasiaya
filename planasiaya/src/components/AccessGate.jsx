import { useState } from "react";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_CODE;

export default function AccessGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ACCESS_KEY) {
      console.warn("No se ha definido VITE_APP_ACCESS_CODE en .env.local");
    }

    if (code === ACCESS_KEY) {
      localStorage.setItem("planasiaya-access", "ok");
      onUnlock();
    } else {
      setError("Código incorrecto");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-slate-50 px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">PlanAsiaYa</h1>
          <p className="text-sm text-slate-300">
            Acceso privado · Versión en desarrollo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            className="w-full rounded-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Introduce el código de acceso"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
          />
          {error && (
            <p className="text-xs text-red-400 mt-1 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-full py-2.5 text-sm font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors"
          >
            Entrar
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center">
          Solo las personas con el código pueden acceder a esta beta.
        </p>
      </div>
    </div>
  );
}
