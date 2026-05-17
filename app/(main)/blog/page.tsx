import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Al Mumeetu Saikat',
  description: 'Writing about frontend, WordPress, and delivery. A collection of practical notes, project updates, and engineering lessons.',
  alternates: {
    canonical: '/blog',
  }
};

export const revalidate = 3600;

export default async function BlogPage() {
  let blogs: any[] = [];
  try {
    await connectDB();
    blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }

  return (
    <section className="py-20">
      <div className="container-custom space-y-12">
        <div className="max-w-3xl space-y-5">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Blog
          </span>
          <h1 className="text-4xl font-extrabold md:text-6xl">Writing about frontend, WordPress, and delivery.</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A collection of practical notes, project updates, and engineering lessons.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {blogs.length > 0 ? (
            blogs.map((blog: any) => (
              <article key={blog._id} className="card overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
                </div>
                <div className="space-y-4 p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{blog.category}</div>
                  <h2 className="text-2xl font-bold">{blog.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{blog.excerpt}</p>
                  <Link href={`/blog/${blog.slug}`} className="font-semibold text-primary transition hover:underline">
                    Read more
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="card p-8 text-slate-600 dark:text-slate-400 lg:col-span-3">
              No blog posts yet. Add one from the admin area.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}