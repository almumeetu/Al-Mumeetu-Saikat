import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import BackToTop from '@/components/shared/BackToTop';
import Preloader from '@/components/shared/Preloader';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Preloader />
			<Navbar />
			<main className="pt-20">{children}</main>
			<Footer />
			<BackToTop />
		</>
	);
}
