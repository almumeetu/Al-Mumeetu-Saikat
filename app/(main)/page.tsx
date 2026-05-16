import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Skills from '@/components/home/Skills';
import Experience from '@/components/home/Experience';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Newsletter from '@/components/home/Newsletter';
import { getSiteSettings } from '@/lib/getSiteSettings';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Al Mumeetu Saikat | Full-Stack Developer & WordPress Specialist',
  description: 'Portfolio of Md Al Mumeetu Saikat, a Full-Stack Engineer with deep expertise in Next.js, React, and modern backend stacks like PostgreSQL and Supabase.',
  alternates: {
    canonical: '/',
  }
};

export default async function HomePage() {
  const settings = await getSiteSettings();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Md Al Mumeetu Saikat',
    url: settings.githubUrl ? settings.githubUrl.replace('github.com/', '') : 'https://almumeetusaikat.com',
    jobTitle: 'Full-Stack Engineer',
    description: 'I build scalable, fast, and modern web applications with Next.js and React.',
    sameAs: [
      settings.githubUrl,
      settings.linkedinUrl,
      settings.twitterUrl,
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero s={settings} />
      <About s={settings} />
      <Services s={settings} />
      <Skills s={settings} />
      <Experience s={settings} />
      <FeaturedProjects />
      <Newsletter />
    </>
  );
}
