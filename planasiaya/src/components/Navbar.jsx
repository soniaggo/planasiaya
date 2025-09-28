import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Íconos
import { Home, BookOpen, Users, Calendar, User } from "lucide-react";

export default function Navbar() {
  const { user } = useUser();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login"; // 🔥 reset y redirige
    } catch (err) {
      console.error("❌ Error al cerrar sesión:", err);
    }
  };

  const links = [
    { to: "/", icon: <Home size={22} />, label: "Inicio" },
    { to: "/guides", icon: <BookOpen size={22} />, label: "Guías" },
    { to: "/community", icon: <Users size={22} />, label: "Comunidad" },
    { to: "/allmeetups", icon: <Calendar size={22} />, label: "Quedadas" },
    { to: "/profile", icon: <User size={22} />, label: "Perfil" },
  ];

  return (
    <>
      {/* 💻 Navbar superior (desktop) */}
      <nav className="hidden md:flex justify-between items-center bg-white dark:bg-gray-900 px-6 py-3 shadow-md sticky top-0 z-50">
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 font-semibold ${
                location.pathname === link.to
                  ? "text-brand"
                  : "text-gray-600 dark:text-gray-300"
              } hover:text-brand`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        )}
      </nav>

      {/* 📱 Navbar inferior (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 flex justify-around items-center py-2 shadow-inner md:hidden z-50">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center text-xs ${
              location.pathname === link.to
                ? "text-brand"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}