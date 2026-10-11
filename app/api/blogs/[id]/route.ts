import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Blog from '@/models/Blog';
import { appendBlogSlugSuffix, blogSlugMatchesTitle, createBlogSlug, MAX_BLOG_SLUG_LENGTH } from '@/lib/blog-slug';
import { normalizeBlogReferences, parseBlogPublishDate } from '@/lib/blog-metadata';
import { normalizeBlogTags } from '@/lib/blog-tags';

async function uniqueBlogSlug(title: string, excludeId: string, reservedSlugs: string[] = []) {
  const base = createBlogSlug(title) || `story-${Date.now()}`;
  let candidate = base;
  let suffix = 2;
  while (reservedSlugs.includes(candidate) || await Blog.exists({
    $and: [
      { $or: [{ slug: candidate }, { previousSlugs: candidate }] },
      { _id: { $ne: excludeId } },
    ],
  })) {
    candidate = appendBlogSlugSuffix(base, suffix++);
  }
  return candidate;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  const blog = await Blog.findById(id).lean();
  if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  const data = await req.json();
  const existing = await Blog.findById(id);
  if (!existing) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

  const nextTitle = typeof data.title === 'string' ? data.title.trim() : existing.title;
  if (!nextTitle) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  if (data.slug !== undefined && typeof data.slug !== 'string') {
    return NextResponse.json({ error: 'URL slug must be text' }, { status: 400 });
  }
  const titleChanged = nextTitle !== existing.title;
  const slugNeedsRepair = !blogSlugMatchesTitle(nextTitle, existing.slug);
  const hasSlugInput = typeof data.slug === 'string';
  const customSlug = hasSlugInput ? data.slug.trim() : '';
  const requestedSlug = customSlug ? createBlogSlug(customSlug) : '';
  if (customSlug && !requestedSlug) return NextResponse.json({ error: 'Enter a valid URL slug' }, { status: 400 });
  if (requestedSlug.length > MAX_BLOG_SLUG_LENGTH) {
    return NextResponse.json({ error: `URL slug must be ${MAX_BLOG_SLUG_LENGTH} characters or fewer` }, { status: 400 });
  }
  if (requestedSlug && requestedSlug !== existing.slug) {
    if ((existing.previousSlugs || []).includes(requestedSlug) || await Blog.exists({
      $and: [
        { $or: [{ slug: requestedSlug }, { previousSlugs: requestedSlug }] },
        { _id: { $ne: id } },
      ],
    })) {
      return NextResponse.json({ error: 'That URL slug is already in use. Please choose another.' }, { status: 409 });
    }
  }
  let update = {
    ...data,
    tags: normalizeBlogTags(data.tags),
    slug: existing.slug,
    slugCustom: hasSlugInput
      ? Boolean(customSlug)
      : titleChanged || slugNeedsRepair
        ? false
        : Boolean(existing.slugCustom ?? !blogSlugMatchesTitle(existing.title, existing.slug)),
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
  let nextSlug = existing.slug;
  if (requestedSlug) {
    nextSlug = requestedSlug;
  } else if (titleChanged || slugNeedsRepair) {
    nextSlug = await uniqueBlogSlug(nextTitle, id, existing.previousSlugs || []);
  }
  if (nextSlug.length > MAX_BLOG_SLUG_LENGTH) {
    return NextResponse.json({ error: `URL slug must be ${MAX_BLOG_SLUG_LENGTH} characters or fewer` }, { status: 400 });
  }
  if (nextSlug !== existing.slug) {
    const previousSlugs = Array.from(new Set([
      ...(existing.previousSlugs || []).filter((previousSlug: string) => previousSlug !== nextSlug),
      existing.slug,
    ]));
    update = { ...update, title: nextTitle, slug: nextSlug, previousSlugs };
  } else if (titleChanged) {
    update = { ...update, title: nextTitle };
  }

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  } catch (error: any) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: 'That URL slug is already in use. Please choose another.' }, { status: 409 });
    }
    throw error;
  }
  if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  revalidatePath('/blog');
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${blog.slug}`);
  return NextResponse.json(blog);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  const blog = await Blog.findByIdAndDelete(id);
  if (blog) {
    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
  }
  return NextResponse.json({ success: true });
}
