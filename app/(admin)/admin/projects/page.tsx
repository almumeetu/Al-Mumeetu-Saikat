'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Loader2, FolderKanban } from 'lucide-react';
import toast from 'react-hot-toast';

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  tech: string[];
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed');
      setProjects(await res.json());
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Project deleted');
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error('Failed to delete project');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Projects</h1>
          <p className="mt-0.5 text-sm text-slate-500">{projects.length} total projects</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <FolderKanban size={28} className="text-slate-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">No projects yet</p>
            <p className="mt-1 text-sm text-slate-500">Add your first project to showcase your work.</p>
          </div>
          <Link href="/admin/projects/new" className="btn-primary">
            <Plus size={15} /> Add Project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="card flex flex-wrap items-center gap-4 p-4 transition-all hover:shadow-md"
            >
              {/* Image */}
              {project.image ? (
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <FolderKanban size={20} className="text-slate-400" />
                </div>
              )}

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate font-bold">{project.title}</h2>
                  {project.featured && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-sm text-slate-500">{project.description}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {(Array.isArray(project.category) ? project.category : project.category ? [project.category] : []).map((cat: string) => (
                    <span key={cat} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {cat}
                    </span>
                  ))}
                  {project.tech?.slice(0, 3).map((t: string) => (
                    <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    title="View live"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <Link
                  href={`/admin/projects/${project._id}/edit`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-primary/10 hover:text-primary"
                  title="Edit project"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(project._id, project.title)}
                  disabled={deleting === project._id}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-500/10"
                  title="Delete project"
                >
                  {deleting === project._id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
