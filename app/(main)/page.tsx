import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Skills from '@/components/home/Skills';
import Experience from '@/components/home/Experience';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
	return (
		<>
			<Hero />
			<About />
			<Services />
			<Skills />
			<Experience />
			<FeaturedProjects />
			<Newsletter />
		</>
	);
}
