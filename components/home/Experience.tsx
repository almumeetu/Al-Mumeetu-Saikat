'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Calendar } from 'lucide-react';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

interface ExperienceItem {
  date: string;
  role: string;
  company: string;
  text: string;
  points?: string[];
  tags: string[];
}

const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  {
    date: 'Jan 2024 — Present',
    role: 'Associate Software Developer',
    company: 'Softzino Technologies · Dhaka, Bangladesh',
    text: 'Develop and maintain production e-commerce and Point-of-Sale interfaces using Next.js, React, and TypeScript with focus on stability, performance, and client satisfaction.',
    points: [
      'Develop and maintain production e-commerce and Point-of-Sale interfaces using Next.js, React, and TypeScript.',
      'Build reusable responsive components, commerce workflows, and client-side interactions from product requirements and designs.',
      'Integrate REST APIs and relational data using Prisma ORM, PostgreSQL, and Supabase, including inventory-related operations.',
      'Collaborate directly with clients and stakeholders to gather requirements, discuss solutions, manage feedback, and deliver production-ready features.',
      'Use Docker, Git, code review, and collaborative Agile workflows to deliver production features, fixes, and improvements.',
      'Deliver tailored WordPress/WooCommerce solutions for international clients, including custom Elementor widgets and frontend fixes.',
    ],
    tags: [
      'Next.js',
      'React',
      'TypeScript',
      'Prisma ORM',
      'PostgreSQL',
      'Supabase',
      'Docker',
      'WordPress',
      'WooCommerce',
      'Tailwind CSS',
    ],
  },
  {
    date: 'Nov 2022 — Dec 2023',
    role: 'Frontend Developer / Web Designer',
    company: 'WebDev Software Solutions',
    text: 'Delivered 120+ responsive, cross-browser websites and client portals while customizing WordPress and WooCommerce experiences for international businesses.',
    points: [
      'Engineered responsive, cross-browser web interfaces and client portals adhering to performance and accessibility standards.',
      'Customized WordPress themes and WooCommerce stores, integrating custom features, plugins, and third-party APIs.',
      'Collaborated within Git/GitHub sprint teams to deliver client deliverables on schedule.',
    ],
    tags: ['JavaScript', 'HTML5', 'CSS3', 'SCSS', 'WordPress', 'WooCommerce', 'Bootstrap'],
  },
  {
    date: 'Aug 2022 — Oct 2022',
    role: 'Web Designer Intern',
    company: 'Bdevs · Dhaka, Bangladesh',
    text: 'Worked with senior engineers on responsive marketing layouts, reusable UI modules, device breakpoints, and cross-browser quality.',
    points: [
      'Built responsive layout modules and interactive landing pages across varying device viewports.',
      'Conducted cross-browser compatibility testing and resolved UI rendering discrepancies.',
      'Translated Figma designs into clean, semantic markup and interactive components.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Figma'],
  },
];

function parseExperience(text?: string, fallbackPoints?: string[]) {
  if (!text) return { summary: '', points: fallbackPoints || [] };
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length <= 1 && fallbackPoints && fallbackPoints.length > 0) {
    return { summary: text, points: fallbackPoints };
  }
  const points: string[] = [];
  let summary = '';
  lines.forEach((line) => {
    if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
      points.push(line.replace(/^[•\-\*]\s*/, ''));
    } else if (!summary) {
      summary = line;
    } else {
      points.push(line);
    }
  });
  return {
    summary: summary || text,
    points: points.length > 0 ? points : (fallbackPoints || []),
  };
}

export default function Experience({ s }: { s?: SiteSettingsData }) {
  const experiences: ExperienceItem[] =
    s?.experience && s.experience.length > 0
      ? s.experience.map((item, idx) => {
          const fallback = DEFAULT_EXPERIENCE[idx] || DEFAULT_EXPERIENCE[0];
          const parsed = parseExperience(item.description, fallback?.points);
          return {
            date: item.year || fallback.date || 'Recent',
            role: item.title || fallback.role || 'Software Engineer',
            company: item.company || fallback.company || 'Technology Company',
            text: parsed.summary || fallback.text,
            points: parsed.points && parsed.points.length > 0 ? parsed.points : fallback.points,
            tags: fallback.tags || [
              'React',
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
            ],
          };
        })
      : DEFAULT_EXPERIENCE;

  return (
    <section id="experience" className="section-shell bg-[#f7f8f6] dark:bg-[#101313]">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Sticky Left Column */}
          <div className="relative">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div>
                <p className="section-kicker">04 / Experience</p>
                <h2 className="section-title mt-4">
                  Learning by shipping in the real world.
                </h2>
                <p className="section-lede">
                  A track record of working close to products, clients, and the engineering details that make software reliable and trustworthy.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="/cv/Al-Mumeetu-Saikat-CV.pdf"
                  download
                  className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:gap-3 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  <span>View full resume</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Cards */}
          <div className="space-y-4">
            {experiences.map((item, index) => {
              const { summary, points } = parseExperience(item.text, item.points);
              return (
                <motion.article
                  key={`${item.company}-${index}`}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-8 dark:border-slate-800 dark:bg-[#0b0d0e] dark:hover:border-slate-700"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <Building2
                        size={20}
                        className="mt-1 shrink-0 text-emerald-700 transition-colors group-hover:text-emerald-600 dark:text-emerald-400"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-slate-950 dark:text-white">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                          {item.company}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800/80 dark:text-slate-400">
                      <Calendar size={13} /> {item.date}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {summary}
                  </p>

                  {points && points.length > 0 && (
                    <div className="mt-4 space-y-2.5">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Key Responsibilities & Deliverables
                      </p>
                      <ul className="space-y-2">
                        {points.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5 dark:border-slate-800/80">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-slate-200 bg-slate-50/50 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-emerald-600/60 dark:hover:text-emerald-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
