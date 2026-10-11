import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import BlogActivity from '@/models/BlogActivity';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  const blogs = await Blog.find({}).sort({ publishedAt: -1, createdAt: -1 }).lean();
  const readerCounts = await BlogActivity.aggregate([
    { $match: { type: 'view', active: true } },
    { $group: { _id: '$blogId', count: { $sum: 1 } } },
  ]);
  const readersByBlogId = new Map<string, number>();
  readerCounts.forEach((item: { _id: { toString(): string }; count: number }) => {
    readersByBlogId.set(item._id.toString(), item.count);
  });
  return NextResponse.json(blogs.map((blog: any) => ({
    ...blog,
    uniqueReaders: readersByBlogId.get(blog._id.toString()) || 0,
  })));
}
