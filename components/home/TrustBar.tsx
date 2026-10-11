'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Globe2, ShieldCheck } from 'lucide-react';

const signals = [
  { icon: Code2, value: '120+', label: 'responsive websites delivered' },
  { icon: Globe2, value: '4+', label: 'years building for global clients' },
  { icon: ShieldCheck, value: 'Production-ready', label: 'clean, maintainable delivery' },
];

export default function TrustBar() {
  return (
    <section className="relative z-10 -mt-10 pb-6">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-3"
        >
          {signals.map(({ icon: Icon, value, label }, index) => (
            <div
              key={value}
              className={`flex items-center gap-4 px-6 py-5 ${index > 0 ? 'border-t border-slate-100 dark:border-slate-800 sm:border-l sm:border-t-0' : ''}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={19} />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{value}</p>
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">{label}</p>
              </div>
              <CheckCircle2 className="ml-auto hidden h-4 w-4 text-emerald-500 sm:block" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
