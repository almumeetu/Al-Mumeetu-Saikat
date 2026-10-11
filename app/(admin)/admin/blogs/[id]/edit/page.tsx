'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import BlogContentEditor from '@/components/admin/BlogContentEditor';
import BlogReferencesEditor from '@/components/admin/BlogReferencesEditor';
import { blogSlugMatchesTitle, createBlogSlug, MAX_BLOG_SLUG_LENGTH } from '@/lib/blog-slug';
import { normalizeBlogTags } from '@/lib/blog-tags';
import { toBlogDateInput, type BlogReference } from '@/lib/blog-metadata';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-700';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialTitle, setInitialTitle] = useState('');
  const [slugMode, setSlugMode] = useState<'auto' | 'custom'>('auto');
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'General',
    tags: '',
    published: true,
    publishedAt: '',
    references: [] as BlogReference[],
  });

  const set = <K extends Exclude<keyof typeof form, 'references'>,>(key: K, value: typeof form[K]) =>
    setForm((c) => ({ ...c, [key]: value }));
  const slugPreview = slugMode === 'custom' && form.slug.trim()
    ? createBlogSlug(form.slug)
    : form.title.trim() === initialTitle && form.slug.trim()
      ? createBlogSlug(form.slug)
      : createBlogSlug(form.title);

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      fetch(`/api/blogs/${resolvedId}`)
        .then((r) => r.json())
        .then((blog) => {
          setInitialTitle(blog.title || '');
          const isCustomSlug = typeof blog.slugCustom === 'boolean'
            ? blog.slugCustom
            : !blogSlugMatchesTitle(blog.title || '', blog.slug || '');
          setSlugMode(isCustomSlug ? 'custom' : 'auto');
          setForm({
            title:      blog.title      || '',
            slug:       blog.slug       || '',
            excerpt:    blog.excerpt    || '',
            content:    blog.content    || '',
            coverImage: blog.coverImage || '',
            category:   blog.category   || 'General',
            tags:       normalizeBlogTags(blog.tags).join(', '),
            published:  Boolean(blog.published),
            publishedAt: toBlogDateInput(blog.publishedAt || blog.createdAt),
            references: Array.isArray(blog.references) ? blog.references : [],
          });
        })
        .catch(() => toast.error('Failed to load blog'))
        .finally(() => setInitialLoading(false));
    });
  }, [params]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slugMode === 'custom' && form.slug.trim() && !slugPreview) { toast.error('Enter a valid URL slug'); return; }
    if (slugPreview.length > MAX_BLOG_SLUG_LENGTH) { toast.error(`URL slug must be ${MAX_BLOG_SLUG_LENGTH} characters or fewer`); return; }
    if (!form.content.replace(/<[^>]*>/g, '').trim()) { toast.error('Content is required'); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug: slugMode === 'custom' ? slugPreview : '',
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
          <h1 className="text-2xl font-medium">Edit Blog Post</h1>
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
                onChange={(e) => {
                  set('title', e.target.value);
                  if (slugMode === 'auto') set('slug', createBlogSlug(e.target.value));
                }}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="blog-slug" className="mb-2 block text-sm font-medium">Custom URL slug <span className="font-normal text-slate-500">(optional)</span></label>
              <div className="flex overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="flex shrink-0 items-center border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800">/blog/</span>
                <input id="blog-slug" value={form.slug} onChange={(e) => { set('slug', e.target.value); setSlugMode(e.target.value.trim() ? 'custom' : 'auto'); }} autoCapitalize="none" autoCorrect="off" spellCheck={false} className="w-full min-w-0 bg-transparent px-3 py-3 text-sm outline-none" />
              </div>
              <p className="mt-1 text-xs text-slate-500">Leave blank to follow the title. Preview: {slugPreview ? `/blog/${slugPreview}` : 'Enter letters or numbers for a valid slug.'} Previous links keep redirecting if the slug changes.</p>
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
              <p className="mt-1 text-xs text-slate-500">Separate with commas, or enter #hashtags.</p>
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
