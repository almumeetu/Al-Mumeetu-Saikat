import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import BlogActivity from '@/models/BlogActivity';
import BlogInteractions from '@/components/blog/BlogInteractions';

type BlogLean = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category?: string;
  tags?: string[];
  author?: string;
  createdAt?: Date | string;
};

function readingMinutes(content: string) {
  const text = content
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return Math.max(1, Math.ceil((text ? text.split(' ').length : 0) / 200));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const conn = await connectDB();
  const blog = conn ? await Blog.findOne({ slug }).lean<BlogLean>() : null;

  if (!blog) {
    return { title: 'Story Not Found' };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article' as const,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://almumeetusaikat.com'}/blog/${slug}`,
      images: [{ url: blog.coverImage }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const conn = await connectDB();
  const blog = conn ? await Blog.findOne({ slug }).lean<BlogLean>() : null;

  if (!blog) notFound();

  const [initialLikes, initialShares, approvedComments] = await Promise.all([
    BlogActivity.countDocuments({ blogId: blog._id, type: 'like', active: true }),
    BlogActivity.countDocuments({ blogId: blog._id, type: 'share', active: true }),
    BlogActivity.find({ blogId: blog._id, type: 'comment', approved: true, active: true })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('name message createdAt')
      .lean(),
  ]);

  const date = new Date(blog.createdAt || Date.now());
  const publishedAt = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
  const minutes = readingMinutes(blog.content || '');
  const authorName = blog.author || 'Al Mumeetu Saikat';
  const authorInitials = authorName.split(/\s+/).map((part) => part[0]).slice(0, 3).join('').toUpperCase();

  return (
    <article className="relative isolate overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-gradient-to-b from-emerald-500/[0.055] via-transparent to-transparent dark:from-emerald-500/[0.07]" />
      <div className="container-custom mx-auto max-w-6xl">
        <Link href="/blog" className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-emerald-700/40 hover:text-emerald-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:text-emerald-300">
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" /> Back to journal
        </Link>

        <header className="mx-auto mt-10 max-w-4xl sm:mt-14">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium">
            <span className="rounded-full bg-emerald-600/10 px-3.5 py-1.5 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">{blog.category?.trim() || 'Personal'}</span>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">/</span>
            <time dateTime={date.toISOString()} className="text-slate-500 dark:text-slate-400">{publishedAt}</time>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">/</span>
            <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400"><Clock3 size={14} /> {minutes} min read</span>
          </div>

          <h1 className="mt-6 text-4xl font-medium leading-[1.1] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
            {blog.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-xl sm:leading-9">
            {blog.excerpt}
          </p>
          <div className="mt-7 flex items-center gap-3 border-t border-slate-200/80 pt-5 text-sm dark:border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700/15 bg-emerald-600/10 text-[10px] font-semibold text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">{authorInitials}</div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">{authorName}</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Personal notes and perspectives</p>
            </div>
          </div>
        </header>

        <figure className="relative mx-auto mt-9 aspect-[16/9] max-w-5xl overflow-hidden rounded-[1.5rem] border border-slate-200/60 bg-slate-100 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:mt-12 sm:rounded-[2rem]">
          <Image src={blog.coverImage} alt={blog.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
        </figure>

        <div className="blog-content mx-auto mt-10 max-w-[46rem] sm:mt-14">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />

          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="blog-tags mt-12 border-t border-slate-200/80 pt-6 dark:border-slate-800">
              <span className="mr-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Filed under</span>
              {blog.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}
        </div>

        <div className="mx-auto max-w-5xl">
          <BlogInteractions
            slug={blog.slug}
            title={blog.title}
            excerpt={blog.excerpt}
            initialLikes={initialLikes}
            initialShares={initialShares}
            initialComments={approvedComments.map((comment: any) => ({
              id: comment._id.toString(),
              name: comment.name || 'Reader',
              message: comment.message || '',
              createdAt: new Date(comment.createdAt).toISOString(),
            }))}
          />
        </div>

        <footer className="mx-auto mt-16 flex max-w-[46rem] flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white/75 p-6 dark:border-slate-800 dark:bg-slate-900/60 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm font-medium text-slate-950 dark:text-white">Thanks for reading.</p>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">More notes from life, projects, and technology are waiting in the journal.</p>
          </div>
          <Link href="/blog" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-800 hover:underline dark:text-emerald-300">
            Explore more stories <ArrowUpRight size={16} />
          </Link>
        </footer>
      </div>
    </article>
  );
}
