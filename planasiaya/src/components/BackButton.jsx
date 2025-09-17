// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 
                 bg-brand text-white p-3 rounded-full shadow-lg 
                 hover:bg-brand-dark transition-all duration-300 z-50"
      aria-label="Volver"
    >
      <ArrowLeft size={22} />
    </button>
  );
}
