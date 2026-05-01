import Link from 'next/link';

const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Delivered', value: '250+' },
  { label: 'Client Satisfaction', value: '100%' },
];

export default function About() {
  return (
    <section className="py-24">
      <div className="container-custom grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            About Me
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">I build clean, fast, conversion-focused websites.</h2>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            I work across WordPress, frontend engineering, and performance-focused UI implementation. My focus is on
            delivery that feels polished, maintainable, and easy for clients to grow over time.
          </p>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            From custom WordPress themes to React interfaces, I keep the emphasis on clarity, speed, and real-world
            outcomes instead of generic templates.
          </p>
          <Link href="/about" className="btn-primary">
            Learn More
          </Link>
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