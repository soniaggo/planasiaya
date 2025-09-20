

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Siargao() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Guía de Siargao</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Siargao, conocida como la capital del surf en Filipinas, es una isla
          paradisíaca con lagunas, cuevas y playas vírgenes. Aunque es famosa por
          Cloud 9, también es ideal para quienes buscan naturaleza y aventura.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌊 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Cloud 9, uno de los mejores spots de surf del mundo.</li>
          <li>Isla Naked, Isla Daku e Isla Guyam (island hopping).</li>
          <li>Sugba Lagoon y sus aguas cristalinas.</li>
          <li>Magpupungko Rock Pools en marea baja.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍴 Dónde comer</h2>
        <p>
          General Luna es el centro gastronómico, con restaurantes de comida
          internacional, opciones veganas y mariscos frescos. No te pierdas el
          Kinilaw, un ceviche filipino.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          La mejor forma de recorrer Siargao es alquilar una moto. También puedes
          contratar triciclos para trayectos cortos. Ten en cuenta que las
          distancias entre atracciones pueden ser largas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>El mejor momento para surfear es de septiembre a noviembre.</li>
          <li>Lleva efectivo, no hay muchos cajeros automáticos.</li>
          <li>Protégete del sol, el calor puede ser intenso.</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/siargao"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Siargao
        </Link>

        <Link
          to="/citymeetups/siargao"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Siargao
        </Link>
      </div>

      <BackButton />
    </div>
  );
}
