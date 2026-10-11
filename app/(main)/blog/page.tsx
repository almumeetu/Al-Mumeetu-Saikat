import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { BookOpen, Sparkles } from 'lucide-react';
import BlogExplorer, { type BlogCardItem } from '@/components/blog/BlogExplorer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Personal stories, project notes, and ideas from the technology I’m exploring. A journal about the work and lessons behind the journey.',
  alternates: {
    canonical: '/blog',
  },
};

export const revalidate = 3600;

function estimateReadingMinutes(content: string) {
  const plainText = content
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = plainText ? plainText.split(' ').length : 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default async function BlogPage() {
  let blogs: any[] = [];
  try {
    const conn = await connectDB();
    if (conn) {
      blogs = await Blog.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean();
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }

  const posts: BlogCardItem[] = blogs.map((blog) => {
    const date = new Date(blog.publishedAt || blog.createdAt || Date.now());
    return {
      id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage,
      category: blog.category?.trim() || 'Personal',
      tags: Array.isArray(blog.tags) ? blog.tags.filter(Boolean) : [],
      publishedAt: date.toISOString(),
      readingMinutes: estimateReadingMinutes(blog.content || ''),
    };
  });

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-emerald-500/[0.07] blur-[110px] dark:bg-emerald-500/[0.09]" />
        <div className="absolute left-[-15rem] top-[38rem] h-[30rem] w-[30rem] rounded-full bg-teal-500/[0.05] blur-[110px] dark:bg-teal-500/[0.06]" />
      </div>

      <div className="container-custom mx-auto max-w-6xl space-y-12 sm:space-y-16">
        <header className="max-w-4xl space-y-5 sm:space-y-6">
          <span className="eyebrow"><BookOpen size={15} /> A personal journal</span>
          <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
            Stories from life, projects <span className="gradient-text">&amp; technology.</span>
          </h1>
          <div className="flex flex-col gap-5 border-l-2 border-emerald-600/40 pl-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              Personal reflections, things I&apos;m building, and ideas I&apos;m exploring in tech. A place to document the work and lessons behind the journey.
            </p>
            <p className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              <Sparkles size={15} className="text-emerald-700 dark:text-emerald-400" /> Written as I go
            </p>
          </div>
        </header>

        {posts.length > 0 ? (
          <BlogExplorer posts={posts} />
        ) : (
          <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">The journal is getting started</p>
            <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">The first story is on its way.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">Soon, this will be a place for the projects, ideas, and moments worth sharing along the way.</p>
          </div>
        )}
      </div>
    </section>
  );
}
