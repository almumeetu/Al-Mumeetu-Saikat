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
  title: 'Al Mumeetu Saikat | Frontend Engineer & Software Developer',
  description: 'Frontend Engineer specializing in React.js, Next.js and modern web applications. Experienced in building scalable, responsive and user-focused digital solutions.',
  alternates: {
    canonical: '/',
  }
};


export const revalidate = 60;

export default async function HomePage() {
  const settings = await getSiteSettings();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://almumeetusaikat.com';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Md Al Mumeetu Saikat',
      alternateName: 'Al Mumeetu Saikat',
      url: siteUrl,
      image: `${siteUrl}/images/saikat-headshot.png`,
      jobTitle: 'Frontend Engineer & Software Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Softzino Technologies',
      },
      description: 'Frontend Engineer specializing in React.js, Next.js and modern web applications.',
      sameAs: [
        settings.githubUrl || 'https://github.com/almumeetu',
        settings.linkedinUrl || 'https://www.linkedin.com/in/almumeetu/',
        settings.twitterUrl && settings.twitterUrl !== '#' ? settings.twitterUrl : null,
      ].filter(Boolean),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Al Mumeetu Saikat | Portfolio',
      url: siteUrl,
      description: 'Official portfolio of Al Mumeetu Saikat - Frontend Engineer and Software Developer.',
      publisher: {
        '@type': 'Person',
        name: 'Md Al Mumeetu Saikat',
      },
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
      <Services />
      <Skills s={settings} />
      <Experience s={settings} />
      <FeaturedProjects />
      <Newsletter s={settings} />
    </>
  );
}
