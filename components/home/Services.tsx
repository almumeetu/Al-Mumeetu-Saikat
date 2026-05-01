'use client';

import { motion } from 'framer-motion';
import { Code, Figma, Zap, Globe, FileCode, Palette, Layout, Search } from 'lucide-react';

const services = [
  { icon: Code, title: 'Frontend Development', desc: 'Expert in HTML5, CSS3, JavaScript, SCSS, responsive design.', count: '150+ Projects' },
  { icon: Figma, title: 'PSD / Figma to HTML', desc: 'Convert designs into responsive, W3C-validated HTML.', count: '60+ Projects' },
  { icon: Zap, title: 'Elementor Building', desc: 'Modern websites with Elementor Pro, custom widgets.', count: '200+ Projects' },
  { icon: Globe, title: 'Custom WordPress Themes', desc: 'WordPress themes from scratch with PHP & hooks.', count: '10+ Themes' },
  { icon: FileCode, title: 'JavaScript Development', desc: 'Vanilla JS: DOM, ES6, animations, interactive UI.', count: '20+ Projects' },
  { icon: Palette, title: 'SASS / SCSS Styling', desc: 'Efficient SCSS with variables, mixins, modular code.', count: '40+ Projects' },
  { icon: Layout, title: 'Bootstrap Development', desc: 'Mobile-first websites with Bootstrap 4/5.', count: '50+ Projects' },
  { icon: Search, title: 'SEO & Optimization', desc: 'On-page SEO, page speed, semantic markup.', count: '10+ Projects' },
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