// src/pages/guides/Gili.jsx
import BackButton from "../../components/BackButton";
import CityChat from "../../components/CityChat"; 
import CityMeetups from "../../components/CityMeetups";

export default function Gili() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-teal-700">Guía de Islas Gili</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Las Islas Gili son un pequeño paraíso en Indonesia formado por tres
          islas principales: Gili Trawangan, Gili Air y Gili Meno. Con sus playas
          de arena blanca, aguas cristalinas y ambiente relajado, son un destino
          ideal para buceo, snorkel y descanso.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌊 Qué ver y hacer</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Bucear o hacer snorkel para ver tortugas marinas.</li>
          <li>Disfrutar de los atardeceres en Gili Trawangan.</li>
          <li>Explorar en bicicleta (no hay coches en las islas).</li>
          <li>Visitar Gili Meno para una experiencia más tranquila.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍹 Dónde comer</h2>
        <p>
          En las Gili encontrarás desde restaurantes locales con pescado fresco
          hasta bares de playa con ambiente relajado. Gili Trawangan es la más
          animada, mientras que Gili Air y Meno ofrecen experiencias más
          tranquilas.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚤 Transporte</h2>
        <p>
          Para llegar a las islas, puedes tomar un ferry o lancha rápida desde
          Bali o Lombok. Dentro de las islas, el transporte se hace caminando,
          en bicicleta o en carruajes tirados por caballos (aunque se recomienda
          evitar estos últimos por razones éticas).
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>No hay cajeros automáticos en todas las islas, lleva suficiente efectivo.</li>
          <li>Protégete del sol, el clima es muy fuerte durante el día.</li>
          <li>Respeta el entorno marino: no toques los corales ni los animales.</li>
        </ul>
      </section>
      <CityChat city="gili" /> 
      <CityMeetups city="gili" /> 
      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}


