import Link from 'next/link';

const highlights = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Delivered', value: '250+' },
  { label: 'Happy Clients', value: '100+' },
];

export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="container-custom space-y-12">
        <div className="max-w-3xl space-y-5">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            About Me
          </span>
          <h1 className="text-4xl font-extrabold md:text-6xl">Focused on practical design and frontend delivery.</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            I work on WordPress builds, frontend development, and conversion-oriented website experiences for clients
            around the world. The goal is to keep the work fast, maintainable, and easy for teams to evolve.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="card p-6 text-center">
              <div className="text-4xl font-extrabold gradient-text">{item.value}</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="card space-y-4 p-8">
            <h2 className="text-2xl font-bold">How I work</h2>
            <p className="text-slate-600 dark:text-slate-400">
              I start with structure and clarity, then layer in visual polish and motion where it improves the product
              rather than distracting from it. The emphasis is always on performance, accessibility, and conversion.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              If you need a landing page, WordPress build, or a frontend implementation with a clean handoff, I can
              help ship it.
            </p>
          </div>

          <div className="card space-y-4 p-8">
            <h2 className="text-2xl font-bold">Availability</h2>
            <p className="text-slate-600 dark:text-slate-400">Open to freelance projects, collaborations, and long-term work.</p>
            <Link href="/contact" className="btn-primary">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}