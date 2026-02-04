import Link from "next/link";

export default async function ServiciosPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
        <main className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center mb-12 text-blue-900">Nuestros Servicios de Psicoterapia</h1>
            <p className="text-lg text-gray-700 mb-2">
              Nuestras diferentes terapias están diseñadas para ayudarte a alcanzar tu bienestar emocional y mental. Ya sea que estés lidiando con ansiedad, depresión, estrés o busques desarrollo personal, estamos aquí para apoyarte.
            </p>
            <section className="mb-12">
              <div className="container mx-auto px-4 ">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Podemos Ayudarte con...</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {/* Card 1 */}
                  <Link href="/servicios/terapiaDePareja">
                    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md shadow-gray-600 transition cursor-pointer bg-blue-900">
                        <h3 className="text-xl font-semibold text-white mb-3">Terapia de pareja</h3>
                        <p className="text-gray-300">Mejora la comunicación y fortalece la conexión emocional con tu pareja. Estrategias efectivas para reducir el pánico y recuperar el control de tu vida diaria.</p>
                        <p className="text-white mt-2">Más información Da click</p>
                    </div>
                  </Link>
                  
                  {/* Card 2 */}
                  <div className="p-6 border rounded-lg shadow-sm hover:shadow-md shadow-gray-600 transition cursor-pointer bg-blue-900">
                    <h3 className="text-xl font-semibold text-white mb-3">Terapia Individual</h3>
                    <p className="text-white">Te brindamos un espacio para que puedas comprender mejor tu presente, tus edecisiones y tus actos. Además, generamos herramientas de personalidad que te ayudarán a generar un mejor presente.</p>
                    <p className="text-white list-disc text-left">Trabajamos temáticas como:</p>
                    <ul className="text-white list-disc text-left">
                      <li>Depresión</li>
                      <li>Ansiedad</li>
                      <li>Desarrollo Personal</li>
                    </ul>
                  </div>
                  {/* Card 3 */}
                  <div className="p-6 border rounded-lg shadow-sm hover:shadow-md shadow-gray-600 transition cursor-pointer bg-blue-900">
                    <h3 className="text-xl font-semibold text-white mb-3">Superación de la Depresión</h3>
                    <p className="text-white">La depresión se entiendo como un desafío que enfrentamos cotidianamente. A veces escondida en sentimientos de desánimo, otras en desgano. Pero siempre, no permitiéndote hacer las cosas que verdaderamente deseas hacer.</p>
                    <p className="text-white">Trabajamos con lo que dentro de ti, no te permite seguir adelante. Y lo cambiamos para que sea esto la clave de tu seguir adelante.</p>
                  </div>
                </div>
              </div>
            </section>
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Nuestra metodología</h2>
            <p className="text-lg text-black mb-6">Creemos fervientemente en el potencial de cambio de las personas. Sabemos que; cuando se encuentran con un problema, sabemos lo que queremos lograr, lo que los demás esperan que logremos, pero posiblemente lo que desconocemos es la manera para alcanzar esas metas que esperamos.</p>
            <p className="text-lg text-black mb-6">Nos centramos en tus capacidades y herramientas ya existentes y la convertimos en tus armas más fuertes para alcanzar el cambio que esperas.</p>
            <ol className="text-black list-decimal list-inside space-y-4">
                <li>Identificar tu motivo de consulta.</li>
                <li>Establecer una meta clara y puntualizada de lo que quieres lograr.</li>
                <li>Desarrollar las herramientas que te hacen falta y fortalecer las que ya tienes.</li>
                <li>Volver a probar si es realmente lo que esperas.</li>
            </ol>
        </main>
    </div>
    );
}