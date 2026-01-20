// src/components/blog/FaqSection.tsx
import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  // 1. Generamos el objeto JSON-LD para Google
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   "mainEntity": faqs.map((faq) => ({
  //     "@type": "Question",
  //     "name": faq.question,
  //     "acceptedAnswer": {
  //       "@type": "Answer",
  //       "text": faq.answer,
  //     },
  //   })),
  // };

  return (
    <section className="my-12 border-t pt-8">
      {/* Script inyectado para SEO (Invisible para el usuario) */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}

      {/* UI Visible para el usuario */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Preguntas Frecuentes</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}