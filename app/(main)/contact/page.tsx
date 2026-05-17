import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Al Mumeetu Saikat for freelance, contract, or full-time opportunities.',
};

export default function ContactPage() {
  return <ContactClient />;
}
