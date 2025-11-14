// // src/components/CityChatList.jsx
// import { Link } from "react-router-dom";
// import { MapPin } from "lucide-react";


// const cities = [
//   { id: "bangkok", name: "Bangkok" },
//   { id: "chiangmai", name: "Chiang Mai" },
//   { id: "krabi", name: "Krabi" },
//   { id: "kohtao", name: "Koh Tao" },
//   { id: "kohphangan", name: "Koh Phangan" },
//   { id: "bali", name: "Bali" },
//   { id: "siargao", name: "Siargao" },
// ];

// export default function CityChatList() {
//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-center">Chats por ciudad 🌏</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {cities.map((city) => (
//           <Link
//             key={city.id}
//             to={`/citychat/${city.id}`}
//             className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
//           >
//             <MapPin className="text-brand" />
//             <span className="font-medium">{city.name}</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// src/pages/CityChatList.jsx
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { CITIES } from "../data/cities";

export default function CityChatList() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Chats por ciudad 🌏
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CITIES.map((city) => (
          <Link
            key={city.id}
            to={`/citychat/${city.chatId}`} // 👈 usamos chatId del data central
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
          >
            <MapPin className="text-brand" />
            <div className="flex flex-col">
              <span className="font-medium">{city.name}</span>
              <span className="text-xs text-gray-500">{city.country}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
