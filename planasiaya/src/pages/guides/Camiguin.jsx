

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Camiguin() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Guía de Camiguin</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌋 Introducción</h2>
        <p>
          Camiguin, conocida como la "Isla de Fuego", es una pequeña isla en
          Filipinas con volcanes, aguas termales, cascadas y playas tranquilas.
          Es un destino menos turístico, ideal para viajeros que buscan
          autenticidad y naturaleza.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏞️ Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Volcán Hibok-Hibok.</li>
          <li>White Island, un banco de arena con vistas al volcán.</li>
          <li>Manantiales Ardent Hot Springs.</li>
          <li>Cascadas Katibawasan.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍴 Dónde comer</h2>
        <p>
          Aunque pequeña, Camiguin tiene buenos restaurantes locales. Prueba el
          pastel de lanzones, hecho con la fruta típica de la isla, y disfruta
          de mariscos frescos en pequeños comedores familiares.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🚗 Transporte</h2>
        <p>
          La mejor forma de recorrer Camiguin es alquilar una moto. También hay
          multicabs y mototaxis para trayectos cortos. Es una isla compacta, por
          lo que todo queda cerca.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Visita durante el festival de lanzones en octubre.</li>
          <li>Lleva calzado cómodo para las caminatas en los volcanes.</li>
          <li>White Island no tiene sombra, lleva protector solar y agua.</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/camiguin"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Camiguin
        </Link>

        <Link
          to="/citymeetups/camiguin"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Camiguin
        </Link>
      </div>

      <BackButton />
    </div>
  );
}

