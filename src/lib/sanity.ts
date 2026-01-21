import { createClient, groq } from 'next-sanity';
import type { BlogPostListItem, BlogPostDetail } from '@/lib/types';

// 1. Inicialización del cliente
export const sanityClient = createClient({
  projectId: '4hvlxjly',
  dataset: 'production', // process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false //process.env.NODE_ENV === 'production', // Solo CDN en producción
});

// 2. Función para obtener la lista de todos los posts
export async function getBlogPosts(): Promise<BlogPostListItem[]> {
  const query = groq`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      readingTime,
      wordCount,
      mainImage {
        asset -> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
          }
        },
        alt,
        caption,
        hotspot,
        crop
      },
      tags,
      category,
      metaDescription
    }
  `;
  
  const posts = await sanityClient.fetch(query);
  return posts || [];
}

// 3. Función para obtener un post individual por slug
export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const query = groq`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      summary,
      metaDescription,
      publishedAt,
      updatedAt,
      readingTime,
      wordCount,
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset -> {
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              },
              lqip,
              palette {
                dominant {
                  background,
                  foreground
                }
              }
            }
          }
        },
        markDefs[] {
          ...,
          _type == "link" => {
            "href": @.href,
            "target": @.target
          }
        }
      },
      faqs[] {
        question,
        answer
      },
      titleHowTo,
      howTo {
        name,
        description,
        totalTime,
        estimatedCost {
          currency,
          value
        },
        steps[] {
          stepName,
          stepText
        }
      },
      mainImage {
        asset -> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip,
            palette {
              dominant {
                background,
                foreground
              }
            }
          }
        },
        alt,
        caption,
        hotspot {
          x,
          y,
          height,
          width
        },
        crop {
          top,
          bottom,
          left,
          right
        },
        creditText,
        creator,
        license
      },
      ogImage {
        asset -> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
          }
        },
        alt
      },
      author {
        name,
        jobTitle,
        url,
        knowsAbout
      },
      authorBio,
      publisher {
        name,
        alternateName,
        url,
        logo {
          asset -> {
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          },
          alt,
          width,
          height
        },
        description,
        address {
          streetAddress,
          addressLocality,
          addressRegion,
          postalCode,
          addressCountry
        }
      },
      articleSection,
      articleGenre,
      typicalAgeRange,
      countryOfOrigin,
      internalLinks[] {
        title,
        url
      },
      tags,
      category,
      canonicalUrl,
      metaTitle,
      metaKeywords,
      metaRobots,
      ogTitle,
      ogDescription
    }
  `;
  
  const post = await sanityClient.fetch(query, { slug });
  return post || null;
}

// 4. Función auxiliar para obtener los slugs (Ahora con fecha para el sitemap)
export async function getAllBlogSlugs(): Promise<Array<{ slug: string; _updatedAt: string }>> {
  const query = groq`
    *[_type == "blogPost" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `;
  
  const slugs = await sanityClient.fetch<Array<{ slug: string; _updatedAt: string }>>(query);
  
  if (!slugs) return [];

  return slugs; // Ya viene con el formato correcto [{ slug: "...", _updatedAt: "..." }]
}
export async function getRelatedPosts(
  currentSlug: string, 
  category: string, 
  tags: string[] = []
): Promise<BlogPostListItem[]> {
  const query = groq`
    *[_type == "blogPost" && slug.current != $currentSlug] | order(
      (category == $category || count((tags[][@ in $tags])) > 0) desc, 
      publishedAt desc
    ) [0...3] {
      _id,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      mainImage {
        asset -> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
          }
        },
        alt
      },
      readingTime
    }
  `;
  
  return await sanityClient.fetch(query, { 
    currentSlug, 
    category, 
    tags: tags.length > 0 ? tags.join('|') : '.*' 
  });
}