

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function KohSamui() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-emerald-700">Guía de Koh Samui</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Koh Samui es una de las islas más grandes y turísticas de Tailandia,
          famosa por sus playas, templos, resorts de lujo y vida nocturna.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌴 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Big Buddha, el icónico templo con la estatua dorada.</li>
          <li>Playa de Chaweng para vida nocturna.</li>
          <li>Playa de Lamai para ambiente más relajado.</li>
          <li>Parque Nacional Marino Ang Thong (excursión en barco).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍹 Dónde comer</h2>
        <p>
          Desde restaurantes locales con curry tailandés hasta beach clubs de lujo
          con cócteles frente al mar. Fisherman’s Village es ideal para cenar y pasear.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🚙 Transporte</h2>
        <p>
          Puedes alquilar moto o coche. También hay taxis, aunque suelen ser más caros
          que en otras islas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Visita los templos con vestimenta adecuada.</li>
          <li>Reserva excursiones al Parque Marino con antelación.</li>
          <li>La temporada seca es de diciembre a abril.</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/koh-samui"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Koh Samui
        </Link>

        <Link
          to="/citymeetups/koh-samui"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Koh Samui
        </Link>
      </div>

      <BackButton />
    </div>
  );
}

