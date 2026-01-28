// src/lib/types.ts - ARCHIVO ÚNICO Y COMPLETO

// ==================== TIPOS BÁSICOS DE SANITY ====================
export interface SanityAssetRef {
  _ref: string;
  _type: 'reference';
  _weak?: boolean;
  url?: string;
  metadata?: string;
}

export interface SanityImageAsset {
  _id: string;
  _type: 'sanity.imageAsset';
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string;
    palette?: unknown;
  };
}

export interface SanityImage {
  asset: SanityAssetRef;
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityBlockChild {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote' | 'highlight';
  children: SanityBlockChild[];
  markDefs?: Array<{
    _key: string;
    _type: string;
    [key: string]: unknown;
  }>;
  level?: number;
  listItem?: string;
}

export interface SanityImageBlock {
  _type: 'image';
  _key: string;
  asset: SanityAssetRef;
  alt?: string;
  caption?: string;
}

export type SanityBody = Array<SanityBlock | SanityImageBlock>;

// ==================== TIPOS DE COMPONENTES ====================

export interface BlogSlug {
  slug: string;
  _updatedAt?: string; // El signo de interrogación por si acaso
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface HowToStep {
  stepName: string;
  stepText: string;
}

export interface HowTo {
  name: string;
  description?: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: number;
  };
  steps: HowToStep[];
}

export interface Author {
  name: string;
  jobTitle: string;
  url: string;
  knowsAbout: string[];
}

export interface Address {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface Publisher {
  name: string;
  alternateName: string;
  url: string;
  logo?: SanityImage;
  description: string;
  address?: Address;
}

export interface InternalLink {
  title: string;
  url: string;
}

// ==================== TIPOS PRINCIPALES ====================

// Tipo COMPLETO para Sanity (opcional, si lo necesitas)
export interface BlogPost {
  // Metadatos de Sanity
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'blogPost';
  
  // Contenido
  title: string;
  slug: { current: string };
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  wordCount: number;
  body: SanityBody;
  
  // SEO
  metaDescription: string;
  metaTitle?: string;
  canonicalUrl?: string;
  metaKeywords?: string;
  metaRobots: string;
  ogTitle?: string;
  ogDescription?: string;
  
  // Imágenes
  mainImage: SanityImage;
  ogImage?: SanityImage;
  
  // Datos estructurados
  faqs?: FAQ[];
  howTo?: HowTo;
  articleSection?: string;
  articleGenre?: string[];
  typicalAgeRange: string;
  countryOfOrigin: string;
  
  // Autor
  author: Author;
  authorBio: string;
  
  // Publisher
  publisher: Publisher;
  
  // Enlaces internos
  internalLinks?: InternalLink[];
  
  // Tags
  tags?: string[];
}

// Tipo SIMPLIFICADO para listados
export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  mainImage: {
    alt?: string;
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
          aspectRatio: number;
        };
        lqip: string;
      };
    };
  };
  readingTime?: number;
  tags?: string[];
  category?: string;
}

// Tipo para detalle de post (el que realmente usarás)
// En src/lib/types.ts
export interface BlogPostDetail {
  _id: string;
  title: string;
  slug: string;
  canonicalUrl?: string;
  category?: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  body: SanityBody;
  faqs?: FAQ[];
  howTo?:{
  name: string;
  description?: string;
    totalTime?: string;
    estimatedCost?: {
      currency: string;
      value: number;
    };
    steps: HowToStep[];
  }
  mainImage?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  // Campos SEO básicos
  metaDescription?: string;
  metaTitle?: string;
  metaKeywords?: string;
  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  // Autor
  author?: {
    name: string;
    jobTitle?: string;
    url?: string;
  };
  // Tags
  tags?: string[];
  readingTime?: number;
  wordCount: number;
}

export interface RelatedPost {
  title: string;
  slug: string;
  mainImage?: {
    asset?: {
      url: string;
    };
  };
  summary?: string;
}

