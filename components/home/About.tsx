'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

const STAT_ICONS = ['📅', '🚀', '⭐'] as const;
const STAT_LABELS = ['Years Experience', 'Projects Delivered', 'Client Satisfaction'] as const;

export default function About({ s }: { s: SiteSettingsData }) {
  const stats = useMemo(
    () => [
      { label: STAT_LABELS[0], value: s.statYearsExp, icon: STAT_ICONS[0] },
      { label: STAT_LABELS[1], value: s.statProjects, icon: STAT_ICONS[1] },
      { label: STAT_LABELS[2], value: s.statSatisfaction, icon: STAT_ICONS[2] },
    ],
    [s.statYearsExp, s.statProjects, s.statSatisfaction]
  );

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            About Me
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-extrabold md:text-5xl"
          >
            {s.aboutHeadline}
          </motion.h2>
        </div>
        <div className="mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 md:p-12 shadow-xl shadow-slate-200/20 ring-1 ring-slate-900/5 dark:bg-slate-800/50 dark:shadow-none dark:ring-white/10 backdrop-blur-xl">
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 text-[12rem] leading-none text-primary/5 font-serif select-none pointer-events-none">
                "
              </div>
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-[80px] pointer-events-none" />

              <div className="relative z-10 space-y-8 text-left">
                <p className="text-xl md:text-3xl font-bold leading-snug text-slate-800 dark:text-white">
                  {s.aboutBio}
                </p>
                
                <div className="flex items-center gap-4 opacity-80">
                  <div className="h-px w-16 bg-gradient-to-r from-primary to-secondary" />
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                </div>
                
                <p className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                  {s.aboutBio2}
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
                >
                  <div className="absolute -right-4 -top-4 text-6xl opacity-10">
                    {stat.icon}
                  </div>
                  <div className="relative">
                    <div className="text-3xl font-extrabold gradient-text">{stat.value}</div>
                    <div className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <Link href="/about" className="inline-flex items-center gap-2 btn-primary">
                Learn More
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}