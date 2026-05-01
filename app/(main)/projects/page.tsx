import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';

export default async function ProjectsPage() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

  return (
    <section className="py-20">
      <div className="container-custom space-y-12">
        <div className="max-w-3xl space-y-5">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Projects
          </span>
          <h1 className="text-4xl font-extrabold md:text-6xl">Selected work across frontend and WordPress.</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A mix of featured builds, client work, and experiments focused on performance and clean execution.
          </p>
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
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                    {(project.tech || []).slice(0, 4).map((tech: string) => (
                      <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl ? (
                      <Link href={project.liveUrl} className="font-semibold text-primary transition hover:underline">
                        Live Site
                      </Link>
                    ) : null}
                    {project.githubUrl ? (
                      <Link href={project.githubUrl} className="font-semibold text-primary transition hover:underline">
                        GitHub
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="card p-8 text-slate-600 dark:text-slate-400 lg:col-span-3">
              No projects yet. Add featured projects in the admin area.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}