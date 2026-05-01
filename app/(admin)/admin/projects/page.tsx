import { connectDB } from '@/lib/db';
import Project from '@/models/Project';

export default async function AdminProjectsPage() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Portfolio
        </span>
        <h1 className="text-3xl font-extrabold">Projects</h1>
      </div>

      <div className="space-y-4">
        {projects.length > 0 ? (
          projects.map((project: any) => (
            <div key={project._id} className="card flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{project.category}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
                {project.featured ? 'Featured' : 'Standard'}
              </span>
            </div>
          ))
        ) : (
          <div className="card p-8 text-slate-600 dark:text-slate-400">No projects yet.</div>
        )}
      </div>
    </section>
  );
}