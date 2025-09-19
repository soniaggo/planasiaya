

// src/App.jsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Map, Users, CalendarDays, User, Moon, Sun } from "lucide-react";
import { useUser } from "./context/UserContext";
import { useTheme } from "./context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const location = useLocation();
  const { profile } = useUser();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    {
      path: "/",
      icon: <Home className="w-6 h-6 lg:w-7 lg:h-7" />,
      label: "Inicio",
    },
    {
      path: "/guides",
      icon: <Map className="w-6 h-6 lg:w-7 lg:h-7" />,
      label: "Guías",
    },
    {
      path: "/community",
      icon: <Users className="w-6 h-6 lg:w-7 lg:h-7" />,
      label: "Comunidad",
    },
    {
      path: "/allmeetups",
      icon: <CalendarDays className="w-6 h-6 lg:w-7 lg:h-7" />,
      label: "Quedadas",
    },
    {
      path: profile ? "/profile" : "/login",
      icon: <User className="w-6 h-6 lg:w-7 lg:h-7" />,
      label: profile?.displayName || "Perfil",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-poppins">
      {/* Contenido principal con animación */}
      <main className="flex-1 pb-16 lg:pb-0 order-first lg:order-last">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname} // importante para detectar cambios de ruta
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Menú de navegación inferior */}
      <nav
        className="
          order-last lg:order-first
          fixed bottom-0 left-0 right-0 lg:static
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
          border-t border-gray-200 dark:border-gray-700
          lg:border-t-0 lg:border-b
          flex justify-around lg:justify-center
          gap-6 px-4 py-2
          shadow-lg lg:shadow-none
        "
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center transition-transform duration-300 ${
                isActive
                  ? "text-brand scale-110"
                  : "text-gray-500 hover:text-brand hover:scale-105"
              }`}
            >
              {item.icon}
              {isActive && (
                <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-gradient-to-r from-brand-light to-brand"></span>
              )}
            </Link>
          );
        })}

        {/* Botón modo oscuro/claro */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center transition-transform duration-300 text-gray-500 hover:text-brand hover:scale-105"
        >
          {theme === "light" ? (
            <Moon className="w-6 h-6 lg:w-7 lg:h-7" />
          ) : (
            <Sun className="w-6 h-6 lg:w-7 lg:h-7" />
          )}
        </button>
      </nav>
    </div>
  );
}













