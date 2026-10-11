'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BookOpen, Clock3, Search } from 'lucide-react';

export type BlogCardItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
};

function PostMeta({ post }: { post: BlogCardItem }) {
  const dateLabel = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(post.publishedAt));

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
      <span>{post.category}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
      <time dateTime={post.publishedAt}>{dateLabel}</time>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
      <span className="inline-flex items-center gap-1"><Clock3 size={13} /> {post.readingMinutes} min read</span>
    </div>
  );
}

export default function BlogExplorer({ posts }: { posts: BlogCardItem[] }) {
  const [activeCategory, setActiveCategory] = useState('All stories');
  const [query, setQuery] = useState('');

  const categories = useMemo(
    () => ['All stories', ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))],
    [posts],
  );

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All stories' || post.category === activeCategory;
      const searchableText = [post.title, post.excerpt, post.category, ...post.tags].join(' ').toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, posts, query]);

  const featuredPost = visiblePosts[0];
  const otherPosts = visiblePosts.slice(1);

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Browse the journal</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{posts.length} {posts.length === 1 ? 'story' : 'stories'} to explore</p>
          </div>
          <label className="relative block w-full sm:max-w-xs">
            <span className="sr-only">Search stories</span>
            <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search stories…"
              className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:focus:border-emerald-500"
            />
          </label>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter stories by category">
            {categories.map((category) => {
              const selected = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${selected
                    ? 'bg-emerald-700 text-white shadow-sm dark:bg-emerald-500 dark:text-slate-950'
                    : 'border border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-700/50 hover:text-emerald-800 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:border-emerald-500/50 dark:hover:text-emerald-300'}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {featuredPost ? (
        <div className="space-y-7">
          <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700 dark:hover:shadow-black/20">
            <Link href={`/blog/${featuredPost.slug}`} className="grid h-full lg:grid-cols-[1.08fr,0.92fr]">
              <div className="relative aspect-[1.35/1] overflow-hidden bg-slate-100 dark:bg-slate-800 lg:aspect-auto lg:min-h-[380px]">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  <BookOpen size={13} /> Featured story
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
                <PostMeta post={featuredPost} />
                <h2 className="mt-5 text-2xl font-medium leading-tight tracking-tight text-slate-950 transition group-hover:text-emerald-800 dark:text-white dark:group-hover:text-emerald-300 sm:text-3xl lg:text-4xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {featuredPost.excerpt}
                </p>
                {featuredPost.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tag}</span>
                    ))}
                  </div>
                )}
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  Read the story <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </article>

          {otherPosts.length > 0 && (
            <>
              <div className="flex items-end justify-between gap-4 pt-5">
                <div>
                  <p className="eyebrow">Keep exploring</p>
                  <h2 className="mt-2 text-xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-2xl">More from the journal</h2>
                </div>
                <span className="hidden items-center gap-1 text-sm text-slate-500 dark:text-slate-400 sm:inline-flex"><ArrowDownRight size={15} /> {otherPosts.length} more</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {otherPosts.map((post) => (
                  <article key={post.id} className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700 dark:hover:shadow-black/20">
                    <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                      </div>
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <PostMeta post={post} />
                        <h3 className="mt-4 line-clamp-2 text-xl font-medium leading-snug tracking-tight text-slate-950 transition group-hover:text-emerald-800 dark:text-white dark:group-hover:text-emerald-300">{post.title}</h3>
                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">Read story <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/30">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300"><Search size={20} /></div>
          <h2 className="mt-4 text-lg font-medium text-slate-950 dark:text-white">No stories found</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Try a different search or choose another topic.</p>
          <button type="button" onClick={() => { setQuery(''); setActiveCategory('All stories'); }} className="mt-5 text-sm font-semibold text-emerald-800 hover:underline dark:text-emerald-300">Clear filters</button>
        </div>
      )}
    </div>
  );
}
