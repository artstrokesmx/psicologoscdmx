// src/components/blog/HowToSection.tsx
import React from 'react';
import type { HowToStep } from '@/lib/types';

interface HowToSectionProps {
  title: string;
  description?: string;
  steps: HowToStep[];
}

export default function HowToSection({ title, description, steps }: HowToSectionProps) {
  // Verificación de seguridad profesional
  if (!steps || steps.length === 0) return null;

  const sectionTitle = title || "Pasos a seguir";

  // Estructura SEO profesional según Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": sectionTitle,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.stepName,
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": step.stepText
      }]
    })),
  };

  return (
    <section className="my-12 p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner">
      <h2 className="text-3xl font-bold text-blue-900 mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-6 italic">{description}</p>}
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{step.stepName}</h3>
              <p className="text-gray-600 mt-1">{step.stepText}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}