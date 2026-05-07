'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [blogId, setBlogId] = useState<string>('');
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'General',
    tags: '',
    published: true,
  });

  useEffect(() => {
    params.then(({ id }) => {
      setBlogId(id);
      fetch(`/api/blogs/${id}`)
        .then((r) => r.json())
        .then((blog) => {
          setForm({
            title: blog.title || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            coverImage: blog.coverImage || '',
            category: blog.category || 'General',
            tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
            published: Boolean(blog.published),
          });
        })
        .finally(() => setInitialLoading(false));
    });
  }, [params]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      toast.success('Blog updated');
      router.push('/admin/blogs');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="card p-8 text-slate-600 dark:text-slate-400">Loading blog...</div>;
  }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Edit Content
        </span>
        <h1 className="text-3xl font-extrabold">Edit Blog Post</h1>
      </div>

      <form onSubmit={onSubmit} className="card space-y-4 p-8">
        {[
          ['title', 'Title'],
          ['excerpt', 'Excerpt'],
          ['category', 'Category'],
          ['tags', 'Tags (comma separated)'],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="mb-2 block text-sm font-medium">{label}</label>
            <input
              value={(form as any)[key]}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-800"
            />
          </div>
        ))}

        <ImageUploader
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => setForm((current) => ({ ...current, coverImage: url }))}
        />

        <div>
          <label className="mb-2 block text-sm font-medium">Content</label>
          <textarea
            value={form.content}
            onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
            rows={10}
            className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-800"
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))}
          />
          Published
        </label>

        <button disabled={loading} className="btn-primary">
          {loading ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </section>
  );
}