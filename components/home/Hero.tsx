'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, MapPin } from 'lucide-react';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

export default function Hero({ s }: { s: SiteSettingsData }) {
  const email = s.email || 'almumeetu@gmail.com';

  return (
    <section className="hero-grid relative overflow-hidden border-b border-slate-200/80 bg-[#f7f8f6] pt-32 pb-20 dark:border-slate-800 dark:bg-[#0b0d0e] sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="container-custom relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 flex items-center text-xs font-medium">
              <span className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
                Available for select opportunities
              </span>
            </div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-slate-500 sm:text-sm dark:text-slate-400">Hello, I&apos;m</p>
            <h1 className="max-w-3xl text-3xl font-medium tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl md:text-5xl lg:text-[3.85rem] lg:leading-[1.05]">
              Al Mumeetu <span className="text-emerald-700 dark:text-emerald-400">Saikat</span>
            </h1>
            <h2 className="mt-5 max-w-2xl text-base font-medium leading-snug text-slate-800 dark:text-slate-200 sm:text-lg md:text-xl">
              Frontend Engineer <span className="mx-1 text-slate-300 dark:text-slate-600">/</span> Next.js Specialist <span className="mx-1 text-slate-300 dark:text-slate-600">/</span> Software Developer
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
              I build scalable, responsive and high-performance web applications using modern frontend technologies. Experienced in developing real-world products, collaborating with clients, and delivering production-ready solutions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#projects" className="btn-primary group w-full sm:w-auto justify-center">
                <span>View my projects</span>
                <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="/cv/Al-Mumeetu-Saikat-CV.pdf" download className="btn-outline w-full sm:w-auto justify-center">
                <Download size={16} /> <span>Download resume</span>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a href={`mailto:${email}`} className="text-xs sm:text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400">{email}</a>
              <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <a aria-label="GitHub" href={s.githubUrl || 'https://github.com/almumeetu'} target="_blank" rel="noreferrer" className="text-slate-500 transition hover:text-slate-950 dark:hover:text-white"><Github size={18} /></a>
              <a aria-label="LinkedIn" href={s.linkedinUrl || 'https://www.linkedin.com/in/almumeetu/'} target="_blank" rel="noreferrer" className="text-slate-500 transition hover:text-slate-950 dark:hover:text-white"><Linkedin size={18} /></a>
              <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <MapPin size={13} className="text-emerald-700 dark:text-emerald-400 shrink-0" />
                Dhaka, Bangladesh · Remote worldwide
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] border border-emerald-700/15 dark:border-emerald-400/15" />
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-200 dark:bg-slate-800">
              <Image src="/images/saikat-headshot.png" alt="Al Mumeetu Saikat, Frontend Engineer" fill priority sizes="(max-width: 1024px) 80vw, 35vw" className="object-cover grayscale-[12%]" />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-slate-950/75 p-4 text-white backdrop-blur-md">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">Currently building</p>
                <p className="mt-1 text-sm font-medium">Production interfaces at Softzino Technologies</p>
              </div>
            </div>
            <a href="#about" aria-label="Scroll to about section" className="absolute -bottom-7 -left-7 hidden h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:-rotate-12 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:flex"><ArrowDownRight size={21} /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
