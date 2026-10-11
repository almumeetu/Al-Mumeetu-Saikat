'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import BlogContentEditor from '@/components/admin/BlogContentEditor';
import BlogReferencesEditor from '@/components/admin/BlogReferencesEditor';
import { createBlogSlug } from '@/lib/blog-slug';
import { getTodayBlogDateInput, type BlogReference } from '@/lib/blog-metadata';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-700';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'General',
    tags: '',
    published: true,
    publishedAt: getTodayBlogDateInput(),
    references: [] as BlogReference[],
  });

  const set = <K extends Exclude<keyof typeof form, 'references'>,>(key: K, value: typeof form[K]) =>
    setForm((c) => ({ ...c, [key]: value }));
  const slugPreview = createBlogSlug(form.title) || 'your-post-title';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.coverImage)   { toast.error('Cover image is required'); return; }
    if (!form.content.replace(/<[^>]*>/g, '').trim()) { toast.error('Content is required'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      toast.success('Blog post created!');
      router.push('/admin/blogs');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-medium">New Blog Post</h1>
          <p className="text-sm text-slate-500">Create and publish a new article</p>
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
                placeholder="My awesome blog post…"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">URL slug <span className="font-normal text-slate-500">(auto-generated)</span></label>
              <div className="flex overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="flex shrink-0 items-center border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800">/blog/</span>
                <input readOnly value={slugPreview} aria-label="Generated blog URL slug" className="w-full min-w-0 bg-slate-50 px-3 py-3 text-sm text-slate-600 outline-none dark:bg-slate-900 dark:text-slate-300" />
              </div>
              <p className="mt-1 text-xs text-slate-500">The link updates automatically when you change the title.</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => set('excerpt', e.target.value)}
                placeholder="A short summary shown in listings…"
                className={inputCls + ' resize-none'}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Content *</label>
              <BlogContentEditor value={form.content} onChange={(value) => set('content', value)} />
              <p className="mt-2 text-xs leading-5 text-slate-500">Use headings, lists, quotes, and links to give your story a clear structure.</p>
            </div>
          </div>
          <BlogReferencesEditor references={form.references} onChange={(references) => setForm((current) => ({ ...current, references }))} />
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          <div className="card p-6 space-y-5">
            <h2 className="font-semibold">Publish</h2>
            <div>
              <label htmlFor="publishedAt" className="mb-2 block text-sm font-medium">Publish date</label>
              <input
                id="publishedAt"
                type="date"
                required
                value={form.publishedAt}
                onChange={(event) => set('publishedAt', event.target.value)}
                className={inputCls}
              />
              <p className="mt-1 text-xs text-slate-500">Shown on the article and journal cards. Dhaka time.</p>
            </div>
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
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {loading ? 'Saving…' : 'Publish'}
              </button>
            </div>
          </div>

          <div className="card p-6 space-y-5">
            <h2 className="font-semibold">Details</h2>
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <input
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                placeholder="General, Tutorial, News…"
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
            <h2 className="mb-4 font-semibold">Cover Image *</h2>
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
