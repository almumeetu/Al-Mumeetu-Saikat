'use client';

import { motion } from 'framer-motion';
import {
  Code, Database, Globe, Server, Palette, Search,
  Smartphone, Blocks, Cpu, Layout, Shield, Zap,
  Terminal, Layers, Cloud, Mail, Wrench, Rocket,
} from 'lucide-react';
import { SiteSettingsData } from '@/lib/getSiteSettings';

const iconMap: Record<string, React.ElementType> = {
  Code, Database, Globe, Server, Palette, Search,
  Smartphone, Blocks, Cpu, Layout, Shield, Zap,
  Terminal, Layers, Cloud, Mail, Wrench, Rocket,
};

// Gradient palette cycles through cards
const GRADIENTS = [
  'from-violet-500 to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-cyan-500 to-sky-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-fuchsia-500 to-purple-500',
  'from-blue-500 to-indigo-500',
  'from-green-500 to-emerald-500',
];

const DEFAULT_SERVICES = [
  { icon: 'Blocks',      title: 'Full-Stack Apps',        desc: 'End-to-end web apps using Next.js, Vue, and Nuxt.',                    count: '30+ Apps' },
  { icon: 'Database',    title: 'Database Architecture',  desc: 'Robust data modeling with PostgreSQL, SQLite, and Supabase.',          count: '20+ Databases' },
  { icon: 'Server',      title: 'API & Backend',          desc: 'Secure APIs, authentication, and serverless functions.',               count: '40+ Integrations' },
  { icon: 'Code',        title: 'Frontend Engineering',   desc: 'Interactive, accessible UIs with React and Tailwind CSS.',             count: '100+ Projects' },
  { icon: 'Globe',       title: 'Custom WordPress',       desc: 'Themes from scratch, plugin modifications, and Elementor.',           count: '150+ Sites' },
  { icon: 'Smartphone',  title: 'Responsive Design',      desc: 'Mobile-first interfaces that look great on any device.',              count: '200+ Projects' },
  { icon: 'Palette',     title: 'UI/UX Implementation',   desc: 'Figma to high-fidelity, pixel-perfect code conversion.',              count: '80+ Projects' },
  { icon: 'Search',      title: 'SEO & Performance',      desc: 'Core Web Vitals optimization and semantic markup.',                   count: '50+ Audits' },
];

export default function Services({ s }: { s: SiteSettingsData }) {
  // Use DB services if available and non-empty, otherwise fall back to defaults
  const services = (s.services && s.services.length > 0) ? s.services : DEFAULT_SERVICES;

  return (
    <section className="relative overflow-hidden bg-slate-50 py-32 dark:bg-slate-900/50" id="services">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-bold tracking-wide text-primary backdrop-blur-md"
          >
            My Specializations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            What I Do Best
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400"
          >
            From concept to deployment — I cover the full spectrum of modern web development, delivering scalable and high-performance solutions.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Blocks;
            const gradient = GRADIENTS[index % GRADIENTS.length];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:ring-primary/30 dark:bg-slate-800/80 dark:ring-white/10 dark:hover:ring-primary/40 backdrop-blur-xl z-10"
              >
                {/* Glowing background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />

                <div className="relative z-10 flex flex-1 flex-col">
                  {/* Icon */}
                  <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                    <IconComponent size={28} className="text-white" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  
                  <p className="mb-8 flex-1 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.desc}
                  </p>

                  <div className="mt-auto pt-4">
                    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        {service.count}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
