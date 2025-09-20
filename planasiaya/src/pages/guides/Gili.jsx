


import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Gili() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-teal-700">Guía de Islas Gili</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Las Islas Gili (Trawangan, Air y Meno) son un paraíso tropical en
          Indonesia. Famosas por sus aguas cristalinas, arrecifes de coral y
          ambiente relajado, son el destino perfecto para buceo, snorkel y
          descanso en la playa.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌊 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Snorkel con tortugas marinas en Gili Trawangan.</li>
          <li>Atardeceres en los famosos columpios frente al mar.</li>
          <li>Buceo en arrecifes de coral.</li>
          <li>Ambiente relajado en Gili Meno y Gili Air.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍹 Dónde comer</h2>
        <p>
          Los night markets de Gili Trawangan son ideales para probar mariscos
          frescos. También hay cafés frente al mar con opciones veganas y
          occidentales.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🚤 Transporte</h2>
        <p>
          No hay coches ni motos en las Gili. Solo puedes moverte a pie, en bici
          o en carro tirado por caballos (cidomo). Los barcos conectan con Bali y
          Lombok.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Evita usar plástico, las islas tienen iniciativas ecológicas.</li>
          <li>Reserva tu transporte en barco con antelación.</li>
          <li>Elige Gili Meno si buscas más tranquilidad.</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/gili"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Gili
        </Link>

        <Link
          to="/citymeetups/gili"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Gili
        </Link>
      </div>

      <BackButton />
    </div>
  );
}
