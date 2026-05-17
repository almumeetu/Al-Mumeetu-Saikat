import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Al Mumeetu Saikat | Portfolio',
    short_name: 'Saikat',
    description: 'Full Stack Software Engineer building high-performance, scalable, and modern web applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // You should eventually add proper icon sizes here (e.g. 192x192, 512x512)
    ],
  };
}
