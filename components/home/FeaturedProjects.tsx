import Link from 'next/link';
import Image from 'next/image';


export default async function FeaturedProjects() {
  const projects = [
    {
      _id: '1',
      title: 'neocomerz-storefront-ui',
      category: 'Package',
      description: 'A comprehensive pnpm package for building modern, high-performance e-commerce storefronts.',
      tech: ['pnpm', 'TypeScript', 'React', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: '2',
      title: 'Friends Gallery',
      category: 'Headless E-commerce',
      description: 'A custom headless e-commerce platform built with React interfaces on top of a flexible WordPress backend.',
      tech: ['React', 'WordPress', 'GraphQL', 'Next.js'],
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: '3',
      title: 'Next.js Dynamic Page Builder',
      category: 'Architecture',
      description: 'A custom frontend architecture designed to generate high-converting landing pages dynamically.',
      tech: ['Next.js 15', 'Tailwind CSS', 'Framer Motion'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Featured Projects
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">Selected Work</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <article key={project._id} className="card overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <div className="space-y-4 p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.category}</div>
                  <h3 className={`text-2xl font-bold ${project.title === 'neocomerz-storefront-ui' ? 'font-mono tracking-tight text-xl' : ''}`}>{project.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                    {(project.tech || []).slice(0, 4).map((tech: string) => (
                      <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="card p-8 text-center text-slate-600 dark:text-slate-400 lg:col-span-3">
              Add featured projects in the admin panel to display them here.
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/projects" className="btn-outline">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}