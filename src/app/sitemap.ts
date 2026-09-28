import type { MetadataRoute } from 'next';
import { getFarmacia } from '@/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const f = getFarmacia();
  return [
    {
      url: `${f.sitio.url}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
