import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import ProjectsFilter from '@/components/projects/ProjectsFilter';

export const metadata: Metadata = {
  title: 'Projects | Al Mumeetu Saikat',
  description: 'A comprehensive collection of web applications, landing pages, and frontend solutions built by Al Mumeetu Saikat.',
  alternates: {
    canonical: '/projects',
  }
};

export const revalidate = 3600;
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

        <ProjectsFilter projects={projects.map((p: any) => ({ ...p, _id: p._id.toString() }))} />
      </div>
    </section>
  );
}
