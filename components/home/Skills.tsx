const skills = [
  'HTML5',
  'CSS3',
  'SASS/SCSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'WordPress',
  'Elementor',
  'Tailwind CSS',
  'Bootstrap',
  'SEO',
];

export default function Skills() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Skills
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">Tools I Use Every Day</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="card px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:text-primary dark:text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}