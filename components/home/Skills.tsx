const skillCategories = [
  {
    title: 'Frontend',
    skills: ['Next.js', 'React', 'Vue', 'Nuxt', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'SASS/SCSS', 'HTML5', 'CSS3']
  },
  {
    title: 'Backend & DB',
    skills: ['PostgreSQL', 'SQLite', 'Supabase', 'Node.js', 'REST APIs']
  },
  {
    title: 'CMS & Tools',
    skills: ['WordPress', 'Elementor', 'Git', 'Figma', 'SEO']
  }
];

export default function Skills() {
  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Skills
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">My Tech Stack</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {skillCategories.map((category) => (
            <div key={category.title} className="card p-8">
              <h3 className="mb-6 text-center text-xl font-bold gradient-text">{category.title}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-1 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}