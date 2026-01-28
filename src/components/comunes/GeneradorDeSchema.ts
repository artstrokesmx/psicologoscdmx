import {CONFIG_DEL_SITIO} from '@/lib/constantes';
import { BlogPostDetail,FAQ} from '@/lib/types';

const BASE_ID = CONFIG_DEL_SITIO.url;

const CATEGORY_MAP: Record<string, { genre: string[], section: string, age?: string }> = {
  'Psicología y Bienestar': { 
    genre: ['Psychology', 'Mental Health'], 
    section: 'HealthTopic / MentalHealth' 
  },
  'Terapia de Pareja': { 
    genre: ['Psychology', 'Relationships'], 
    section: 'HealthTopic / FamilyAndRelationships' 
  },
  'Desarrollo Personal': { 
    genre: ['Self-help', 'Personal Development'], 
    section: 'HealthTopic / PersonalGrowth' 
  },
  'Escuela de Padres': { 
    genre: ['Parenting', 'Education'], 
    section: 'HealthTopic / Family',
    age: '25-50'
  },
  'Crecimiento Profesional': { 
    genre: ['Career Development', 'Coaching'], 
    section: 'ProfessionalDevelopment',
    age: '22-45'
  }
};

// Generador para Local Business
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Psychologist",
    // "@type": ["PsychologicalTreatment", "LocalBusiness", "HealthAndBeautyBusiness"],
    "id":`${BASE_ID}/#localbusiness`,
    "name": CONFIG_DEL_SITIO.name,
    "image": CONFIG_DEL_SITIO.logo,
    "description": CONFIG_DEL_SITIO.description,
    "telephone": CONFIG_DEL_SITIO.phone,
    "url": BASE_ID,
    "address": CONFIG_DEL_SITIO.address,
    "geo": CONFIG_DEL_SITIO.geo,
    "priceRange": CONFIG_DEL_SITIO.priceRange,
    "openingHoursSpecification": CONFIG_DEL_SITIO.openingHoursSpecification,
    "areaServed": CONFIG_DEL_SITIO.areaServed,
    "sameAs": CONFIG_DEL_SITIO.sameAs,
    "medicalSpecialty": "Psychology"
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
    "@type" : "WebSite",
    "id":`${BASE_ID}/#website`,
    "url": BASE_ID,
    "name" : CONFIG_DEL_SITIO.name,
    "description": CONFIG_DEL_SITIO.description,
    "publisher":{
        "@id":`${BASE_ID}/#organization`
    },
    "inLanguage":CONFIG_DEL_SITIO.inLanguage,
    "copyrightYear":CONFIG_DEL_SITIO.copyrightYear
})

// Generador para Breadcrumbs (Dinámico)
export const getBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.item.startsWith('http') ? item.item : `${BASE_ID}${item.item}`
  }))
});


export const getBlogPostingSchema = (post: BlogPostDetail, slug: string) => {
  const postUrl = `${BASE_ID}/blog/${slug}`;
  const categoryConfig = CATEGORY_MAP[post.category || ''] || { 
    genre: ['Psychology'], 
    section: 'Mental Health' 
  };

  return{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id":`${postUrl}#blogposting`,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${postUrl}`
  },
  "headline": post.metaTitle || post.title,
  "description": post.metaDescription || post.summary,
  "articleSection": categoryConfig.section,
  "articleGenre": categoryConfig.genre,
  "typicalAgeRange": "18-60", // Público adulto
    "countryOfOrigin": {
      "@type": "Country",
      "name": "MX"
    },
    "inLanguage": "es-MX",
  "image": post.mainImage?.asset?.url ?  {
    "@type": "ImageObject",
    "url": post.mainImage.asset.url,
    "width": post.mainImage.asset.metadata?.dimensions?.width || 800,
    "height": post.mainImage.asset.metadata?.dimensions?.height || 600
  } : CONFIG_DEL_SITIO.logo,
  "datePublished": post.publishedAt,
  "dateModified": post.updatedAt || post.publishedAt,
  "author": {
    "@type": "Person",
    "name": post.author?.name || "Psic. Arturo Miranda",
    "url": post.author?.url || CONFIG_DEL_SITIO.sameAs[0]
  },
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_ID}/#organization`,
    "name": CONFIG_DEL_SITIO.name,
    "logo": {
      "@type": "ImageObject",
      "url": CONFIG_DEL_SITIO.logo
    }
  },
  "keywords": post.tags?.join(", "),
  // "articleSection": post.category,
  "wordCount": post.wordCount,
  "timeRequired": `PT${post.readingTime || 5}M`,
  "isAccessibleForFree": "True",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector":[
        ".prose h2",
        ".prose p"
    ]
    }
}}
;

export const getFAQSchema = (faqs?: FAQ[]) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const getHowToSchema = (post: BlogPostDetail) => {
  const howTo = post.howTo;
  if (!howTo || !howTo.steps || howTo.steps.length === 0) return null;

  const postUrl = `${BASE_ID}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name || post.title,
    "description": howTo.description || post.summary,
    "url": postUrl,
    "totalTime": howTo.totalTime || "PT15M",
    "estimatedCost": howTo.estimatedCost ? {
      "@type": "MonetaryAmount",
      "currency": howTo.estimatedCost.currency || "MXN",
      "value": howTo.estimatedCost.value || 0
    } : undefined,
    "step": howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.stepName, // Mapeamos stepName -> name para Google
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": step.stepText // Mapeamos stepText -> text para Google
      }]
    }))
  };
};