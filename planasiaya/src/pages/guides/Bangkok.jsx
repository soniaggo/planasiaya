

// src/pages/guides/Bangkok.jsx
import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Bangkok() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-blue-700">Guía de Bangkok</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">✈️ Introducción</h2>
        <p>
          Bangkok es la vibrante capital de Tailandia, famosa por sus templos,
          mercados callejeros, comida deliciosa y su animada vida nocturna.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏞️ Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Gran Palacio y Templo del Buda Esmeralda</li>
          <li>Wat Pho (Templo del Buda Reclinado)</li>
          <li>Mercado flotante de Damnoen Saduak</li>
          <li>Khao San Road</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍜 Dónde comer</h2>
        <p>
          Bangkok es un paraíso para foodies: desde puestos callejeros hasta
          restaurantes de alta cocina. Prueba el Pad Thai en la calle y visita
          Chinatown para comida auténtica.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚌 Transporte</h2>
        <p>
          Puedes moverte en BTS Skytrain, tuk-tuk, taxi o Grab (app tipo Uber).
          Para distancias largas, el tren y autobuses conectan con otras
          provincias.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Viste ropa adecuada para entrar a los templos.</li>
          <li>Evita taxis sin taxímetro.</li>
          <li>Regatea en los mercados, es parte de la cultura.</li>
        </ul>
      </section>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link
          to="/citychat/bangkok"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center"
        >
          Ir al Chat de Bangkok 💬
        </Link>

        <Link
          to="/citymeetups/bangkok"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-center"
        >
          Ver Quedadas en Bangkok 📅
        </Link>
      </div>

      {/* Botón flotante para volver */}
      <BackButton />
    </div>
  );
}
