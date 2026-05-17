'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Briefcase } from 'lucide-react';

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
    // Only read window after mount — avoids SSR/client mismatch
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Sync initial state without triggering a second render before paint
    if (window.scrollY > 24) setScrolled(true);
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
      {/* ── Main bar ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="container-custom">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 transition-all duration-300 ${
              scrolled
                ? 'h-14 border border-slate-200/60 bg-white/80 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/80 dark:shadow-slate-900/30'
                : 'h-16 bg-transparent'
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 text-xl font-extrabold"
              aria-label="Home"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-xs font-black text-white shadow-md shadow-primary/30 transition-transform group-hover:scale-110">
                AL
              </span>
              <span className="gradient-text hidden sm:block">.Mumeetu</span>
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
                        className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                          active
                            ? 'text-primary'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                        }`}
                      >
                        {/* Active pill background */}
                        {active && (
                          <span className="absolute inset-0 rounded-xl bg-primary/8 dark:bg-primary/12" />
                        )}
                        <span className="relative">{link.label}</span>
                        {/* Active dot */}
                        {active && (
                          <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Hire me CTA — desktop only */}
              <Link
                href="/contact"
                className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-bold text-white shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35 md:flex"
              >
                <Briefcase size={13} />
                Hire Me
              </Link>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-primary/40 dark:hover:text-primary"
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
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 backdrop-blur-sm transition-all hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 md:hidden"
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
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Mobile drawer ── */}
      <div
        ref={drawerRef}
        className={`fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-300 dark:border-slate-700/60 dark:bg-slate-950/95 md:hidden ${
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
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      active
                        ? 'bg-primary/8 text-primary dark:bg-primary/12'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
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
        <div className="flex items-center justify-between p-4">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/25"
          >
            <Briefcase size={14} />
            Hire Me
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:text-slate-400"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
