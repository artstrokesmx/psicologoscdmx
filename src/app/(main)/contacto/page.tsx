import { CONFIG_DEL_SITIO } from '@/lib/constantes';

export default function ContactoPage() {
  const whatsappUrl = `https://wa.me/${CONFIG_DEL_SITIO.phone.replace('+', '')}?text=${encodeURIComponent("Hola Arturo, me gustaría agendar una consulta.")}`;

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">Contacta con Nosotros</h1>
        <p className="text-xl text-gray-600 text-center mb-12">Estamos aquí para apoyarte en tu proceso de bienestar.</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tarjeta de Información */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Datos del Consultorio</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-900">Ubicación:</p>
                <p className="text-gray-600">{CONFIG_DEL_SITIO.address.streetAddress}, {CONFIG_DEL_SITIO.address.addressLocality}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">Horarios:</p>
                <p className="text-gray-600">Lunes a Viernes: 09:00 - 21:00</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">Teléfono / WhatsApp:</p>
                <p className="text-gray-600">{CONFIG_DEL_SITIO.phone}</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Acción */}
          <div className="bg-blue-600 p-8 rounded-2xl shadow-lg text-white flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold mb-4">¿Prefieres mensajería directa?</h2>
            <p className="mb-8 text-blue-100">Haz clic abajo para enviarme un WhatsApp y agendar de inmediato.</p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition duration-300 w-full shadow-md"
            >
              Enviar WhatsApp ahora
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}