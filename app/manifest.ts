import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Al Mumeetu Saikat | Software Engineer & Full-Stack Developer',
    short_name: 'Saikat Portfolio',
    description: 'Software Engineer specializing in React, Next.js, and modern full-stack web applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070a0e',
    theme_color: '#070a0e',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
