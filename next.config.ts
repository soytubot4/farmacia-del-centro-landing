import type { NextConfig } from 'next';

/**
 * Sitio 100% estático: `next build` deja el HTML listo en `out/`.
 * No hay servidor de Node corriendo en producción — se sirve como static site.
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
