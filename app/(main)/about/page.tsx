import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About | Al Mumeetu Saikat',
  description:
    'Learn about Md Al Mumeetu Saikat, a frontend engineer and React/Next.js specialist building dependable web products and scalable software solutions.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Al Mumeetu Saikat',
    description:
      'Learn about Md Al Mumeetu Saikat, a frontend engineer and React/Next.js specialist.',
    url: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
