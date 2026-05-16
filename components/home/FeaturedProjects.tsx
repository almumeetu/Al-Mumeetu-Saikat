import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { ExternalLink, Github } from 'lucide-react';

async function getFeaturedProjects() {
  try {
    await connectDB();
    const projects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    return projects as any[];
  } catch {
    return [];
  }
}

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Featured Work
          </span>
          <h2 className="text-4xl font-extrabold md:text-5xl">Selected Projects</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
            A curated selection of projects that showcase my skills and experience.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project: any) => (
              <article
                key={project._id.toString()}
                className="card group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
                      >
                        <ExternalLink size={12} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
                      >
                        <Github size={12} /> Code
                      </a>
                    )}
                  </div>
                </div>
                <div className="space-y-3 p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold leading-snug">{project.title}</h3>
                  <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(project.tech || []).slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center text-slate-500">
            <p className="text-lg font-medium">No featured projects yet.</p>
            <p className="mt-2 text-sm">
              Mark projects as &quot;Featured&quot; in the{' '}
              <Link href="/admin/projects" className="text-primary underline">
                admin panel
              </Link>{' '}
              to display them here.
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-outline">
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
