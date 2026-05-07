import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Skills from '@/components/home/Skills';
import Experience from '@/components/home/Experience';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Newsletter from '@/components/home/Newsletter';
import { getSiteSettings } from '@/lib/getSiteSettings';

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
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
