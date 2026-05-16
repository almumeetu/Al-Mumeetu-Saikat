'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-700';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'General',
    tags: '',
    published: true,
  });

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm((c) => ({ ...c, [key]: value }));

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      fetch(`/api/blogs/${resolvedId}`)
        .then((r) => r.json())
        .then((blog) => {
          setForm({
            title:      blog.title      || '',
            excerpt:    blog.excerpt    || '',
            content:    blog.content    || '',
            coverImage: blog.coverImage || '',
            category:   blog.category   || 'General',
            tags:       Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
            published:  Boolean(blog.published),
          });
        })
        .catch(() => toast.error('Failed to load blog'))
        .finally(() => setInitialLoading(false));
    });
  }, [params]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      toast.success('Blog updated!');
      router.push('/admin/blogs');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update blog');
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
          href="/admin/blogs"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary dark:border-slate-700"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold">Edit Blog Post</h1>
          <p className="text-sm text-slate-500">Update your article</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr,320px]">
        {/* Main column */}
        <div className="space-y-5">
          <div className="card p-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => set('excerpt', e.target.value)}
                className={inputCls + ' resize-none'}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Content *</label>
              <textarea
                required
                rows={16}
                value={form.content}
                onChange={(e) => set('content', e.target.value)}
                placeholder="Write your blog content here… (Markdown supported)"
                className={inputCls + ' resize-y font-mono text-xs leading-relaxed'}
              />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          <div className="card p-6 space-y-5">
            <h2 className="font-semibold">Publish</h2>
            <label className="flex cursor-pointer items-center gap-3">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => set('published', e.target.checked)}
                  className="sr-only"
                />
                <div className={`h-6 w-11 rounded-full transition-colors ${form.published ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm font-medium">{form.published ? 'Published' : 'Draft'}</span>
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>

          <div className="card p-6 space-y-5">
            <h2 className="font-semibold">Details</h2>
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <input
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Tags</label>
              <input
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="react, nextjs, typescript"
                className={inputCls}
              />
              <p className="mt-1 text-xs text-slate-500">Comma-separated</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 font-semibold">Cover Image</h2>
            <ImageUploader
              label=""
              value={form.coverImage}
              onChange={(url) => set('coverImage', url)}
            />
          </div>
        </div>
      </form>
    </section>
  );
}
