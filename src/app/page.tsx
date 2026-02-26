// Importamos la función para obtener posts (la usaremos para mostrar 3 posts destacados)
import { getBlogPosts } from '@/lib/sanity';
import Link from 'next/link';
import type { Metadata } from 'next';
import SchemaMarkup from '@/components/comunes/SchemaMarkup';
import { getLocalBusinessSchema, getWebSiteSchema, getBreadcrumbSchema, getFAQSchema } from '@/components/comunes/GeneradorDeSchema';
import { getHomeCombinedSchema } from '@/components/comunes/GeneradorDeSchema';
import { FAQ } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Psicólogo en Coyoacán, CDMX | Terapia para Ansiedad y Pareja',
  description: 'Psic. Arturo Miranda, especialista en ansiedad, depresión y terapia de pareja en Coyoacán. Agenda online.',
  alternates: {
    canonical: 'https://artstrokesmx.github.io/psicologoscdmx/',
  },
  openGraph: {
    title: 'Psicólogo en Coyoacán, CDMX | Terapia para Ansiedad y Pareja',
    description: 'Psic. Arturo Miranda, especialista en ansiedad, depresión y terapia de pareja en Coyoacán.',
    url: 'https://artstrokesmx.github.io/psicologoscdmx/',
    siteName: 'Consultorio de Psicología | Arturo Miranda',
    images: [
      {
        url: 'https://artstrokesmx.github.io/psicologoscdmx/logonew.svg',
        width: 800,
        height: 600,
        alt: 'Logo Psicólogo Arturo Miranda',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psicólogo en Coyoacán, CDMX | Terapia para Ansiedad y Pareja',
    description: 'Psic. Arturo Miranda, especialista en ansiedad, depresión y terapia de pareja en Coyoacán.',
    images: ['https://artstrokesmx.github.io/psicologoscdmx/logonew.svg'],
  },
};


// Tipado básico para los posts (idealmente vendría de '@/lib/types.ts')
interface Post {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
}

//export const revalidate = 0; // Fuerza a que no haya caché en la compilación
export const dynamic = 'force-static';

export default async function HomePage() {

  
  
  // 1. Cargar datos del blog (limitamos a 3 para mostrar en la portada)
  // Nota: Usaremos una consulta GROQ que filtre y ordene más eficientemente después.
  const allPosts: Post[] = await getBlogPosts();
  const featuredPosts = allPosts.slice(0, 3); // Tomamos los 3 más recientes

  const faqs: FAQ[] = [
    {
      question: "¿Tengo que estar muy mal para ir a terapia?",
      answer: "No, la terapia no es solo para personas que están pasando por una crisis. Muchas personas van a terapia para mejorar su bienestar emocional, aprender habilidades de afrontamiento, o simplemente para tener un espacio seguro donde hablar de sus pensamientos y sentimientos."
    },
    {
      question: "¿Cuánto tiempo dura la terapia?",
      answer: "La duración de la terapia varía según las necesidades individuales. Algunas personas pueden beneficiarse de unas pocas sesiones, mientras que otras pueden necesitar un compromiso a largo plazo. Lo importante es que te sientas cómodo y que la terapia esté ayudando a alcanzar tus objetivos."
    },
    {
      question: "¿Es la terapia solo para problemas mentales graves?",
      answer: "No, la terapia es para cualquier persona que quiera mejorar su bienestar emocional, independientemente de si tiene un diagnóstico específico o no. Muchas personas van a terapia para manejar el estrés, mejorar sus relaciones, o simplemente para tener un espacio donde puedan hablar de sus pensamientos y sentimientos sin juicio."
    }
  ];

    // Generar schemas
    const homeSchema = getHomeCombinedSchema(faqs);
  //const businessSchema = getLocalBusinessSchema();
  //const siteSchema = getWebSiteSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Inicio", item: "/" }
  ]);
  //const faqSchema = getFAQSchema(faqs);

  return (
    <>  
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        
        {/* Sección 1: Hero Principal (Con llamado a la acción CLARO) */}
        <section className="relative py-24 text-center overflow-hidden">
          <div 
    className="absolute inset-0 z-0"
    style={{
     backgroundImage: `url('/imagenes/hero.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Capa de color para dar contraste al texto (puedes ajustar el 0.8 a tu gusto) */}
   // <div className="absolute inset-0 bg-white/95 bg-linear-to-b from-white/90 to-blue-50/80"></div>
  </div>
          <div className="container mx-auto px-4 z-10 relative">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
              Psicólogo en Coyoacán y Terapia en línea
            </h1>
            <h2 className='text-3xl text-blue-700'>Sanar la Ansiedad, superar la Depresión y fortalecer tu Relación de Pareja.</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              No tienes que cargar con todo tú solo; te ayudo a redescubrir tus propias herramientas para retomar el control de tu vida.<br /><span className='font-bold'>Porque ir a terapia no es por estar "mal", es por querer estar mejor.</span> Te acompaño en un proceso de autoconocimiento para convertir tus retos en bienestar emocional.
            </p>
            <div className="flex flex-col space-x-4 space-y-1 justify-center md:flex-row md:space-y-0">
              <Link 
                href="https://wa.me/525548549863?text=Hola,%20quiero%20%20más%20información%20de%20terapia" 
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                Da el primer paso hoy.
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
                <p className="text-blue-100">La ansiedad no es sólo sentir nervios. Ni sólo se arregla tratando de relajarse. En terapia solucionamos este malestar desde el conocimiento de tu cuerpo, sus reacciones a tus pensamientos y el control de las emociones.</p>
              </div>
              {/* Card 2 */}
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Terapia de Pareja</h3>
                <p className="text-blue-100">El mejor viaje de la vida, es el que hacemos a lado de la persona que amamos. Pero la vida es muy larga y las personas somos muy cambiantes. En este tipo de terapia, nosotros aprendemos a comunicarnos de mejor manera con nuestra pareja, a compartir, a aceptar y respetar las diferentes formas que tenemos de ser. Y las convertimos en las bases para que nosotros podamos disfrutar cada paso de este viaje juntos.</p>
              </div>
              {/* Card 3 */}
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Superación de la Depresión</h3>
                <p className="text-blue-100">No es tu culpa sentirte deprimido, ni es una moda, ni siquiera es una situación que busques, la depresión es una enfermedad que llega en los momentos de la vida que no encontramos para donde dar un paso adelante. O que no confiamos en que lo haremos. En terapia conmigo, reforzaremos la parte de autoestima que te está deteniendo para avanzar y reestructuraremos tu forma de percibir, identificar y traducir el mundo. Para que sea dueño de lo que sientes y cómo lo vives.</p>
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
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Sobre mi</h3>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 ">Soy Arturo – Psicólogo Clínico en CDMX</h2>
            <p className="text-gray-700">Psicólogo de profesión, a lo largo de mi vida profesional he trabajado con varios pacientes que buscan solución a sus problemas. Y definitivamente, les he comentado que la solución a sus problemas no es la terapia psicológica, pero lo que si es, es una herramienta para que no todo lo conviertan en problema y para que, lo que si es problema, comprendan que ellos mismos son la solución, sólo que no han encontrado las herramientas que están dentro de ellos mismos. Esa, es la clave del éxito, no ir a terapia a solucionar el problema, sino a conocerse en totalidad, para que sean ustedes la clave de su éxito.</p>
            <p className='text-gray-700'>¿Estás listo para esforzarte por ti?</p>
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
        <section>
          <div className="container mx-auto px-4 text-center">
               <h2 className="text-2xl font-bold text-center text-gray-400 m-8">Preguntas Frecuentes</h2>
                <h3 className='text-lg text-white font-semibold mb-5 mt-2'>¿Tengo que estar muy mal para ir a terapia?</h3>
                <p>No, la terapia no es solo para personas que están pasando por una crisis. Muchas personas van a terapia para mejorar su bienestar emocional, aprender habilidades de afrontamiento, o simplemente para tener un espacio seguro donde hablar de sus pensamientos y sentimientos.</p>
                <h3 className='text-lg text-white font-semibold mb-5 mt-2'>¿Cuánto tiempo dura la terapia?</h3>
                <p>La duración de la terapia varía según las necesidades individuales. Algunas personas pueden beneficiarse de unas pocas sesiones, mientras que otras pueden necesitar un compromiso a largo plazo. Lo importante es que te sientas cómodo y que la terapia esté ayudando a alcanzar tus objetivos.</p>
                <h3 className='text-lg text-white font-semibold mb-5 mt-2'>¿Es la terapia solo para problemas mentales graves?</h3>
                <p>No, la terapia es para cualquier persona que quiera mejorar su bienestar emocional, independientemente de si tiene un diagnóstico específico o no. Muchas personas van a terapia para manejar el estrés, mejorar sus relaciones, o simplemente para tener un espacio donde puedan hablar de sus pensamientos y sentimientos sin juicio.</p>
      
          </div>
        </section>
       </main>
    </div>
  </>
  );
}