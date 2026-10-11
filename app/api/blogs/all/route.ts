import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  const blogs = await Blog.find({}).sort({ publishedAt: -1, createdAt: -1 }).lean();
  return NextResponse.json(blogs);
}
