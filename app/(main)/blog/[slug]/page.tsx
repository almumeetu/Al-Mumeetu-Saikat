import { notFound } from 'next/navigation';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

type BlogLean = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category?: string;
};

export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  await connectDB();
  const blog = await Blog.findOne({ slug: params.slug }).lean<BlogLean>();

  if (!blog) notFound();

  return (
    <article className="py-20">
      <div className="container-custom max-w-4xl space-y-8">
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            {blog.category ?? 'General'}
          </span>
          <h1 className="text-4xl font-extrabold md:text-6xl">{blog.title}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">{blog.excerpt}</p>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-slate max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </article>
  );
}