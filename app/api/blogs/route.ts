import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Blog from '@/models/Blog';
import { createBlogSlug } from '@/lib/blog-slug';
import { normalizeBlogReferences, parseBlogPublishDate } from '@/lib/blog-metadata';
import { normalizeBlogTags } from '@/lib/blog-tags';

async function uniqueBlogSlug(title: string) {
  const base = createBlogSlug(title) || `story-${Date.now()}`;
  let candidate = base;
  let suffix = 2;
  while (await Blog.exists({ $or: [{ slug: candidate }, { previousSlugs: candidate }] })) {
    candidate = `${base}-${suffix++}`;
  }
  return candidate;
}

export async function GET() {
  if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    const data = await req.json();
    if (typeof data.title !== 'string' || !data.title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    const publishedAt = data.publishedAt === undefined ? new Date() : parseBlogPublishDate(data.publishedAt);
    if (!publishedAt) return NextResponse.json({ error: 'Choose a valid publish date' }, { status: 400 });
    const references = normalizeBlogReferences(data.references ?? []);
    if (!references) return NextResponse.json({ error: 'Reference links must use valid http or https URLs' }, { status: 400 });
    const slug = await uniqueBlogSlug(data.title);
    const blog = await Blog.create({ ...data, tags: normalizeBlogTags(data.tags), slug, publishedAt, references });
    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
