import type { MetadataRoute } from 'next';
import { getFarmacia } from '@/data';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const f = getFarmacia();
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${f.sitio.url}/sitemap.xml`,
  };
}
