



import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ Importamos el Navbar
import { useUser } from "./context/UserContext";

export default function App() {
  const { profile } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Contenido principal */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Navbar siempre visible */}
      <Navbar profile={profile} />
    </div>
  );
}






