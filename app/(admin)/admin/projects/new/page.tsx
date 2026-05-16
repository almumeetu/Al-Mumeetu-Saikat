'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-700';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    tech: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm((c) => ({ ...c, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) { toast.error('Please upload or provide a project image'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to create project');
      toast.success('Project created!');
      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary dark:border-slate-700"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold">New Project</h1>
          <p className="text-sm text-slate-500">Add a project to your portfolio</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr,320px]">
        {/* Main column */}
        <div className="space-y-5">
          <div className="card p-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Title *</label>
              <input required value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="My Awesome Project" className={inputCls} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Description *</label>
              <textarea
                required
                rows={5}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Describe what this project does, the problem it solves, and your role…"
                className={inputCls + ' resize-none'}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Category *</label>
                <input required value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="E-commerce, SaaS, Portfolio…" className={inputCls} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Tech Stack</label>
                <input value={form.tech} onChange={(e) => set('tech', e.target.value)} placeholder="Next.js, Tailwind, Supabase" className={inputCls} />
                <p className="mt-1 text-xs text-slate-500">Comma-separated</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Live URL</label>
                <input type="url" value={form.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://myproject.com" className={inputCls} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">GitHub URL</label>
                <input type="url" value={form.githubUrl} onChange={(e) => set('githubUrl', e.target.value)} placeholder="https://github.com/user/repo" className={inputCls} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold">Publish</h2>
            <label className="flex cursor-pointer items-center gap-3">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set('featured', e.target.checked)}
                  className="sr-only"
                />
                <div className={`h-6 w-11 rounded-full transition-colors ${form.featured ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <div>
                <span className="text-sm font-medium">Featured</span>
                <p className="text-xs text-slate-500">Show on homepage</p>
              </div>
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {loading ? 'Saving…' : 'Create Project'}
            </button>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 font-semibold">Project Image *</h2>
            <ImageUploader
              label=""
              value={form.image}
              onChange={(url) => set('image', url)}
            />
          </div>
        </div>
      </form>
    </section>
  );
}
