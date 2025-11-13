import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Hanoi() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-red-700">Guía de Hanói</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🇻🇳 Introducción</h2>
        <p>
          Hanói, la capital de Vietnam, es una ciudad fascinante que fusiona la
          antigua cultura asiática con la modernidad. Es famosa por su vibrante
          Barrio Antiguo (Old Quarter), sus lagos, templos centenarios y su
          rica historia. El tráfico de motos es una experiencia en sí misma.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏯 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>El vibrante y caótico Barrio Antiguo y el Lago Hoan Kiem.</li>
          <li>El Mausoleo de Ho Chi Minh y el Museo de Ho Chi Minh.</li>
          <li>La Pagoda del Pilar Único (One Pillar Pagoda).</li>
          <li>El Templo de la Literatura (Van Mieu), la primera universidad de Vietnam.</li>
          <li>El famoso 'Train Street' (Calle del Tren).</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍜 Dónde comer</h2>
        <p>
          La comida callejera de Hanói es de las mejores del mundo.
          No puedes irte sin probar el **Pho** (sopa de fideos), el
          **Bun Cha** (fideos con cerdo a la parrilla) y el **Banh Mi**
          (bocadillo vietnamita). Busca los pequeños puestos en el Barrio
          Antiguo para una experiencia auténtica.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          Moverse por Hanói es fácil usando apps como **Grab** para motos (la
          opción más rápida y económica) o coches. En el Barrio Antiguo, es
          mejor caminar. Para distancias cortas, los taxis o 'mototaxis'
          (xe ôm) también son una opción, pero acuerda el precio de antemano.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Cruzar la calle: camina lentamente y sin dudar; las motos te esquivarán.</li>
          <li>Visita un espectáculo de marionetas de agua tradicional.</li>
          <li>Practica el regateo en los mercados (con respeto).</li>
          <li>Prueba el famoso "Egg Coffee" (café con huevo).</li>
        </ul>
      </section>

      {/* Botones en lugar de CityChat y CityMeetups */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/hanoi"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Hanói
        </Link>

        <Link
          to="/citymeetups/hanoi"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Hanói
        </Link>
      </div>

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}