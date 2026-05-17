'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import TechStackPicker from '@/components/admin/TechStackPicker';
import CategoryPicker from '@/components/admin/CategoryPicker';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-700';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    categories: [] as string[],
    tech: [] as string[],
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      fetch(`/api/projects/${resolvedId}`)
        .then((r) => r.json())
        .then((project) => {
          // category may be string (legacy) or array
          const cats = Array.isArray(project.category)
            ? project.category
            : project.category
            ? [project.category]
            : [];
          setForm({
            title: project.title || '',
            description: project.description || '',
            image: project.image || '',
            categories: cats,
            tech: Array.isArray(project.tech) ? project.tech : [],
            liveUrl: project.liveUrl || '',
            githubUrl: project.githubUrl || '',
            featured: Boolean(project.featured),
          });
        })
        .catch(() => toast.error('Failed to load project'))
        .finally(() => setInitialLoading(false));
    });
  }, [params]);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((c) => ({ ...c, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.categories.length === 0) { toast.error('Please select at least one category'); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          image: form.image,
          category: form.categories,
          tech: form.tech,
          liveUrl: form.liveUrl,
          githubUrl: form.githubUrl,
          featured: form.featured,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to update');
      toast.success('Project updated!');
      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

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
          <h1 className="text-2xl font-extrabold">Edit Project</h1>
          <p className="text-sm text-slate-500">Update project details</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="card space-y-6 p-8">
        <ImageUploader
          label="Project Image *"
          value={form.image}
          onChange={(url) => set('image', url)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="My Awesome Project"
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Categories *</label>
            <CategoryPicker
              value={form.categories}
              onChange={(v) => set('categories', v)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tech Stack</label>
            <TechStackPicker
              value={form.tech}
              onChange={(v) => set('tech', v)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Live URL</label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => set('liveUrl', e.target.value)}
              placeholder="https://myproject.com"
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">GitHub URL</label>
            <input
              type="url"
              value={form.githubUrl}
              onChange={(e) => set('githubUrl', e.target.value)}
              placeholder="https://github.com/user/repo"
              className={inputCls}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">Description *</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe what this project does…"
              className={inputCls + ' resize-none'}
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set('featured', e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Mark as Featured (shown on homepage)
        </label>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
          <Link href="/admin/projects" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
