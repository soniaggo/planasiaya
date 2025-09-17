// src/pages/guides/Camiguin.jsx
import BackButton from "../../components/BackButton";
import CityChat from "../../components/CityChat";
import CityMeetups from "../../components/CityMeetups";

export default function Camiguin() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-yellow-600">Guía de Camiguin</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌋 Introducción</h2>
        <p>
          Camiguin es una pequeña isla volcánica en Filipinas, conocida como la
          <strong> “Isla de Fuego”</strong>. A pesar de su tamaño, ofrece una gran
          variedad de paisajes: volcanes, cascadas, aguas termales y playas de
          arena blanca. Es un destino perfecto para quienes buscan naturaleza y
          tranquilidad lejos de las multitudes.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏞️ Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>White Island, un banco de arena blanca en medio del mar.</li>
          <li>Las cascadas Katibawasan y Tuasan.</li>
          <li>Volcán Hibok-Hibok para senderismo y vistas panorámicas.</li>
          <li>Manantiales termales de Ardent.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍴 Dónde comer</h2>
        <p>
          En Mambajao encontrarás pequeños restaurantes locales y resorts con
          cocina filipina e internacional. No te pierdas los mariscos frescos y
          los <em>pastel de lanzones</em>, un dulce típico de la isla.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🛵 Transporte</h2>
        <p>
          Lo más cómodo es alquilar una moto para recorrer la isla, ya que su
          carretera principal rodea toda la costa. También hay multicabs y
          mototaxis disponibles para trayectos cortos.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Camiguin es famosa por su festival del lanzones en octubre.</li>
          <li>Lleva calzado adecuado si quieres subir al Hibok-Hibok.</li>
          <li>Es una isla tranquila, ideal para descansar lejos de grandes masas turísticas.</li>
        </ul>
      </section>
      <CityChat city="camiguin" />
      <CityMeetups city="camiguin" />

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}


