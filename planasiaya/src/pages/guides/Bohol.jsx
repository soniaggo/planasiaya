

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Bohol() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-yellow-700">Guía de Bohol</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Bohol es una de las joyas de Filipinas, famosa por sus Chocolate Hills,
          playas paradisíacas y los tarsiers, pequeños primates únicos en el
          mundo. Es un destino ideal para combinar naturaleza, cultura e historia.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏞️ Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Chocolate Hills, un paisaje único con más de 1.200 colinas.</li>
          <li>Santuario de los Tarsiers en Corella.</li>
          <li>Río Loboc y sus cruceros flotantes.</li>
          <li>Playas de Panglao, como Alona Beach.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍴 Dónde comer</h2>
        <p>
          En Panglao encontrarás gran variedad de restaurantes, desde mariscos
          frescos hasta cocina internacional. Prueba el lechón (cerdo asado) y
          los mangos secos locales.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🚗 Transporte</h2>
        <p>
          Puedes moverte en moto o triciclo. Para distancias más largas hay vans
          compartidas o taxis privados. Bohol también cuenta con ferry hacia
          Cebú y otras islas cercanas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Visita las Chocolate Hills al amanecer o atardecer para mejores vistas.</li>
          <li>Respeta a los tarsiers, son animales muy sensibles al estrés.</li>
          <li>Evita tours masificados, busca experiencias más sostenibles.</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/bohol"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Bohol
        </Link>

        <Link
          to="/citymeetups/bohol"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Bohol
        </Link>
      </div>

      <BackButton />
    </div>
  );
}
