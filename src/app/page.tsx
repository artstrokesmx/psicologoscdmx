// Importamos la función para obtener posts (la usaremos para mostrar 3 posts destacados)
import { getBlogPosts } from '@/lib/sanity';
import Link from 'next/link';

// Componente para la Tarjeta de Previsualización (Aún no existe, la crearemos después)
// import PostPreviewCard from '@/components/blog/PostPreviewCard'; 

// Tipado básico para los posts (idealmente vendría de '@/lib/types.ts')
interface Post {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
}

export const revalidate = 0; // Fuerza a que no haya caché en la compilación

export default async function HomePage() {
  
  // 1. Cargar datos del blog (limitamos a 3 para mostrar en la portada)
  // Nota: Usaremos una consulta GROQ que filtre y ordene más eficientemente después.
  const allPosts: Post[] = await getBlogPosts();
  const featuredPosts = allPosts.slice(0, 3); // Tomamos los 3 más recientes

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        
        {/* Sección 1: Hero Principal (Con llamado a la acción CLARO) */}
        <section className="bg-blue-50 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
              Encuentra tu Paz y Bienestar en la Ciudad de México
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Psicoterapia profesional enfocada en Ansiedad, Depresión, Estrés y Desarrollo Personal.<br/>Tu camino hacia el equilibrio emocional comienza aquí.
            </p>
            <div className="flex flex-col space-x-4 space-y-1 justify-center md:flex-row md:space-y-0">
              <Link 
                href="/contacto" 
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                Agenda tu Primera Sesión
              </Link>
              <Link 
                href="/servicios" 
                className="bg-transparent border border-blue-600 text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300"
              >
                Conoce Nuestros Servicios
              </Link>
            </div>
          </div>
        </section>

        {/* Sección 2: Servicios Destacados (Problemas que resuelves) */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Podemos Ayudarte con...</h2>
            {/* Aquí irían 3 tarjetas o iconos (ej: Ansiedad, Depresión, Pareja) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Card 1 */}
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Manejo de Ansiedad</h3>
                <p className="text-blue-100">Estrategias efectivas para reducir el pánico y recuperar el control de tu vida diaria.</p>
              </div>
              {/* Card 2 */}
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Terapia de Pareja</h3>
                <p className="text-blue-100">Mejora la comunicación y fortalece la conexión emocional con tu pareja.</p>
              </div>
              {/* Card 3 */}
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Superación de la Depresión</h3>
                <p className="text-blue-100">Te acompañamos a encontrar motivación y a recuperar el sentido de propósito.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 3: Últimos Artículos del Blog (Conexión con Sanity) */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Recursos Gratuitos de Nuestro Blog</h2>
            
            {/* Muestra los posts cargados de Sanity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.length > 0 ? (
                featuredPosts.map((post) => (
                  // Usaremos el mismo diseño que en la página de lista de posts por ahora
                  <article key={post._id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium self-start"
                    >
                      Leer más →
                    </Link>
                  </article>
                ))
              ) : (
                <p className="col-span-3 text-center text-lg text-gray-500">
                  Cargando artículos o no hay posts disponibles.
                </p>
              )}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/blog" 
                className="text-blue-600 font-bold text-lg hover:text-blue-800 transition"
              >
                Ver todos los artículos
              </Link>
            </div>
          </div>
        </section>

        {/* Sección 4: Llamado a la Acción Final (Testimonios/Contacto) */}
        <section className="bg-blue-600 text-white py-16 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">¿Listo para Iniciar tu Transformación?</h2>
            <p className="text-xl mb-8">No pospongas tu bienestar. Da el primer paso hoy mismo.</p>
            <Link 
              href="/contacto" 
              className="bg-white text-blue-600 font-bold py-3 px-10 rounded-full hover:bg-gray-100 transition duration-300 shadow-xl text-lg"
            >
              Contactar al Consultorio
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}