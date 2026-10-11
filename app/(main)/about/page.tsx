import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Md Al Mumeetu Saikat, a React and Next.js software engineer focused on reliable digital products and business outcomes.',
};

export default function AboutPage() {
  return <AboutClient />;
}
