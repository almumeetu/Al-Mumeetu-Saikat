import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Al Mumeetu Saikat, a Full-Stack Next.js Developer specialized in modern web experiences.',
};

export default function AboutPage() {
  return <AboutClient />;
}
