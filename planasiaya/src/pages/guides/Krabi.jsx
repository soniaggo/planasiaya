// src/pages/guides/Krabi.jsx
import BackButton from "../../components/BackButton";
import CityChat from "../../components/CityChat";
import CityMeetups from "../../components/CityMeetups";
export default function Krabi() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-orange-600">Guía de Krabi</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Krabi, en el sur de Tailandia, es famoso por sus impresionantes acantilados
          de piedra caliza, playas paradisíacas y excursiones a islas cercanas. 
          Es un destino imprescindible para quienes buscan naturaleza y aventura.
        </p>
      </section>

      {/* Qué ver y hacer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌅 Qué ver y hacer</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Railay Beach: una de las playas más bonitas de Tailandia.</li>
          <li>Excursión en barco a las 4 Islas (Chicken, Poda, Tup y Phra Nang).</li>
          <li>Templo de la Cueva del Tigre con sus 1.237 escalones y vistas increíbles.</li>
          <li>Visitar Ao Nang y disfrutar de su ambiente mochilero.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍲 Dónde comer</h2>
        <p>
          En Krabi encontrarás desde restaurantes locales hasta opciones 
          internacionales. En Ao Nang hay una gran variedad de marisco fresco 
          y comida callejera deliciosa. ¡No te pierdas el curry massaman!
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚤 Transporte</h2>
        <p>
          Desde Ao Nang puedes tomar barcos de cola larga hacia islas cercanas.
          Para moverte en tierra, hay taxis, songthaews y motos de alquiler. 
          El aeropuerto de Krabi conecta con Bangkok y otras ciudades de Asia.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Lleva calzado cómodo para subir al Templo del Tigre.</li>
          <li>Compra tours en agencias locales, suelen ser más baratos que online.</li>
          <li>En temporada alta, reserva alojamiento con antelación.</li>
        </ul>
      </section>
      <CityChat city="krabi" />
      <CityMeetups city="Krabi" />
      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}

