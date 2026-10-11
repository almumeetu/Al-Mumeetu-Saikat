import Link from 'next/link';
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Briefcase,
} from 'lucide-react';
import { getSiteSettings } from '@/lib/getSiteSettings';
import { DhakaTimeDisplay, FooterBackToTop } from './FooterActions';
import LogoMark from '@/components/shared/LogoMark';

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

export default async function Footer() {
  const s = await getSiteSettings();
  const currentYear = new Date().getFullYear();
  const email = s.email || 'almumeetu@gmail.com';

  const socials = [
    { icon: Github,    href: s.githubUrl,                    label: 'GitHub' },
    { icon: Linkedin,  href: s.linkedinUrl,                  label: 'LinkedIn' },
    { icon: Twitter,   href: s.twitterUrl,                   label: 'Twitter' },
    { icon: Briefcase, href: s.upworkUrl,                    label: 'Upwork' },
    { icon: Mail,      href: email ? `mailto:${email}` : '', label: 'Email' },
  ].filter((l) => l.href && l.href !== '#');

  return (
    <footer className="border-t border-slate-200/80 bg-[#fafbfa]/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#070a0e]/80">
      <div className="container-custom py-8 sm:py-9">
        {/* Main Clean Row: Identity, Nav, Socials */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Identity & Status */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Home">
              <LogoMark size={32} />
              <span className="text-base font-medium tracking-tight text-slate-950 dark:text-white">
                Al-Mumeetu{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                  Saikat
                </span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </span>
                Available for hire
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {s.heroTagline
                  ? s.heroTagline.replace(/\s*\|\s*/g, ' · ')
                  : 'Software Engineer · Full-Stack & Frontend Developer'}
              </span>
            </div>
          </div>

          {/* Clean Horizontal Navigation */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Compact Social Icon Buttons */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                title={label}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-500 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-700 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-slate-200/60 pt-5 text-xs text-slate-500 sm:flex-row dark:border-slate-800/60 dark:text-slate-400">
          <p className="text-center sm:text-left">
            © {currentYear}{' '}
            <span className="font-medium text-slate-800 dark:text-slate-200">Md Al Mumeetu Saikat</span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <DhakaTimeDisplay />
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <FooterBackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
