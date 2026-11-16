import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Full Stack Developer`,
    short_name: site.name,
    description: site.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B0B',
    theme_color: '#FF6B00',
    icons: [
      {
        src: '/talha-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
