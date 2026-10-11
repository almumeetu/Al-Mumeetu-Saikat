import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import BlogActivity from '@/models/BlogActivity';

type RouteContext = { params: Promise<{ slug: string }> };
const visitorIdPattern = /^[a-zA-Z0-9_-]{16,80}$/;

async function getSummary(blogId: unknown, visitorId?: string) {
  const [likes, shares, commentCount, comments, liked] = await Promise.all([
    BlogActivity.countDocuments({ blogId, type: 'like', active: true }),
    BlogActivity.countDocuments({ blogId, type: 'share', active: true }),
    BlogActivity.countDocuments({ blogId, type: 'comment', approved: true, active: true }),
    BlogActivity.find({ blogId, type: 'comment', approved: true, active: true })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('name message createdAt')
      .lean(),
    visitorId
      ? BlogActivity.exists({ blogId, type: 'like', visitorId, active: true })
      : Promise.resolve(false),
  ]);

  return {
    likes,
    shares,
    commentCount,
    liked: Boolean(liked),
    comments: comments.map((comment: any) => ({
      id: comment._id.toString(),
      name: comment.name || 'Reader',
      message: comment.message || '',
      createdAt: new Date(comment.createdAt).toISOString(),
    })),
  };
}

export async function GET(request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const visitorId = new URL(request.url).searchParams.get('visitorId') || undefined;
  if (visitorId && !visitorIdPattern.test(visitorId)) {
    return NextResponse.json({ error: 'Invalid visitor id' }, { status: 400 });
  }

  try {
    if (!await connectDB()) return NextResponse.json({ error: 'Activity is temporarily unavailable' }, { status: 503 });
    const blog = await Blog.findOne({ slug, published: true }).select('_id').lean<{ _id: string }>();
    if (!blog) return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    return NextResponse.json(await getSummary(blog._id, visitorId), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Failed to load blog activity:', error);
    return NextResponse.json({ error: 'Activity is temporarily unavailable' }, { status: 503 });
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  const { slug } = await params;

  try {
    if (!await connectDB()) return NextResponse.json({ error: 'Activity is temporarily unavailable' }, { status: 503 });
    const blog = await Blog.findOne({ slug, published: true }).select('_id slug title').lean<{
      _id: string;
      slug: string;
      title: string;
    }>();
    if (!blog) return NextResponse.json({ error: 'Story not found' }, { status: 404 });

    const body = await request.json();
    const visitorId = typeof body.visitorId === 'string' ? body.visitorId : '';
    if (!visitorIdPattern.test(visitorId)) {
      return NextResponse.json({ error: 'Please refresh and try again' }, { status: 400 });
    }

    if (body.type === 'view') {
      try {
        await BlogActivity.updateOne(
          { blogId: blog._id, visitorId, type: 'view' },
          {
            $setOnInsert: {
              blogId: blog._id,
              blogSlug: blog.slug,
              blogTitle: blog.title,
              visitorId,
              type: 'view',
              active: true,
              read: true,
            },
          },
          { upsert: true },
        );
      } catch (error: any) {
        // Concurrent requests from the same browser still count as one reader.
        if (error?.code !== 11000) throw error;
      }
      return NextResponse.json({ ok: true });
    }

    if (body.type === 'like') {
      const liked = body.liked === true;
      const existing = await BlogActivity.findOne({ blogId: blog._id, type: 'like', visitorId });

      if (liked && !existing) {
        try {
          await BlogActivity.create({
            blogId: blog._id,
            blogSlug: blog.slug,
            blogTitle: blog.title,
            type: 'like',
            visitorId,
            active: true,
            read: false,
          });
        } catch (error: any) {
          // If two requests race for the same like, the unique index keeps one record.
          if (error?.code !== 11000) throw error;
          await BlogActivity.updateOne(
            { blogId: blog._id, type: 'like', visitorId },
            { $set: { active: true, read: false, blogTitle: blog.title } },
          );
        }
      } else if (existing && existing.active !== liked) {
        existing.active = liked;
        if (liked) existing.read = false;
        await existing.save();
      }

      const [likes, currentLike] = await Promise.all([
        BlogActivity.countDocuments({ blogId: blog._id, type: 'like', active: true }),
        BlogActivity.exists({ blogId: blog._id, type: 'like', visitorId, active: true }),
      ]);
      return NextResponse.json({ likes, liked: Boolean(currentLike) });
    }

    if (body.type === 'comment') {
      const name = typeof body.name === 'string' ? body.name.trim().slice(0, 60) : '';
      const message = typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : '';
      if (name.length < 2 || message.length < 2) {
        return NextResponse.json({ error: 'Enter your name and a comment.' }, { status: 400 });
      }

      const recentComments = await BlogActivity.countDocuments({
        type: 'comment',
        visitorId,
        createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) },
      });
      if (recentComments >= 5) {
        return NextResponse.json({ error: 'Please wait before submitting another comment.' }, { status: 429 });
      }

      await BlogActivity.create({
        blogId: blog._id,
        blogSlug: blog.slug,
        blogTitle: blog.title,
        type: 'comment',
        visitorId,
        name,
        message,
        approved: false,
        read: false,
      });
      return NextResponse.json({ ok: true, message: 'Your comment was sent for review.' }, { status: 201 });
    }

    if (body.type === 'share') {
      const channel = body.channel === 'native' ? 'native' : 'copy';
      await BlogActivity.create({
        blogId: blog._id,
        blogSlug: blog.slug,
        blogTitle: blog.title,
        type: 'share',
        visitorId,
        channel,
        read: false,
      });
      const shares = await BlogActivity.countDocuments({ blogId: blog._id, type: 'share', active: true });
      return NextResponse.json({ ok: true, shares }, { status: 201 });
    }

    return NextResponse.json({ error: 'Unsupported activity' }, { status: 400 });
  } catch (error) {
    console.error('Failed to save blog activity:', error);
    return NextResponse.json({ error: 'Could not save activity. Please try again.' }, { status: 503 });
  }
}
