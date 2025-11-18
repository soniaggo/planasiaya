// // src/router.jsx
// import { createBrowserRouter } from "react-router-dom";
// import { useParams } from "react-router-dom";

// // Layout principal
// import App from "./App";

// // Páginas principales
// import Home from "./pages/Home";
// import Guides from "./pages/Guides";
// import Community from "./pages/Community";
// import AllMeetups from "./pages/AllMeetups";
// import Profile from "./pages/Profile";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";

// // City / chats / meetups
// import CityChatList from "./pages/CityChatList";
// import CityChat from "./pages/CityChat";
// import CityMeetups from "./pages/CityMeetups";

// // Guías por ciudad
// import Bangkok from "./pages/guides/Bangkok";
// import Hanoi from "./pages/guides/Hanoi";
// import Hue from "./pages/guides/Hue";
// import Hoian from "./pages/guides/Hoi-an";
// import HalongBay from "./pages/guides/HalongBay";
// import ChiangMai from "./pages/guides/ChiangMai";
// import Krabi from "./pages/guides/Krabi";
// import KohTao from "./pages/guides/KohTao";
// import KohSamui from "./pages/guides/KohSamui";
// import KohPhangan from "./pages/guides/KohPhangan";
// import Bali from "./pages/guides/Bali";
// import Gili from "./pages/guides/Gili";
// import Siargao from "./pages/guides/Siargao";
// import Bohol from "./pages/guides/Bohol";
// import Camiguin from "./pages/guides/Camiguin";

// // Wrappers dinámicos
// function CityMeetupsWrapper() {
//   const { city } = useParams();
//   return <CityMeetups city={city} />;
// }

// function CityChatWrapper() {
//   const { chatId } = useParams();
//   return <CityChat chatId={chatId} />;
// }

// // Definición del router
// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       // Home
//       { index: true, element: <Home /> },

//       // Rutas principales
//       { path: "guides", element: <Guides /> },
//       { path: "community", element: <Community /> },
//       { path: "allmeetups", element: <AllMeetups /> },
//       { path: "profile", element: <Profile /> },
//       { path: "register", element: <Register /> },
//       { path: "forgot-password", element: <ForgotPassword /> },
//       { path: "login", element: <Login /> },

//       // Chats por ciudad
//       { path: "citychat", element: <CityChatList /> },
//       { path: "citychat/:chatId", element: <CityChatWrapper /> },

//       // Quedadas por ciudad
//       { path: "citymeetups/:city", element: <CityMeetupsWrapper /> },

//       // Guías
//       { path: "guides/bangkok", element: <Bangkok /> },
//       { path: "guides/chiang-mai", element: <ChiangMai /> },
//       { path: "guides/krabi", element: <Krabi /> },
//       { path: "guides/koh-tao", element: <KohTao /> },
//       { path: "guides/koh-samui", element: <KohSamui /> },
//       { path: "guides/koh-phangan", element: <KohPhangan /> },
//       { path: "guides/bali", element: <Bali /> },
//       { path: "guides/gili", element: <Gili /> },
//       { path: "guides/siargao", element: <Siargao /> },
//       { path: "guides/bohol", element: <Bohol /> },
//       { path: "guides/camiguin", element: <Camiguin /> },
//       { path: "guides/hanoi", element: <Hanoi /> },
//       { path: "guides/hue", element: <Hue /> },
//       { path: "guides/hoi-an", element: <Hoian /> },
//       { path: "guides/halong-bay", element: <HalongBay /> },
//     ],
//   },
// ]);


// src/router.jsx
import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Layout principal
import App from "./App";

// Páginas lazy (code splitting)
const Home = lazy(() => import("./pages/Home"));
const Guides = lazy(() => import("./pages/Guides"));
const Community = lazy(() => import("./pages/Community"));
const AllMeetups = lazy(() => import("./pages/AllMeetups"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const CityChatList = lazy(() => import("./pages/CityChatList"));
const CityChat = lazy(() => import("./pages/CityChat"));
const CityMeetups = lazy(() => import("./pages/CityMeetups"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

// Guías
const Bangkok = lazy(() => import("./pages/guides/Bangkok"));
const Hanoi = lazy(() => import("./pages/guides/Hanoi"));
const Hue = lazy(() => import("./pages/guides/Hue"));
const Hoian = lazy(() => import("./pages/guides/Hoi-an"));
const HalongBay = lazy(() => import("./pages/guides/HalongBay"));
const ChiangMai = lazy(() => import("./pages/guides/ChiangMai"));
const Krabi = lazy(() => import("./pages/guides/Krabi"));
const KohTao = lazy(() => import("./pages/guides/KohTao"));
const KohSamui = lazy(() => import("./pages/guides/KohSamui"));
const KohPhangan = lazy(() => import("./pages/guides/KohPhangan"));
const Bali = lazy(() => import("./pages/guides/Bali"));
const Gili = lazy(() => import("./pages/guides/Gili"));
const Siargao = lazy(() => import("./pages/guides/Siargao"));
const Bohol = lazy(() => import("./pages/guides/Bohol"));
const Camiguin = lazy(() => import("./pages/guides/Camiguin"));

// Wrappers para params
import { useParams } from "react-router-dom";

function CityMeetupsWrapper() {
  const { city } = useParams();
  return <CityMeetups city={city} />;
}

function CityChatWrapper() {
  const { chatId } = useParams();
  return <CityChat chatId={chatId} />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/guides", element: <Guides /> },
      { path: "/community", element: <Community /> },
      { path: "/allmeetups", element: <AllMeetups /> },
      { path: "/profile", element: <Profile /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/login", element: <Login /> },
      { path: "/citychat", element: <CityChatList /> },
      { path: "/citychat/:chatId", element: <CityChatWrapper /> },
      { path: "/citymeetups/:city", element: <CityMeetupsWrapper /> },

      // Guías
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
      { path: "/guides/camiguin", element: <Camiguin /> },
      { path: "/guides/hanoi", element: <Hanoi /> },
      { path: "/guides/hue", element: <Hue /> },
      { path: "/guides/hoi-an", element: <Hoian /> },
      { path: "/guides/halong-bay", element: <HalongBay /> },
    ],
  },
]);
