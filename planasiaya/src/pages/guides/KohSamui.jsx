// src/pages/guides/KohSamui.jsx
import BackButton from "../../components/BackButton";

export default function KohSamui() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-green-700">Guía de Koh Samui</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌴 Introducción</h2>
        <p>
          Koh Samui es una de las islas más famosas de Tailandia, conocida por
          sus playas de arena blanca, resorts de lujo, templos impresionantes y
          una vida nocturna animada. Es un destino que combina relax, naturaleza
          y diversión.
        </p>
      </section>

      {/* Qué ver y hacer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Qué ver y hacer</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Templo del Gran Buda (Wat Phra Yai).</li>
          <li>Playas populares como Chaweng y Lamai.</li>
          <li>Excursión al Parque Marino de Ang Thong.</li>
          <li>Cascadas de Na Muang.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍲 Dónde comer</h2>
        <p>
          Koh Samui ofrece una gastronomía variada: desde mercados nocturnos
          locales como el de Fisherman’s Village hasta restaurantes gourmet en
          la playa. No dejes de probar el marisco fresco.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚗 Transporte</h2>
        <p>
          Puedes moverte en moto, taxi o songthaew (camionetas compartidas). 
          Otra opción es alquilar un coche si viajas en grupo.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Visita los templos con ropa adecuada.</li>
          <li>El clima puede ser húmedo, lleva siempre impermeable ligero.</li>
          <li>No te pierdas un masaje tailandés frente al mar.</li>
        </ul>
      </section>

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}


