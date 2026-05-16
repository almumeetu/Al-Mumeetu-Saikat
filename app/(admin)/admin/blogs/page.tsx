'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, Loader2, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs/all');
      if (!res.ok) throw new Error('Failed');
      setBlogs(await res.json());
    } catch {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Blog deleted');
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error('Failed to delete blog');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Blog Posts</h1>
          <p className="mt-0.5 text-sm text-slate-500">{blogs.length} total posts</p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary">
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <FileText size={28} className="text-slate-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">No blog posts yet</p>
            <p className="mt-1 text-sm text-slate-500">Create your first post to get started.</p>
          </div>
          <Link href="/admin/blogs/new" className="btn-primary">
            <Plus size={15} /> Create Post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card flex flex-wrap items-center gap-4 p-4 transition-all hover:shadow-md"
            >
              {/* Cover */}
              {blog.coverImage ? (
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <FileText size={20} className="text-slate-400" />
                </div>
              )}

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate font-bold">{blog.title}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      blog.published
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                    }`}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm text-slate-500">{blog.excerpt}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                    {blog.category}
                  </span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  title="View post"
                >
                  <Eye size={16} />
                </Link>
                <Link
                  href={`/admin/blogs/${blog._id}/edit`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-primary/10 hover:text-primary"
                  title="Edit post"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(blog._id, blog.title)}
                  disabled={deleting === blog._id}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-500/10"
                  title="Delete post"
                >
                  {deleting === blog._id ? (
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
