// src/app/(main)/blog/page.tsx
import { getBlogPosts } from '@/lib/sanity';
import Link from 'next/link';
import type { BlogPostListItem } from '@/lib/types';

export const metadata = {
  title: 'Blog de Psicología | Artículos y Consejos',
  description: 'Explora artículos sobre salud mental, bienestar y terapia escrita por expertos.',
};

export default async function BlogListPage() {
  const posts: BlogPostListItem[] = await getBlogPosts();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-900">Artículos de Psicología</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post._id} className="border rounded-lg overflow-hidden shadow-hover transition-shadow bg-white flex flex-col">
            <div className="p-6 flex flex-col grow">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.summary}
              </p>
              <div className="mt-auto">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-blue-600 font-bold hover:underline"
                >
                  Leer más →
                </Link>
              </div>
            </div>
            <div className='hidden'>
              <Link
                href={'/consultorio/page.tsx'}
                className='hidden'
                >Consultorio</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}