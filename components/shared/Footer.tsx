import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, Briefcase } from 'lucide-react';
import { getSiteSettings } from '@/lib/getSiteSettings';

const footerLinks = [
  { href: '/about',    label: 'About' },
  { href: '/#services',label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

export default async function Footer() {
  const s = await getSiteSettings();

  const socials = [
    { icon: Github,   href: s.githubUrl,   label: 'GitHub' },
    { icon: Linkedin, href: s.linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter,  href: s.twitterUrl,  label: 'Twitter' },
    { icon: Briefcase,href: s.upworkUrl,   label: 'Upwork' },
    { icon: Mail,     href: s.email ? `mailto:${s.email}` : '', label: 'Email' },
  ].filter((l) => l.href && l.href !== '#');

  return (
    <footer className="border-t border-slate-200 bg-white/80 py-12 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-custom grid gap-8 md:grid-cols-[2fr,1fr,1fr]">
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-extrabold gradient-text">
            AL.Mumeetu
          </Link>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            {s.heroBio || 'Building fast, polished web experiences for global brands, startups, and modern teams.'}
          </p>
          {socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-1 hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>{s.email}</p>
            <p>Remote / Global</p>
            <p>Available for freelance &amp; contract work</p>
          </div>
        </div>
      </div>

      <div className="container-custom mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Al Mumeetu Saikat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
