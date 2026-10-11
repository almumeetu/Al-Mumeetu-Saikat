'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

export default function About({ s }: { s: SiteSettingsData }) {
  return (
    <section id="about" className="section-shell bg-white dark:bg-[#0b0d0e]">
      <div className="container-custom grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="relative">
          <div className="lg:sticky lg:top-32">
            <p className="section-kicker">01 / About me</p>
            <h2 className="section-title mt-4">Turning product ideas into dependable interfaces.</h2>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
          <p className="text-xl font-medium leading-8 text-slate-900 dark:text-white sm:text-2xl">{s.aboutBio || 'I am a frontend-focused software developer specializing in React, Next.js, and TypeScript.'}</p>
          <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{s.aboutBio2 || 'I translate requirements into scalable product features and production-ready delivery while keeping communication clear for both technical and non-technical teams.'}</p>
          <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800">
            {['Component-driven architecture', 'Accessible, responsive UI', 'Practical performance budgets', 'Clear client communication'].map((item) => <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><Check size={12} /></span>{item}</div>)}
          </div>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:gap-3 dark:text-emerald-400">More about my approach <ArrowUpRight size={16} /></Link>
        </motion.div>
      </div>
    </section>
  );
}
