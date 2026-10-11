'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Briefcase } from 'lucide-react';

import LogoMark from '@/components/shared/LogoMark';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme }   = useTheme();
  const pathname              = usePathname();
  const drawerRef             = useRef<HTMLDivElement>(null);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (window.scrollY > 15) setScrolled(true);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── hydration guard for theme ── */
  useEffect(() => { setMounted(true); }, []);

  /* ── close drawer on route change ── */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* ── trap focus / close on outside click ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  /* ── lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ── Main bar (seamless sticky, no white border) ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? 'bg-white/80 py-2.5 shadow-sm shadow-slate-900/[0.04] backdrop-blur-xl dark:bg-[#070a0e]/80 dark:shadow-black/30'
            : 'bg-transparent py-3.5 sm:py-4.5'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-12 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2.5"
              aria-label="Al Mumeetu Saikat Home"
            >
              <LogoMark size={34} />
              <div className="flex flex-col">
                <span className="text-sm font-medium tracking-tight text-slate-950 dark:text-white sm:text-base leading-tight">
                  Al-Mumeetu{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                    Saikat
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {links.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          active
                            ? 'text-emerald-800 dark:text-emerald-400'
                            : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100'
                        }`}
                      >
                        {/* Active pill background */}
                        {active && (
                          <span className="absolute inset-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/50" />
                        )}
                        <span className="relative">{link.label}</span>
                        {/* Active dot */}
                        {active && (
                          <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* CV Download button */}
              <a
                href="/cv/Al-Mumeetu-Saikat-CV.pdf"
                download="Al-Mumeetu-Saikat-CV.pdf"
                className="hidden items-center gap-1.5 rounded-xl border border-emerald-700/50 bg-emerald-50/70 px-3.5 py-2 text-xs font-medium text-emerald-900 transition hover:bg-emerald-100 dark:border-emerald-700/50 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/60 sm:flex"
                title="Download Al-Mumeetu Saikat Official CV"
              >
                <span>CV (PDF)</span>
              </a>

              {/* Hire me CTA */}
              <Link
                href="/contact"
                className="hidden items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-xs transition hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 md:flex"
              >
                <Briefcase size={13} />
                Hire Me
              </Link>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-50/10 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
                >
                  {theme === 'dark' ? (
                    <Sun size={16} strokeWidth={2} />
                  ) : (
                    <Moon size={16} strokeWidth={2} />
                  )}
                </button>
              )}

              {/* Hamburger — mobile */}
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400 md:hidden"
              >
                <span
                  className={`transition-transform duration-200 ${open ? 'rotate-90 scale-90' : ''}`}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer backdrop ── */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Mobile drawer ── */}
      <div
        ref={drawerRef}
        className={`fixed inset-x-4 top-[4.25rem] z-50 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-900/20 backdrop-blur-2xl transition-all duration-300 dark:border-slate-800/80 dark:bg-[#070a0e]/95 md:hidden ${
          open
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="p-3">
          <ul className="space-y-1">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      active
                        ? 'bg-emerald-50/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-slate-100 dark:border-slate-800" />

        {/* Bottom row */}
        <div className="flex flex-col gap-2.5 p-4">
          <div className="flex items-center gap-2">
            <a
              href="/cv/Al-Mumeetu-Saikat-CV.pdf"
              download="Al-Mumeetu-Saikat-CV.pdf"
              onClick={() => setOpen(false)}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-emerald-600/30 bg-emerald-50/70 py-2.5 text-xs font-medium text-emerald-900 transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              CV (PDF)
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-medium text-white shadow-xs transition hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              <Briefcase size={14} />
              Hire Me
            </Link>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              type="button"
              aria-label="Toggle dark mode"
              className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/60 px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800/80"
            >
              <span>Color Theme</span>
              <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
