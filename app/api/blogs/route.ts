import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import slugify from 'slugify';

export async function GET() {
  await connectDB();
  const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const data = await req.json();
    const slug = slugify(data.title, { lower: true, strict: true });
    const blog = await Blog.create({ ...data, slug });
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}