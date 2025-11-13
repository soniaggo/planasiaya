import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";

export default function HoiAn() {
  return (
    <div className="p-4 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-red-700">Guía de Hoi An</h1>

      {/* Introducción */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🏮 Introducción</h2>
        <p>
          Hoi An es una ciudad portuaria bien conservada y un Patrimonio de la Humanidad
          por la UNESCO. Es famosa por su arquitectura única que mezcla influencias
          vietnamitas, chinas, japonesas y europeas, sus coloridas linternas y ser
          un centro para sastres de alta calidad. Es un lugar ideal para caminar
          y disfrutar de un ritmo de vida más lento.
        </p>
      </section>

      {/* Qué ver */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🌉 Qué ver</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>El Puente Japonés Cubierto (Chùa Cầu).</li>
          <li>Caminar por la Ciudad Antigua, especialmente al atardecer cuando se encienden las linternas.</li>
          <li>Las casas antiguas (como la Casa Antigua de Tan Ky).</li>
          <li>Hacer un paseo en bote en el río Thu Bon y soltar linternas.</li>
          <li>Relajarse en la cercana playa de An Bang.</li>
        </ul>
      </section>

      {/* Dónde comer */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🥟 Dónde comer</h2>
        <p>
          Hoi An tiene sus propios platos regionales únicos. Prueba el **Cao Lầu** (fideos de cerdo y verduras que, según la leyenda, solo saben igual aquí), 
          el **White Rose** (rollitos de camarón al vapor) y los **Hoành Thánh** (wantanes fritos). La escuela de cocina es una actividad muy popular.
        </p>
      </section>

      {/* Transporte */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🚲 Transporte</h2>
        <p>
          El centro de Hoi An es peatonal o está restringido a bicicletas y motos 
          en ciertos momentos. **Alquilar una bicicleta** es la mejor forma de 
          moverse por la ciudad y llegar a la playa. Para distancias largas, 
          puedes usar un taxi o un coche de **Grab**.
        </p>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Compra un ticket combinado para acceder a varias casas antiguas y museos.</li>
          <li>Considera hacerte ropa o zapatos a medida; los sastres son famosos por su rapidez y calidad.</li>
          <li>Visita la ciudad durante la noche de luna llena para ver el festival de linternas en todo su esplendor.</li>
        </ul>
      </section>

      {/* Botones en lugar de CityChat y CityMeetups */}
      <div className="flex flex-col gap-3 mt-6">
        <Link
          to="/citychat/hoian"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          💬 Ir al Chat de Hoi An
        </Link>

        <Link
          to="/citymeetups/hoian"
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          📅 Ver Quedadas en Hoi An
        </Link>
      </div>

      {/* Botón flotante */}
      <BackButton />
    </div>
  );
}