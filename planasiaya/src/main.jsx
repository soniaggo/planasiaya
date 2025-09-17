import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

// Contexto de usuario
import { UserProvider } from "./context/UserContext";

// Páginas
import App from "./App";
import Home from "./pages/Home";
import Guides from "./pages/Guides";
import Community from "./pages/Community";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Guías individuales
import Bangkok from "./pages/guides/Bangkok";
import ChiangMai from "./pages/guides/ChiangMai";
import Krabi from "./pages/guides/Krabi";
import KohTao from "./pages/guides/KohTao";
import KohSamui from "./pages/guides/KohSamui";
import KohPhangan from "./pages/guides/KohPhangan";
import Bali from "./pages/guides/Bali";
import Gili from "./pages/guides/Gili";
import Siargao from "./pages/guides/Siargao";
import Bohol from "./pages/guides/Bohol";
import Camiguin from "./pages/guides/Camiguin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/guides", element: <Guides /> },
      { path: "/community", element: <Community /> },
      { path: "/chat", element: <Chat /> },
      { path: "/profile", element: <Profile /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },

      // Rutas de guías
      { path: "/guides/bangkok", element: <Bangkok /> },
      { path: "/guides/chiang-mai", element: <ChiangMai /> },
      { path: "/guides/krabi", element: <Krabi /> },
      { path: "/guides/koh-tao", element: <KohTao /> },
      { path: "/guides/koh-samui", element: <KohSamui /> },
      { path: "/guides/koh-phangan", element: <KohPhangan /> },
      { path: "/guides/bali", element: <Bali /> },
      { path: "/guides/gili", element: <Gili /> },
      { path: "/guides/siargao", element: <Siargao /> },
      { path: "/guides/bohol", element: <Bohol /> },
      { path: "/guides/camiguin", element: <Camiguin /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>
);
