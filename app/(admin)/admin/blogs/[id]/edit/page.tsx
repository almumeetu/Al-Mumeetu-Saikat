'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
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

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.id}`);
        const blog = await response.json();
        setForm({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
          coverImage: blog.coverImage || '',
          category: blog.category || 'General',
          tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
          published: Boolean(blog.published),
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadBlog();
  }, [params.id]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${params.id}`, {
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
          ['coverImage', 'Cover Image URL'],
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