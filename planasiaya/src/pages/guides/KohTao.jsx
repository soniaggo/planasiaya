// src/pages/guides/KohTao.jsx
import BackButton from "../../components/BackButton";
import CityChat from "../../components/CityChat";
import CityMeetups from "../../components/CityMeetups";

export default function KohTao() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-teal-700">Guía de Koh Tao</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌊 Introducción</h2>
        <p>
          Koh Tao, conocida como la isla de las tortugas, es un paraíso para el
          buceo y el snorkel. Sus aguas cristalinas y arrecifes de coral atraen
          a viajeros de todo el mundo, además de tener un ambiente relajado ideal
          para mochileros.
        </p>
      </section>

      {/* Qué ver y hacer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🤿 Qué ver y hacer</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Practicar buceo en Shark Bay o Chumphon Pinnacle.</li>
          <li>Subir al mirador de John-Suwan Viewpoint.</li>
          <li>Explorar playas tranquilas como Ao Leuk o Sai Nuan.</li>
          <li>Excursiones en barco alrededor de la isla.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍛 Dónde comer</h2>
        <p>
          Koh Tao ofrece desde restaurantes tailandeses baratos hasta opciones
          internacionales. Prueba los currys en Sairee Beach y disfruta de cenas
          junto al mar con marisco fresco.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          La forma más común de moverse es alquilar una moto, aunque también hay
          taxis locales (songthaews). Ten en cuenta que algunas carreteras son
          empinadas y conviene conducir con precaución.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Lleva gafas de snorkel: hay vida marina en casi todas las playas.</li>
          <li>Elige bien la escuela de buceo, hay muchas y de distintos niveles.</li>
          <li>Si buscas tranquilidad, alójate lejos de Sairee Beach.</li>
        </ul>
      </section>
      <CityChat city="kohtao" />
      <CityMeetups city="kohtao" />
      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}

