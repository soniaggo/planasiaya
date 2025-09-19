// src/pages/guides/KohPhangan.jsx
import BackButton from "../../components/BackButton";
import CityChat from "../../components/CityChat";
import CityMeetups from "../../components/CityMeetups";

export default function KohPhangan() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-pink-700">Guía de Koh Phangan</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌴 Introducción</h2>
        <p>
          Koh Phangan es una isla tailandesa conocida mundialmente por sus fiestas
          de luna llena, pero también esconde playas tranquilas, naturaleza
          exuberante y comunidades de yoga y meditación. Un destino perfecto tanto
          para quienes buscan fiesta como para quienes desean relajarse.
        </p>
      </section>

      {/* Qué ver y hacer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🎉 Qué ver y hacer</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>La famosa Full Moon Party en Haad Rin.</li>
          <li>Playas tranquilas como Bottle Beach y Haad Yuan.</li>
          <li>Excursiones al Parque Nacional Marino Ang Thong.</li>
          <li>Clases de yoga y retiros espirituales en Srithanu.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍜 Dónde comer</h2>
        <p>
          Desde puestos callejeros hasta restaurantes veganos en Srithanu,
          Koh Phangan ofrece una gastronomía variada. Prueba el curry tailandés
          y los batidos tropicales.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          La mejor forma de moverse por Koh Phangan es alquilar una moto. 
          También hay taxis colectivos (songthaews), aunque pueden ser caros.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Reserva alojamiento con antelación en temporada alta.</li>
          <li>Conduce con precaución, las carreteras pueden ser empinadas.</li>
          <li>No te pierdas los atardeceres en Haad Rin o Secret Beach.</li>
        </ul>
      </section>
      <CityChat city="kohphangan" />
      <CityMeetups city="kohphangan"country="Tailandia"  />
      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}


