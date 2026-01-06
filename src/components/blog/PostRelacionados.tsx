import Link from 'next/link';
import Image from 'next/image';
import { BlogPostListItem } from '@/lib/types';

export default function PostRelacionados({ posts }: { posts: BlogPostListItem[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-100 pt-12">
      <h3 className="text-2xl font-bold text-blue-900 mb-8">Artículos relacionados</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
            <div className="relative h-44 w-full mb-4 overflow-hidden rounded-xl bg-gray-100">
              {post.mainImage?.asset?.url ? (
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder={post.mainImage.asset.metadata?.lqip ? "blur" : "empty"}
                  blurDataURL={post.mainImage.asset.metadata?.lqip}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-blue-50 text-blue-200">
                  <span className="text-xs">Psicólogos CDMX</span>
                </div>
              )}
            </div>
            <h4 className="font-bold text-lg text-blue-950 group-hover:text-blue-600 transition-colors leading-snug">
              {post.title}
            </h4>
            {post.summary && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2 italic">
                {post.summary}
              </p>
            )}
            <div className="mt-auto pt-3 text-xs text-blue-400 font-medium">
              {post.readingTime} min de lectura
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}