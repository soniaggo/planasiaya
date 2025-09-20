

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function KohPhangan() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">Guía de Koh Phangan</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌴 Introducción</h2>
        <p>
          Koh Phangan es mundialmente famosa por su Full Moon Party, pero también
          ofrece playas tranquilas, templos y retiros de yoga. Es un destino con
          un equilibrio perfecto entre fiesta y relax.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌅 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Haad Rin Beach, sede de la Full Moon Party.</li>
          <li>Templo de Wat Phu Khao Noi.</li>
          <li>Playas tranquilas como Bottle Beach.</li>
          <li>Senderismo hasta Phaeng Waterfall.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍉 Dónde comer</h2>
        <p>
          Koh Phangan tiene una gran oferta de comida tailandesa y vegana, además
          de cafés junto al mar. Thong Sala es ideal para mercados nocturnos.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          Alquila una moto para explorar la isla. Ten cuidado con las carreteras,
          ya que algunas son empinadas y con curvas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Reserva alojamiento con antelación en época de luna llena.</li>
          <li>Disfruta de los retiros de yoga y meditación.</li>
          <li>No te limites solo a la fiesta, explora las playas escondidas.</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/koh-phangan"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Koh Phangan
        </Link>

        <Link
          to="/citymeetups/koh-phangan"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Koh Phangan
        </Link>
      </div>

      <BackButton />
    </div>
  );
}

