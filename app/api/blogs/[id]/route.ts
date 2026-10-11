import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { createBlogSlug } from '@/lib/blog-slug';
import { normalizeBlogReferences, parseBlogPublishDate } from '@/lib/blog-metadata';

async function uniqueBlogSlug(title: string, excludeId: string) {
  const base = createBlogSlug(title) || `story-${Date.now()}`;
  let candidate = base;
  let suffix = 2;
  while (await Blog.exists({
    $and: [
      { $or: [{ slug: candidate }, { previousSlugs: candidate }] },
      { _id: { $ne: excludeId } },
    ],
  })) {
    candidate = `${base}-${suffix++}`;
  }
  return candidate;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const blog = await Blog.findById(id).lean();
  return NextResponse.json(blog);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const data = await req.json();
  const existing = await Blog.findById(id);
  if (!existing) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

  const nextTitle = typeof data.title === 'string' ? data.title.trim() : existing.title;
  if (!nextTitle) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  const titleChanged = nextTitle !== existing.title;
  let update = {
    ...data,
    slug: existing.slug,
    previousSlugs: existing.previousSlugs || [],
  };
  if (data.publishedAt !== undefined) {
    const publishedAt = parseBlogPublishDate(data.publishedAt);
    if (!publishedAt) return NextResponse.json({ error: 'Choose a valid publish date' }, { status: 400 });
    update = { ...update, publishedAt };
  }
  if (data.references !== undefined) {
    const references = normalizeBlogReferences(data.references);
    if (!references) return NextResponse.json({ error: 'Reference links must use valid http or https URLs' }, { status: 400 });
    update = { ...update, references };
  }
  if (titleChanged) {
    const slug = await uniqueBlogSlug(nextTitle, id);
    const previousSlugs = Array.from(new Set([
      ...(existing.previousSlugs || []),
      ...(existing.slug !== slug ? [existing.slug] : []),
    ]));
    update = { ...update, title: nextTitle, slug, previousSlugs };
  }

  const blog = await Blog.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  return NextResponse.json(blog);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await connectDB();
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
