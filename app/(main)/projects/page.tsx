import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Al Mumeetu Saikat',
  description: 'A comprehensive collection of web applications, landing pages, and frontend solutions built by Al Mumeetu Saikat.',
  alternates: {
    canonical: '/projects',
  }
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    await connectDB();
    projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }

  return (
    <section className="relative py-32 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-10 left-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 space-y-16">
        <div className="max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-bold tracking-wide text-primary backdrop-blur-md">
            <Sparkles size={16} /> All Projects
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-slate-900 dark:text-white leading-tight">
            Selected work across frontend and WordPress.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            A mix of featured builds, client work, and high-performance web applications focused on clean execution and user experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <article
                key={project._id.toString()}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 dark:bg-slate-800/80 dark:ring-white/10 backdrop-blur-xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Hover Action Links */}
                  <div className="absolute bottom-6 left-6 right-6 flex translate-y-4 gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-primary hover:text-white"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary"
                      >
                        <Github size={16} /> Code
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                    {project.category}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="mb-6 flex-1 text-slate-600 dark:text-slate-400 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {(project.tech || []).slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 ring-1 ring-slate-900/5 dark:ring-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[2rem] bg-white p-16 text-center text-slate-500 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800/80 dark:ring-white/10 backdrop-blur-xl lg:col-span-3">
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-slate-400 opacity-50" />
              <p className="text-xl font-bold text-slate-700 dark:text-slate-300">No projects yet.</p>
              <p className="mt-2 text-slate-500">
                Add projects in the admin area.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}