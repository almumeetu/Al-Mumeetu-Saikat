import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact | Al Mumeetu Saikat',
  description:
    'Get in touch with Md Al Mumeetu Saikat for frontend engineering, enterprise commerce solutions, or technical advisory.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Al Mumeetu Saikat',
    description:
      'Get in touch with Md Al Mumeetu Saikat for frontend engineering, contracts, and full-time roles.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
