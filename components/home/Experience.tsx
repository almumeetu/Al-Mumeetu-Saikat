import type { SiteSettingsData } from '@/lib/getSiteSettings';

export default function Experience({ s }: { s: SiteSettingsData }) {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Experience
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">Career Timeline</h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-5">
          {(s.experience ?? []).map((item) => (
            <div
              key={item.year + item.title}
              className="card grid gap-4 p-6 md:grid-cols-[180px,1fr] md:items-start"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {item.year}
              </div>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}