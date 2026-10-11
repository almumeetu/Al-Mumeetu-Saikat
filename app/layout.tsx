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
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://almumeetusaikat.com'),
	title: {
		default: 'Al Mumeetu Saikat | Frontend Engineer & Software Developer',
		template: '%s | Al Mumeetu Saikat',
	},
	description:
		'Frontend Engineer specializing in React.js, Next.js and modern web applications. Experienced in building scalable, responsive and user-focused digital solutions.',
	keywords: [
		'Al Mumeetu Saikat',
		'Saikat',
		'Frontend Engineer',
		'React.js Developer',
		'Software Developer',
		'Next.js Specialist',
		'TypeScript Developer',
		'Web Developer Dhaka',
	],
	authors: [{ name: 'Md Al Mumeetu Saikat', url: 'https://almumeetusaikat.com' }],
	creator: 'Md Al Mumeetu Saikat',
	publisher: 'Md Al Mumeetu Saikat',
	alternates: {
		canonical: '/',
	},
	icons: {
		icon: [
			{ url: '/icon.svg', type: 'image/svg+xml' },
			{ url: '/favicon.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
	},
	manifest: '/manifest.webmanifest',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: '/',
		siteName: 'Al Mumeetu Saikat | Portfolio',
		title: 'Al Mumeetu Saikat | Software Engineer & Full-Stack Developer',
		description: 'Software Engineer specializing in React, Next.js, TypeScript and modern scalable web applications.',
		images: [
			{
				url: '/images/saikat-headshot.png',
				width: 1080,
				height: 1080,
				alt: 'Al Mumeetu Saikat - Software Engineer & Full-Stack Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Al Mumeetu Saikat | Software Engineer & Full-Stack Developer',
		description: 'Software Engineer specializing in React, Next.js, and modern full-stack web applications.',
		creator: '@almumeetu',
		images: ['/images/saikat-headshot.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="alternate icon" href="/favicon.png" type="image/png" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
