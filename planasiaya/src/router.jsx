// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";

// Layout principal
import App from "./App";

// Páginas principales
import Home from "./pages/Home";
import Guides from "./pages/Guides";
import Community from "./pages/Community";
import AllMeetups from "./pages/AllMeetups";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

// City / chats / meetups
import CityChatList from "./pages/CityChatList";
import CityChat from "./pages/CityChat";
import CityMeetups from "./pages/CityMeetups";

// Guías por ciudad
import Bangkok from "./pages/guides/Bangkok";
import Hanoi from "./pages/guides/Hanoi";
import Hue from "./pages/guides/Hue";
import Hoian from "./pages/guides/Hoi-an";
import HalongBay from "./pages/guides/HalongBay";
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

// Wrappers dinámicos
function CityMeetupsWrapper() {
  const { city } = useParams();
  return <CityMeetups city={city} />;
}

function CityChatWrapper() {
  const { chatId } = useParams();
  return <CityChat chatId={chatId} />;
}

// Definición del router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Home
      { index: true, element: <Home /> },

      // Rutas principales
      { path: "guides", element: <Guides /> },
      { path: "community", element: <Community /> },
      { path: "allmeetups", element: <AllMeetups /> },
      { path: "profile", element: <Profile /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "login", element: <Login /> },

      // Chats por ciudad
      { path: "citychat", element: <CityChatList /> },
      { path: "citychat/:chatId", element: <CityChatWrapper /> },

      // Quedadas por ciudad
      { path: "citymeetups/:city", element: <CityMeetupsWrapper /> },

      // Guías
      { path: "guides/bangkok", element: <Bangkok /> },
      { path: "guides/chiang-mai", element: <ChiangMai /> },
      { path: "guides/krabi", element: <Krabi /> },
      { path: "guides/koh-tao", element: <KohTao /> },
      { path: "guides/koh-samui", element: <KohSamui /> },
      { path: "guides/koh-phangan", element: <KohPhangan /> },
      { path: "guides/bali", element: <Bali /> },
      { path: "guides/gili", element: <Gili /> },
      { path: "guides/siargao", element: <Siargao /> },
      { path: "guides/bohol", element: <Bohol /> },
      { path: "guides/camiguin", element: <Camiguin /> },
      { path: "guides/hanoi", element: <Hanoi /> },
      { path: "guides/hue", element: <Hue /> },
      { path: "guides/hoi-an", element: <Hoian /> },
      { path: "guides/halong-bay", element: <HalongBay /> },
    ],
  },
]);
