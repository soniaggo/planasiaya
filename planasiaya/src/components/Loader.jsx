// src/components/Loader.jsx
import { Loader2 } from "lucide-react";

export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-gray-600 dark:text-gray-300">
      <Loader2 className="w-8 h-8 animate-spin mb-2 text-brand" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
