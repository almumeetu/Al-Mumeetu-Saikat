import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';

export default async function FeaturedProjects() {
  await connectDB();
  const projects = await Project.find({ featured: true }).sort({ createdAt: -1 }).limit(3).lean();

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
                  <h3 className="text-2xl font-bold">{project.title}</h3>
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