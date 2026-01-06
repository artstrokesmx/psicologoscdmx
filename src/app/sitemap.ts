// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/lib/sanity';
import { CONFIG_DEL_SITIO } from '@/lib/constantes';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = CONFIG_DEL_SITIO.url;

  // 1. Obtener todos los slugs del blog desde Sanity
  // Asumiendo que getAllBlogSlugs devuelve un array de objetos { slug: string, _updatedAt?: string }
  const blogPosts = await getAllBlogSlugs();
  
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. Definir tus páginas estáticas principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consultorio`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/juegos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // 3. Unir todo
  return [...staticPages, ...blogUrls];
}