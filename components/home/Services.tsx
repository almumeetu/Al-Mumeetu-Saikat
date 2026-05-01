'use client';

import { motion } from 'framer-motion';
import { Code, Database, Globe, Server, Palette, Search, Smartphone, Blocks } from 'lucide-react';

const services = [
  { icon: Blocks, title: 'Full-Stack Apps', desc: 'End-to-end web apps using Next.js, Vue, and Nuxt.', count: '30+ Apps' },
  { icon: Database, title: 'Database Architecture', desc: 'Robust data modeling with PostgreSQL, SQLite, and Supabase.', count: '20+ Databases' },
  { icon: Server, title: 'API & Backend', desc: 'Secure APIs, authentication, and serverless functions.', count: '40+ Integrations' },
  { icon: Code, title: 'Frontend Engineering', desc: 'Interactive, accessible UIs with React and Tailwind CSS.', count: '100+ Projects' },
  { icon: Globe, title: 'Custom WordPress', desc: 'Themes from scratch, plugin modifications, and Elementor.', count: '150+ Sites' },
  { icon: Smartphone, title: 'Responsive Design', desc: 'Mobile-first interfaces that look great on any device.', count: '200+ Projects' },
  { icon: Palette, title: 'UI/UX Implementation', desc: 'Figma to high-fidelity, pixel-perfect code conversion.', count: '80+ Projects' },
  { icon: Search, title: 'SEO & Performance', desc: 'Core Web Vitals optimization and semantic markup.', count: '50+ Audits' },
];

export default function Services() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            My Specializations
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">What I Do Best</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card group p-6 transition-all hover:-translate-y-2 hover:border-primary"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white transition-transform group-hover:scale-110">
                <service.icon size={26} />
              </div>
              <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
              <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">{service.desc}</p>
              <span className="text-xs font-semibold text-primary">{service.count}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}