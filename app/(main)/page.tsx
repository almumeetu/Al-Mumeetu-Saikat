import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Skills from '@/components/home/Skills';
import Experience from '@/components/home/Experience';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Newsletter from '@/components/home/Newsletter';
import { getSiteSettings } from '@/lib/getSiteSettings';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Al Mumeetu Saikat | React & Next.js Software Engineer',
  description: 'Md Al Mumeetu Saikat is a React and Next.js software engineer building reliable e-commerce platforms, business systems, and high-performance web experiences.',
  alternates: {
    canonical: '/',
  }
};


export default async function HomePage() {
  const settings = await getSiteSettings();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Md Al Mumeetu Saikat',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://almumeetusaikat.com',
      jobTitle: 'Full-Stack Engineer',
      description: 'I build scalable, fast, and modern web applications with Next.js and React.',
      sameAs: [
        settings.githubUrl,
        settings.linkedinUrl,
        settings.twitterUrl,
      ].filter(Boolean),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Al Mumeetu Saikat | Portfolio',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://almumeetusaikat.com',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_SITE_URL || 'https://almumeetusaikat.com',
        },
      ],
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero s={settings} />
      <TrustBar />
      <About s={settings} />
      <Services s={settings} />
      <Skills s={settings} />
      <Experience s={settings} />
      <FeaturedProjects />
      <Newsletter />
    </>
  );
}
