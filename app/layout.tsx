import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
	title: {
		default: 'Al Mumeetu Saikat | WordPress & Frontend Specialist',
		template: '%s | Al Mumeetu Saikat',
	},
	description:
		'Professional WordPress and frontend specialist building fast, accessible, and conversion-focused digital experiences with React and Next.js.',
	keywords: ['Al Mumeetu Saikat', 'Frontend Developer', 'WordPress', 'Next.js', 'React', 'Remote Work'],
	authors: [{ name: 'Al Mumeetu Saikat' }],
	openGraph: {
		type: 'website',
		title: 'Al Mumeetu Saikat | Portfolio',
		description: 'WordPress and frontend specialist for global brands and modern teams',
		images: ['/og-image.png'],
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				<Providers>
					{children}
					<Toaster position="top-right" />
				</Providers>
			</body>
		</html>
	);
}
