import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // Solo aplicar basePath en producción
  basePath: isProd ? '/psicologoscdmx' : '',
  assetPrefix: isProd ? '/psicologoscdmx/' : '',
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  trailingSlash: true, // ESTO es lo que evita los 404 en GitHub Pages
  
  reactCompiler: true,
};

export default nextConfig;