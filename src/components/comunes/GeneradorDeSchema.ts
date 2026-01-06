import {CONFIG_DEL_SITIO} from '@/lib/constantes';
import { BlogPostDetail } from '@/lib/types';

// Generador para Local Business
export const getLocalBusinessSchema = () => ({
    "@type": ["PsychologicalTreatment", "LocalBusiness", "HealthAndBeautyBusiness"],
    "id":`${CONFIG_DEL_SITIO.url}/#localbusiness`,
    "name": CONFIG_DEL_SITIO.name,
    "image": CONFIG_DEL_SITIO.logo,
    "description": CONFIG_DEL_SITIO.description,
    "telephone": CONFIG_DEL_SITIO.phone,
    "url": CONFIG_DEL_SITIO.url,
    "address": CONFIG_DEL_SITIO.address,
    "geo": CONFIG_DEL_SITIO.geo,
    "priceRange": CONFIG_DEL_SITIO.priceRange,
    "openingHoursSpecification": CONFIG_DEL_SITIO.openingHoursSpecification,
    "areaServed": CONFIG_DEL_SITIO.areaServed,
    "sameAs": CONFIG_DEL_SITIO.sameAs,
    "medicalSpecialty": CONFIG_DEL_SITIO.medicalSpecialty
});

export const getWebSiteSchema = () => ({
    "@type" : "WebSite",
    "id":`${CONFIG_DEL_SITIO.url}/#website`,
    "name" : CONFIG_DEL_SITIO.name,
    "description": CONFIG_DEL_SITIO.description,
    "publisher":{
        "@id":`${CONFIG_DEL_SITIO.url}/#organization`
    },
    "inLanguage":CONFIG_DEL_SITIO.inLanguage,
    "copyrightYear":CONFIG_DEL_SITIO.copyrightYear
})

// Generador para Breadcrumbs (Dinámico)
export const getBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.item.startsWith('http') ? item.item : `${CONFIG_DEL_SITIO.url}${item.item}`
  }))
});


export const getBlogPostingSchema = (post: BlogPostDetail, slug: string) => ({
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${CONFIG_DEL_SITIO.url}/blog/${slug}`
  },
  "headline": post.title,
  "description": post.metaDescription || post.summary,
  "image": post.mainImage?.asset?.url ? {
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
    "@id": `${CONFIG_DEL_SITIO.url}/#organization`,
    "name": CONFIG_DEL_SITIO.name,
    "logo": {
      "@type": "ImageObject",
      "url": CONFIG_DEL_SITIO.logo
    }
  },
  "wordCount": post.wordCount,
  "timeRequired": `PT${post.readingTime || 5}M`,
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector":[
        ".prose h2",
        ".prose p"
    ]
    }
});