import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { Plus } from 'lucide-react';

export default async function AdminProjectsPage() {
  let projects: any[] = [];
  try {
    await connectDB();
    projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  } catch {
    // DB not available
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Portfolio
          </span>
          <h1 className="text-3xl font-extrabold">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <div className="space-y-4">
        {projects.length > 0 ? (
          projects.map((project: any) => (
            <div key={project._id.toString()} className="card flex flex-wrap items-center gap-4 p-4">
              {project.image && (
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-bold">{project.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{project.category}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  project.featured
                    ? 'bg-primary/10 text-primary'
                    : 'bg-slate-100 dark:bg-slate-800'
                }`}
              >
                {project.featured ? 'Featured' : 'Standard'}
              </span>
            </div>
          ))
        ) : (
          <div className="card p-8 text-center text-slate-600 dark:text-slate-400">
            No projects yet.{' '}
            <Link href="/admin/projects/new" className="font-semibold text-primary underline">
              Add your first project.
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}