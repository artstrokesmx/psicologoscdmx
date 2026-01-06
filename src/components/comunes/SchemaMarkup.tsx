import React from 'react';

interface SchemaProps {
  type: 'Organization' | 'BlogPosting' | 'LocalBusiness' | 'FAQPage' | 'HowTo' | 'BreadcrumbList' | 'WebSite';
  schema: Record<string, unknown>; 
}


const SchemaMarkup: React.FC<SchemaProps> = ({ type, schema }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    ...schema,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
};

export default SchemaMarkup;