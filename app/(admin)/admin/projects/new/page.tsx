'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';

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

  const field = (key: keyof typeof form) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((c) => ({ ...c, [key]: e.target.value })),
    className:
      'w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-800',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) {
      toast.error('Please upload or provide a project image');
      return;
    }
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
    <section className="space-y-8">
      <div className="space-y-2">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Portfolio
        </span>
        <h1 className="text-3xl font-extrabold">Add New Project</h1>
      </div>

      <form onSubmit={onSubmit} className="card space-y-6 p-8">
        {/* Image Upload */}
        <ImageUploader
          label="Project Image *"
          value={form.image}
          onChange={(url) => setForm((c) => ({ ...c, image: url }))}
        />

        {/* Text fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">Title *</label>
            <input required {...field('title')} placeholder="My Awesome Project" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category *</label>
            <input required {...field('category')} placeholder="E-commerce, SaaS, Portfolio…" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tech Stack (comma-separated)</label>
            <input {...field('tech')} placeholder="Next.js, Tailwind CSS, Supabase" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Live URL</label>
            <input type="url" {...field('liveUrl')} placeholder="https://myproject.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">GitHub URL</label>
            <input type="url" {...field('githubUrl')} placeholder="https://github.com/user/repo" />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">Description *</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
              placeholder="Describe what this project does…"
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-800"
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((c) => ({ ...c, featured: e.target.checked }))}
            className="h-4 w-4 accent-primary"
          />
          Mark as Featured (shown on homepage)
        </label>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving…' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
