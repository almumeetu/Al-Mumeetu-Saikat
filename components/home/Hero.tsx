'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Github, Linkedin, Mail, Briefcase, Twitter, FileText, MapPin } from 'lucide-react';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

export default function Hero({ s }: { s: SiteSettingsData }) {
  const socials = useMemo(
    () => [
      { icon: Github, href: s.githubUrl || '#', label: 'GitHub' },
      { icon: Linkedin, href: s.linkedinUrl || '#', label: 'LinkedIn' },
      { icon: Twitter, href: s.twitterUrl || '#', label: 'Twitter' },
      { icon: Briefcase, href: s.upworkUrl || '#', label: 'Upwork' },
      { icon: Mail, href: `mailto:${s.email}`, label: 'Email' },
    ].filter((l) => l.href && l.href !== '#' && l.href !== 'mailto:'),
    [s.githubUrl, s.linkedinUrl, s.twitterUrl, s.upworkUrl, s.email]
  );

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-slate-50/70 dark:border-slate-800/70 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#0f172a_1px,transparent_1px),linear-gradient(90deg,#0f172a_1px,transparent_1px)] [background-size:64px_64px] dark:opacity-[0.06] dark:[background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]" />
      </div>

      <div className="container-custom grid min-h-[calc(100vh-5rem)] items-center gap-16 py-24 lg:grid-cols-[1.1fr,0.9fr] lg:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
            Available for select projects
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            Building digital products that earn trust and drive growth.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">
            I&apos;m <span className="font-bold text-slate-900 dark:text-white">Md Al Mumeetu Saikat</span>, a {s.heroTagline.toLowerCase()} helping ambitious teams turn complex ideas into fast, reliable, and polished web experiences.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary px-7 py-3.5">
              Start a conversation <ArrowUpRight size={17} />
            </Link>
            <Link href="/projects" className="btn-outline px-7 py-3.5">Explore selected work</Link>
            <a
              href="https://almumeetu.github.io/CV/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-3 py-3.5 text-sm font-semibold text-slate-500 transition hover:text-primary dark:text-slate-400"
            >
              <FileText size={16} /> View résumé
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-primary" /> Dhaka, Bangladesh · Remote worldwide</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> 4+ years in production</span>
          </div>

          {socials.length > 0 && (
            <div className="mt-8 flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:ml-auto"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-cyan-400/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
            <Image
              src="/images/profile-portfolio.png"
              alt="Al Mumeetu Saikat"
              width={400}
              height={400}
              className="aspect-square w-full rounded-[1.4rem] object-cover"
              priority
            />
            <div className="absolute inset-x-7 bottom-7 rounded-2xl border border-white/20 bg-slate-950/85 p-4 text-white backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Currently building</p>
                  <p className="mt-1 font-semibold">Commerce &amp; business systems</p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}