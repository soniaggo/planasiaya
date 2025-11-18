
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
// import { HelmetProvider } from "react-helmet-async";
// import ForgotPassword from "./pages/ForgotPassword";

// // Contextos
// import { UserProvider } from "./context/UserContext";
// import { ThemeProvider } from "./context/ThemeContext";

// // Páginas y rutas
// import App from "./App";
// import Home from "./pages/Home";
// import Guides from "./pages/Guides";
// import Community from "./pages/Community";
// import AllMeetups from "./pages/AllMeetups";
// import Profile from "./pages/Profile";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import CityChatList from "./pages/CityChatList";
// import CityChat from "./pages/CityChat";
// import CityMeetups from "./pages/CityMeetups";

// // Guías
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
// import { useParams } from "react-router-dom";

// function CityMeetupsWrapper() {
//   const { city } = useParams();
//   return <CityMeetups city={city} />;
// }

// function CityChatWrapper() {
//   const { chatId } = useParams();
//   return <CityChat chatId={chatId} />;
// }

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/guides", element: <Guides /> },
//       { path: "/community", element: <Community /> },
//       { path: "/allmeetups", element: <AllMeetups /> },
//       { path: "/profile", element: <Profile /> },
//       { path: "/register", element: <Register /> },
//       { path: "/forgot-password", element: <ForgotPassword /> },
//       { path: "/login", element: <Login /> },
//       { path: "/citychat", element: <CityChatList /> },
//       { path: "/citychat/:chatId", element: <CityChatWrapper /> },
//       { path: "/citymeetups/:city", element: <CityMeetupsWrapper /> },
//       { path: "/guides/bangkok", element: <Bangkok /> },
//       { path: "/guides/chiang-mai", element: <ChiangMai /> },
//       { path: "/guides/krabi", element: <Krabi /> },
//       { path: "/guides/koh-tao", element: <KohTao /> },
//       { path: "/guides/koh-samui", element: <KohSamui /> },
//       { path: "/guides/koh-phangan", element: <KohPhangan /> },
//       { path: "/guides/bali", element: <Bali /> },
//       { path: "/guides/gili", element: <Gili /> },
//       { path: "/guides/siargao", element: <Siargao /> },
//       { path: "/guides/bohol", element: <Bohol /> },
//       { path: "/guides/camiguin", element: <Camiguin /> },
//       { path: "/guides/hanoi", element: <Hanoi /> },
//       { path: "/guides/hue", element: <Hue /> },
//       { path: "/guides/hoi-an", element: <Hoian /> },
//       { path: "/guides/halong-bay", element: <HalongBay /> },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <HelmetProvider>
//       <ThemeProvider>
//         <UserProvider>
//           <RouterProvider router={router} />
//         </UserProvider>
//       </ThemeProvider>
//     </HelmetProvider>
//   </React.StrictMode>
// );


// src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { HelmetProvider } from "react-helmet-async";
// import { RouterProvider } from "react-router-dom";

// import { UserProvider } from "./context/UserContext";
// import { ThemeProvider } from "./context/ThemeContext";
// import { router } from "./router";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <HelmetProvider>
//       <ThemeProvider>
//         <UserProvider>
//           <RouterProvider router={router} />
//         </UserProvider>
//       </ThemeProvider>
//     </HelmetProvider>
//   </React.StrictMode>
// );


// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

// Contextos
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

// Router centralizado
import { router } from "./router";

// Loader para Suspense
import Loader from "./components/Loader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <UserProvider>
          <React.Suspense fallback={<Loader text="Cargando pantalla..." />}>
            <RouterProvider router={router} />
          </React.Suspense>
        </UserProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
