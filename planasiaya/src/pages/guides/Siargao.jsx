// src/pages/guides/Siargao.jsx
import BackButton from "../../components/BackButton";

export default function Siargao() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-emerald-600">Guía de Siargao</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏝️ Introducción</h2>
        <p>
          Siargao es conocida como la capital del surf en Filipinas, pero la isla 
          ofrece mucho más: lagunas turquesa, cuevas ocultas, palmeras infinitas 
          y un ambiente relajado perfecto para mochileros y viajeros de aventura.
        </p>
      </section>

      {/* Qué ver y hacer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌊 Qué ver y hacer</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Cloud 9: la meca del surf, famosa por sus olas potentes.</li>
          <li>Island Hopping: Naked Island, Daku Island y Guyam Island.</li>
          <li>Sugba Lagoon: ideal para nadar, hacer paddle surf y saltar al agua.</li>
          <li>Maasin River: el famoso columpio de cuerda sobre el río.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍴 Dónde comer</h2>
        <p>
          General Luna está lleno de restaurantes modernos y locales de comida 
          internacional. Prueba el "kinilaw" (ceviche filipino) y disfruta de 
          cafés de especialidad en la zona de Cloud 9.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          La forma más común de moverse es alquilar una moto. También hay triciclos 
          y habal-habal (moto-taxi). Desde el aeropuerto de Siargao puedes llegar 
          fácilmente a General Luna en van compartida.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>La mejor época para surfear es de agosto a noviembre.</li>
          <li>Lleva efectivo: pocos lugares aceptan tarjeta.</li>
          <li>Respeta el ambiente local, no dejes basura en las playas ni en las lagunas.</li>
        </ul>
      </section>

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}

