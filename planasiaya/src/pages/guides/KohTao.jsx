

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function KohTao() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-teal-700">Guía de Koh Tao</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Koh Tao es una pequeña isla en el Golfo de Tailandia, conocida como el
          paraíso del buceo gracias a sus aguas cristalinas y arrecifes de coral.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🤿 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Sairee Beach, la playa más popular.</li>
          <li>Shark Bay, para hacer snorkel con tiburones inofensivos.</li>
          <li>Excursión en barco alrededor de la isla.</li>
          <li>Miradores como John-Suwan Viewpoint.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍲 Dónde comer</h2>
        <p>
          En Sairee encontrarás una gran variedad de restaurantes internacionales,
          bares frente al mar y puestos locales con comida tailandesa auténtica.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          Lo mejor es alquilar una moto para moverte por la isla. También hay taxis
          en barca para ir a playas más escondidas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Aprovecha para sacarte el curso de buceo, es uno de los más baratos del mundo.</li>
          <li>Usa calzado adecuado, algunas carreteras son empinadas.</li>
          <li>Evita viajar en temporada de monzones (noviembre-diciembre).</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/koh-tao"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Koh Tao
        </Link>

        <Link
          to="/citymeetups/koh-tao"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Koh Tao
        </Link>
      </div>

      <BackButton />
    </div>
  );
}
