'use client';

import { Share2, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function BotonesCompartir({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    // Si el navegador es un celular (soporta Web Share API)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Te recomiendo este artículo de Psicólogos CDMX: ${title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error compartiendo:', err);
      }
    } else {
      // Si es PC, simplemente copiamos el link y avisamos
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
  <div className="flex flex-wrap items-center gap-4 my-8 p-4 border-y border-gray-100">
    <span className="text-sm font-medium text-gray-500">¿Te sirvió? Compártelo:</span>
    
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all shadow-sm ${
        copied 
          ? 'bg-green-600 text-white' 
          : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white' 
      }`}
    >
      
      {copied ? <LinkIcon size={16} /> : <Share2 size={16} />}
      
      
      {copied ? '¡Enlace copiado!' : 'Compartir artículo'}
    </button>
  </div>
);
}