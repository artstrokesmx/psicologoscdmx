// src/app/(main)/blog/[slug]/page.tsx
import React, { PropsWithChildren } from 'react';

import { getAllBlogSlugs, getPostBySlug } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import type { BlogPostDetail} from '@/lib/types';

import SanityImage from '@/components/comunes/SanityImage';
import SchemaMarkup from '@/components/comunes/SchemaMarkup';
import HowToSection from '@/components/blog/HowToDo';
import FaqSection from '@/components/blog/FaqSection';

import {getLocalBusinessSchema,getWebSiteSchema,getBreadcrumbSchema,getBlogPostingSchema} from '@/components/comunes/GeneradorDeSchema';


// 1. GENERATE STATIC PARAMS (Obligatorio para GitHub Pages)
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs;
}

// 2. METADATA DINÁMICA
export async function generateMetadata({ params }: { params: Promise <{ slug: string }>  }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPostBySlug(slug);
  if (!post)  {
  return {
    title: `Post no encontrado `,
    description: 'La publicación que buscas no se encuentra.',
  };
}

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.summary || '';
  const canonicalUrl = `https://artstrokesmx.github.io/psicologoscdmx/blog/${slug}`;
  const ogTitle = post.ogTitle || post.title;
  const ogDescription = post.ogDescription || post.metaDescription || post.summary || '';

return {
    title: `${title} | Psicólogo Arturo`,
    description,
    keywords: post.metaKeywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      ...(post.updatedAt && { modifiedTime: post.updatedAt }),
      ...(post.author?.name && { authors: [post.author.name] }),
      ...(post.tags && { tags: post.tags }),
      images: post.mainImage?.asset?.url ? [
        {
          url: post.mainImage.asset.url,
          ...(post.mainImage.asset.metadata?.dimensions && {
            width: post.mainImage.asset.metadata.dimensions.width,
            height: post.mainImage.asset.metadata.dimensions.height,
          }),
          alt: post.mainImage.alt || '',
        }
      ] : [],
    },
    ...(post.canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
  };
}

// 3. COMPONENTE DE PÁGINA
export default async function BlogPostPage({ params }: { params: Promise <{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post: BlogPostDetail | null = await getPostBySlug(slug);

  if (!post){ notFound();}
// 1. Datos para el Schema de BlogPosting (Artículo)
    // Dentro de BlogPostPage en src/app/(main)/blog/[slug]/page.tsx

const blogPostingSchema = getBlogPostingSchema(post, resolvedParams.slug);
    // 2. Datos para el Schema de FAQ (si existen)
    const faqSchema = post.faqs && post.faqs.length > 0 ? {
      mainEntity: post.faqs.map(faq => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    } : undefined;

    const businessSchema = getLocalBusinessSchema();
    const siteSchema = getWebSiteSchema();
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: "Inicio", item: "https://artstrokesmx.github.io/psicologoscdmx/" },
      { name: "Blog", item: "https://artstrokesmx.github.io/psicologoscdmx/blog" },
      { name: post.title, item: `/blog/${resolvedParams.slug}` }
    ]);

    // 3. Datos para el Schema de HowTo (si existe)
    const howToSchema = post.howTo ? {
      name: post.howTo.name,
      description: post.howTo.description,
      totalTime: post.howTo.totalTime,
      step: post.howTo.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.stepName,
        itemListElement: [{
          "@type": "HowToDirection",
          text: step.stepText
        }]
      }))
    } : undefined;

  // Configuración de estilos para el contenido de Sanity
  const components = {
  types: {
    // Diagnóstico para Imágenes
    image: SanityImage,
  },
  block: {
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="text-3xl font-bold mt-10 mb-4 text-blue-900 border-b pb-2">{children}</h2>
    ),
    blockquote: ({ children }: PropsWithChildren) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic my-6 bg-gray-50 text-gray-700">
        {children}
      </blockquote>
    ),
  },
};

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* INYECCIÓN DE SCHEMAS */}
    <SchemaMarkup type="BlogPosting" schema={blogPostingSchema} />
    
    {faqSchema && (
      <SchemaMarkup type="FAQPage" schema={faqSchema} />
    )}
    
    {howToSchema && (
      <SchemaMarkup type="HowTo" schema={howToSchema} />
    )}

    <SchemaMarkup type="LocalBusiness" schema={businessSchema} />
    <SchemaMarkup type="WebSite" schema={siteSchema} />
    <SchemaMarkup type="BreadcrumbList" schema={breadcrumbSchema} />
    
      <article className="container mx-auto px-4 max-w-4xl bg-white shadow-sm rounded-xl p-8 md:p-12">
        <header className="relative h-[60vh] min-h-100 w-full flex items-center justify-center overflow-hidden bg-blue-900">
          {post.mainImage?.asset?.url ? (
        <>
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
            fill
            priority // Carga esta imagen primero
            className="object-cover"
          />
          {/* 2. Capa de oscurecimiento (Overlay) para legibilidad */}
          <div className="absolute inset-0 bg-linear-to-t from-blue-900/90 via-blue-900/40 to-transparent" />
        </>
      ) : (
        // Fallback si no hay imagen
        <div className="absolute inset-0 bg-blue-900" />
      )}

      {/* 3. Contenido del Header (Texto) */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg max-w-4xl mx-auto">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-blue-100 font-medium">
          <span className="bg-blue-600/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {post.category || 'Psicología'}
          </span>
          <span className="text-sm border-l border-blue-300/50 pl-4">
            {new Date(post.publishedAt).toLocaleDateString('es-MX', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </span>
        </div>
      </div>
        </header>

        <div className="prose prose-blue max-w-none text-blue-950">
          <PortableText value={post.body} components={components} />
        </div>
       {post.howTo && post.howTo.steps && post.howTo.steps.length > 0 && (
          <HowToSection 
            title={post.howTo.name} 
            steps={post.howTo.steps} 
            description={post.howTo.description}
          />
        )}
        {/* FAQs con el fallback de array vacío para evitar errores de tipo */}
        <FaqSection faqs={post.faqs || []} />
      </article>
    </div>
  );
}