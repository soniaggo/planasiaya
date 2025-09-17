// src/pages/guides/Bohol.jsx
import BackButton from "../../components/BackButton";
import CityChat from "../../components/CityChat";
import CityMeetups from "../../components/CityMeetups";

export default function Bohol() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-yellow-700">Guía de Bohol</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Bohol es una de las islas más bellas de Filipinas, famosa por sus
          Chocolate Hills, el tarsier (uno de los primates más pequeños del
          mundo) y sus playas de arena blanca. Es un destino que combina
          naturaleza, cultura y relax.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌄 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Chocolate Hills, el icono natural de la isla.</li>
          <li>Santuario del Tarsier en Corella.</li>
          <li>Río Loboc, donde puedes hacer un crucero en barco.</li>
          <li>Playas de Panglao, perfectas para snorkel y buceo.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍴 Dónde comer</h2>
        <p>
          En Panglao encontrarás restaurantes junto a la playa con marisco
          fresco. También hay bares de estilo internacional para viajeros y
          opciones locales para probar el lechón (cerdo asado).
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          La mejor manera de explorar Bohol es en moto de alquiler. También
          puedes contratar excursiones privadas o unirse a tours locales. Para
          moverte por Panglao hay triciclos disponibles.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Visita las Chocolate Hills al amanecer o atardecer para mejores vistas.</li>
          <li>Respeta a los tarsiers: no uses flash y guarda silencio.</li>
          <li>Para buceo, Alona Beach y Balicasag Island son imperdibles.</li>
        </ul>
      </section>

      <CityChat city="bohol" />
      <CityMeetups city="Bohol" />
      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}

