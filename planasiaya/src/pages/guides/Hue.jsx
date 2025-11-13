import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Hue() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-red-700">Guía de Hue (Huế)</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">👑 Introducción</h2>
        <p>
          Hue fue la capital imperial de Vietnam durante la dinastía Nguyen (1802-1945). 
          Situada a orillas del río Perfume, esta ciudad es famosa por su impresionante 
          Ciudadela Imperial (Patrimonio de la Humanidad por la UNESCO), sus tumbas 
          imperiales y su atmósfera tranquila, rica en historia y cultura.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏯 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>La Ciudadela Imperial (Kinh thành Huế) y la Ciudad Púrpura Prohibida.</li>
          <li>Las Tumbas Imperiales (especialmente las de Khai Dinh y Minh Mang).</li>
          <li>La Pagoda Thien Mu (Pagoda de la Dama Celestial).</li>
          <li>Un paseo en barco por el Río Perfume (Sông Hương).</li>
          <li>El Puente de Thanh Toan, un hermoso puente cubierto rural.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍲 Dónde comer</h2>
        <p>
          Hue es considerada la cuna de la cocina imperial vietnamita. 
          Prueba el **Bún Bò Huế** (una sopa de fideos picante de ternera), 
          el **Bánh Khoái** (crepe vietnamita frito) y los variados 'pequeños 
          pasteles' como el **Bánh Bèo** o **Bánh Nậm**. La comida aquí tiende a ser más especiada.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏍️ Transporte</h2>
        <p>
          La mejor forma de visitar la Ciudadela y las tumbas es contratando un 
          taxi para el día o alquilando una moto. Los 'mototaxis' (xe ôm) son muy 
          comunes para moverse dentro de la ciudad. Considera un tour guiado 
          por las tumbas para entender mejor la historia.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Reserva un día completo para explorar la Ciudadela y el recinto.</li>
          <li>Contrata un coche o moto con conductor para visitar las tumbas que están dispersas.</li>
          <li>Si viajas entre Hue y Hoi An, el paso de Hai Van es una ruta escénica espectacular.</li>
        </ul>
      </section>

      {/* Botones en lugar de CityChat y CityMeetups */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/hue"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Hue
        </Link>

        <Link
          to="/citymeetups/hue"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Hue
        </Link>
      </div>

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}