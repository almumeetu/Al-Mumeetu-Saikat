import { SiteSettingsData } from "@/lib/getSiteSettings";

export default function Experience({ s }: { s: SiteSettingsData }) {
  const experiences = s.experience || [];

  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Experience
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">Career Journey</h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="card grid gap-4 p-6 md:grid-cols-[200px,1fr] md:items-start border-l-4 border-primary/20 hover:border-primary transition-colors"
            >
              <div className="md:space-y-2">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {exp.year}
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {exp.company}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <div 
                  className="mt-3 text-slate-600 dark:text-slate-400 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: exp.description
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br />') 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}