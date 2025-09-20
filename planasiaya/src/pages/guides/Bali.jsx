
   

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Bali() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-red-700">Guía de Bali</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌴 Introducción</h2>
        <p>
          Bali es una de las islas más famosas de Indonesia, conocida por sus
          paisajes tropicales, playas paradisíacas, arrozales en terrazas,
          templos únicos y su ambiente espiritual. Es un destino perfecto tanto
          para surfistas, amantes de la cultura como para quienes buscan relax.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏞️ Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Templo de Uluwatu con vistas al océano.</li>
          <li>Arrozales de Tegallalang en Ubud.</li>
          <li>Playas de Canggu y Seminyak para surf y vida nocturna.</li>
          <li>Templo del agua Tirta Empul.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍽️ Dónde comer</h2>
        <p>
          La gastronomía balinesa mezcla sabores intensos: prueba el Nasi Goreng,
          Babi Guling (cerdo asado) y el Mie Goreng. En Canggu y Ubud encontrarás
          también muchos cafés modernos con opciones veganas y saludables.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚗 Transporte</h2>
        <p>
          La forma más práctica de moverse en Bali es alquilar una moto. También
          puedes usar apps como Gojek o Grab para pedir motos o coches con
          conductor. Ten en cuenta que el tráfico puede ser caótico en zonas
          turísticas.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Lleva un pareo o sarong para visitar templos.</li>
          <li>Ten cuidado con los monos en Uluwatu y Ubud, ¡son muy traviesos!</li>
          <li>Evita beber agua del grifo, compra siempre embotellada.</li>
        </ul>
      </section>

      {/* Botones en lugar de CityChat y CityMeetups */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/bali"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Bali
        </Link>

        <Link
          to="/citymeetups/bali"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Bali
        </Link>
      </div>

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}

