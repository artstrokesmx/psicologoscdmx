import React from 'react';
import Image from 'next/image';
import { sanityClient } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
// Importamos el tipo oficial de Sanity para fuentes de imagen
import type { SanityImageSource } from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

// Ahora la función ya no usa 'any'
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface SanityImageProps {
  value: {
    // Aceptamos el objeto que viene de tu GROQ (ya expandido)
    asset: {
      _id?: string;
      url?: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
    caption?: string;
  };
}

export default function SanityImage({ value }: SanityImageProps) {
  // Verificamos qué tenemos disponible para generar la URL
  const source = value.asset?.url || value.asset?._id;

  if (!source) return null;

  // Intentamos obtener dimensiones reales o usamos un estándar
  const width = value.asset.metadata?.dimensions?.width || 1200;
  const height = value.asset.metadata?.dimensions?.height || 675;

  return (
    <figure className="my-10 mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-100">
        <Image
          src={urlFor(source).width(1200).auto('format').url()}
          alt={value.alt || 'Imagen de apoyo'}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          // Importante para GitHub Pages (output: export)
          unoptimized={true} 
        />
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}