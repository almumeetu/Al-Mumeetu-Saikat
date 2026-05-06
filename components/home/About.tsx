'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <Image
                src="/images/portfolio.jpg"
                alt="Portfolio showcase"
                width={600}
                height={400}
                className="relative h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {s.aboutBio}
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {s.aboutBio2}
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
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