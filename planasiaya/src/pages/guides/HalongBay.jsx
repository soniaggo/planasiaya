import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function HalongBay() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-red-700">Guía de Halong Bay</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💎 Introducción</h2>
        <p>
          La Bahía de Halong es un Patrimonio Mundial de la UNESCO, famosa por sus
          miles de karts de piedra caliza e islotes cubiertos de vegetación que
          emergen espectacularmente del mar esmeralda del Golfo de Tonkín. Es
          considerada una de las Siete Maravillas Naturales del Mundo y la
          experiencia principal es navegar en crucero.
        </p>
      </section>

      {/* Qué ver y hacer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🛶 Qué ver y hacer</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>**Crucero:** Pasar 1 o 2 noches a bordo para disfrutar del paisaje, el amanecer y el atardecer.</li>
          <li>**Kayak:** Explorar cuevas y lagunas ocultas (como Luon Cave).</li>
          <li>**Cuevas:** Visitar grandes grutas como la Cueva Sung Sot (Cueva Sorpresa).</li>
          <li>**Isla Ti Top:** Subir al mirador para vistas panorámicas de la bahía.</li>
          <li>**Pueblos Flotantes:** Observar la vida de las comunidades pesqueras locales.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🦞 Dónde comer</h2>
        <p>
          La gastronomía aquí se centra en el **marisco fresco**. La mayoría de las
          comidas se sirven a bordo del crucero y suelen incluir platos vietnamitas
          e internacionales. ¡Asegúrate de probar los platos de pescado, calamar y 
          langosta recién pescados!
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚢 Transporte</h2>
        <p>
          El principal medio de transporte es el barco. La mayoría de los viajeros
          reservan un paquete de crucero desde Hanói, que incluye el transporte de
          ida y vuelta en autobús limusina o furgoneta, desde tu hotel hasta el
          puerto (Ha Long City o Hai Phong, para Lan Ha Bay).
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Elige un crucero en la Bahía de **Lan Ha** o **Bai Tu Long** si buscas menos aglomeraciones.</li>
          <li>Asegúrate de que el precio del crucero incluye las tarifas de entrada a la bahía.</li>
          <li>La mejor época para un clima soleado es de marzo a mayo y de septiembre a noviembre.</li>
        </ul>
      </section>

      {/* Botones en lugar de CityChat y CityMeetups */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/halongbay"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Halong Bay
        </Link>

        <Link
          to="/citymeetups/halongbay"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Halong Bay
        </Link>
      </div>

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}