const experience = [
  {
    year: '2020 - Present',
    title: 'WordPress / Frontend Specialist',
    description: 'Delivered client websites, landing pages, and custom WordPress builds with a focus on speed and maintainability.',
  },
  {
    year: '2018 - 2020',
    title: 'Frontend Developer',
    description: 'Worked on responsive UI implementation, JavaScript interactions, and PSD/Figma to HTML conversions.',
  },
  {
    year: '2016 - 2018',
    title: 'Web Designer',
    description: 'Built early portfolio and business websites, learning performance, accessibility, and conversion design.',
  },
];

export default function Experience() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Experience
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">A Short Career Timeline</h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-5">
          {experience.map((item) => (
            <div key={item.year} className="card grid gap-4 p-6 md:grid-cols-[180px,1fr] md:items-start">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.year}</div>
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