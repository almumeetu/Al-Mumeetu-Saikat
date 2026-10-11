import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',      // prevent FOIT — text visible immediately with fallback font
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#020617' },
  ],
};

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
	title: {
		default: 'Al Mumeetu Saikat | React & Next.js Software Engineer',
		template: '%s | Al Mumeetu Saikat',
	},
	description:
		'React and Next.js software engineer building reliable e-commerce platforms, business systems, and high-performance web experiences for ambitious teams.',
	keywords: ['Al Mumeetu Saikat', 'Full Stack Software Engineer', 'Software Engineer', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Remote Work'],
	authors: [{ name: 'Al Mumeetu Saikat' }],
	openGraph: {
		type: 'website',
		title: 'Al Mumeetu Saikat | Portfolio',
		description: 'React and Next.js software engineer building reliable digital products for ambitious teams.',
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Preconnect to external origins for faster resource loading */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="dns-prefetch" href="https://res.cloudinary.com" />
			</head>
			<body className={`${inter.variable} font-sans antialiased`}>
				<Providers>
					{children}
					<Toaster position="top-right" />
				</Providers>
			</body>
		</html>
	);
}
