// src/pages/guides/ChiangMai.jsx
import BackButton from "../../components/BackButton";

export default function ChiangMai() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-green-700">Guía de Chiang Mai</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌿 Introducción</h2>
        <p>
          Chiang Mai, situada en el norte de Tailandia, es una ciudad rodeada de
          montañas y templos históricos. Es el destino perfecto para viajeros
          que buscan cultura, naturaleza y un ambiente relajado, lejos del caos
          de Bangkok.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏯 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Templo Doi Suthep, el más icónico de la ciudad.</li>
          <li>La ciudad antigua y sus murallas.</li>
          <li>Los mercados nocturnos como el Night Bazaar y Sunday Market.</li>
          <li>Excursiones a montañas, cataratas y santuarios de elefantes éticos.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍜 Dónde comer</h2>
        <p>
          Chiang Mai es famosa por su gastronomía del norte de Tailandia.
          Prueba el <em>Khao Soi</em>, una sopa de curry con fideos crujientes.
          También encontrarás cafés modernos y mercados callejeros llenos de vida.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚗 Transporte</h2>
        <p>
          La forma más práctica es alquilar una moto o usar <em>songthaews</em>
          (camionetas rojas compartidas). Para excursiones fuera de la ciudad,
          puedes contratar tours o alquilar coche con conductor.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Visita en noviembre para el festival de faroles <em>Loy Krathong</em>.
          </li>
          <li>El clima es más fresco que en el sur, lleva algo de abrigo ligero.</li>
          <li>Elige solo santuarios de elefantes éticos que no permitan montar animales.</li>
        </ul>
      </section>

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}

