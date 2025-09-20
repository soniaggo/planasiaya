

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function ChiangMai() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Guía de Chiang Mai</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌄 Introducción</h2>
        <p>
          Chiang Mai es el corazón cultural del norte de Tailandia, famosa por
          sus templos, su casco antiguo amurallado y la cercanía a la naturaleza.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏯 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Templo Doi Suthep en la montaña.</li>
          <li>Casco antiguo y sus templos.</li>
          <li>Mercado nocturno de Chiang Mai.</li>
          <li>Santuarios de elefantes responsables.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍜 Dónde comer</h2>
        <p>
          Prueba el famoso Khao Soi, la sopa de curry del norte. También
          encontrarás muchos mercados callejeros con comida deliciosa y barata.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🚗 Transporte</h2>
        <p>
          Puedes moverte en songthaew (pick-ups rojas), alquilar moto o incluso
          bicicleta para recorrer la ciudad.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Visita durante el festival de linternas Yi Peng.</li>
          <li>Reserva tours de elefantes solo en santuarios éticos.</li>
          <li>Explora los cafés locales, Chiang Mai es un paraíso cafetero.</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/chiang-mai"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Chiang Mai
        </Link>

        <Link
          to="/citymeetups/chiang-mai"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Chiang Mai
        </Link>
      </div>

      <BackButton />
    </div>
  );
}
