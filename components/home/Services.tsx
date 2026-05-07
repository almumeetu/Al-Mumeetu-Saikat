'use client';

import { motion } from 'framer-motion';
import { 
  Code, Database, Globe, Server, Palette, Search, Smartphone, Blocks, 
  Cpu, Layout, Shield, Zap, Terminal, Layers, Cloud, Mail
} from 'lucide-react';
import { SiteSettingsData } from '@/lib/getSiteSettings';

const iconMap: Record<string, any> = {
  Code, Database, Globe, Server, Palette, Search, Smartphone, Blocks,
  Cpu, Layout, Shield, Zap, Terminal, Layers, Cloud, Mail
};

export default function Services({ s }: { s: SiteSettingsData }) {
  const services = s.services || [];

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
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Blocks;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card group p-6 transition-all hover:-translate-y-2 hover:border-primary"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white transition-transform group-hover:scale-110">
                  <IconComponent size={26} />
                </div>
                <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
                <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">{service.desc}</p>
                <span className="text-xs font-semibold text-primary">{service.count}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}