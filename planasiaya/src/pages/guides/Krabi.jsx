

import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function Krabi() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-orange-700">Guía de Krabi</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Krabi es una provincia costera de Tailandia famosa por sus playas,
          acantilados y excursiones a islas paradisíacas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌊 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Railay Beach y sus impresionantes acantilados.</li>
          <li>Islas Phi Phi y excursión en barco.</li>
          <li>Templo de la Cueva del Tigre.</li>
          <li>Aguas termales de Krabi.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🍤 Dónde comer</h2>
        <p>
          Krabi tiene muchos restaurantes de marisco fresco, así como mercados
          callejeros donde probar auténtica comida tailandesa.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🚤 Transporte</h2>
        <p>
          Usa longtails (barcas tradicionales) para moverte entre playas e
          islas. En tierra, puedes usar moto o tuk-tuk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Lleva efectivo para pagar barcas y excursiones.</li>
          <li>Visita Railay temprano para evitar aglomeraciones.</li>
          <li>No olvides protector solar y repelente.</li>
        </ul>
      </section>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/krabi"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Krabi
        </Link>

        <Link
          to="/citymeetups/krabi"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Krabi
        </Link>
      </div>

      <BackButton />
    </div>
  );
}
