import Link from 'next/link';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

export default function About({ s }: { s: SiteSettingsData }) {
  const stats = [
    { label: 'Years Experience', value: s.statYearsExp },
    { label: 'Projects Delivered', value: s.statProjects },
    { label: 'Client Satisfaction', value: s.statSatisfaction },
  ];

  return (
    <section className="py-24">
      <div className="container-custom grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            About Me
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">{s.aboutHeadline}</h2>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">{s.aboutBio}</p>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">{s.aboutBio2}</p>
          <Link href="/about" className="btn-primary">Learn More</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-6">
              <div className="text-4xl font-extrabold gradient-text">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}