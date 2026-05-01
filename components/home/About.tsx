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
          <h2 className="text-4xl font-extrabold md:text-5xl">I build scalable, fast, and modern web applications.</h2>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            I am a Full-Stack Engineer with deep expertise in modern JavaScript frameworks like <strong>Next.js</strong> and <strong>Vue/Nuxt</strong>, backed by robust databases like <strong>PostgreSQL</strong>, <strong>SQLite</strong>, and <strong>Supabase</strong>. 
          </p>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Alongside my full-stack capabilities, I also have extensive experience delivering custom <strong>WordPress</strong> solutions. My focus is always on creating polished, maintainable, and high-performance products that drive real-world outcomes.
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