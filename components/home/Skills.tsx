'use client';

import { motion } from 'framer-motion';
import { Code2, LayoutTemplate, Wrench } from 'lucide-react';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

const DEFAULT_GROUPS = [
  { icon: Code2, title: 'Frontend development', items: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { icon: LayoutTemplate, title: 'UI development', items: ['Responsive design', 'Component architecture', 'Design implementation', 'UI optimization'] },
  { icon: Wrench, title: 'Tools & workflow', items: ['Git', 'GitHub', 'REST API', 'Figma', 'Agile development'] },
];

export default function Skills({ s }: { s?: SiteSettingsData }) {
  const groups = s
    ? [
        { icon: Code2, title: 'Frontend development', items: s.skillsFrontend },
        { icon: LayoutTemplate, title: 'Backend development', items: s.skillsBackend },
        { icon: Wrench, title: 'Tools & workflow', items: s.skillsDevops },
      ]
    : DEFAULT_GROUPS;

  return (
    <section id="skills" className="section-shell bg-[#f7f8f6] dark:bg-[#101313]">
      <div className="container-custom">
        <div className="max-w-2xl"><p className="section-kicker">02 / Toolkit</p><h2 className="section-title mt-4">The tools behind the work.</h2><p className="section-lede">A focused stack for building products that feel simple to use and are straightforward to maintain.</p></div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {groups.map(({ icon: Icon, title, items }, index) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-[#0b0d0e]"><Icon className="text-emerald-700 dark:text-emerald-400" size={22} /><h3 className="mt-6 text-lg font-medium text-slate-950 dark:text-white">{title}</h3><div className="mt-5 flex flex-wrap gap-2">{(items ?? []).map((item) => <span key={item} className="rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">{item}</span>)}</div></motion.article>)}
        </div>
      </div>
    </section>
  );
}
