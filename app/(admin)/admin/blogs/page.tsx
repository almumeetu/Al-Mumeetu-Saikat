import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export default async function AdminBlogsPage() {
  await connectDB();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Content
          </span>
          <h1 className="mt-3 text-3xl font-extrabold">Blogs</h1>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary">
          New Blog
        </Link>
      </div>

      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog: any) => (
            <div key={blog._id} className="card flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{blog.excerpt}</p>
              </div>
              <div className="flex gap-3 text-sm font-medium">
                <Link href={`/blog/${blog.slug}`} className="text-primary transition hover:underline">
                  View
                </Link>
                <Link href={`/admin/blogs/${blog._id}/edit`} className="text-primary transition hover:underline">
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="card p-8 text-slate-600 dark:text-slate-400">No blogs yet.</div>
        )}
      </div>
    </section>
  );
}