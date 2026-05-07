import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const blog = await Blog.findById(params.id).lean();
  return NextResponse.json(blog);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const data = await req.json();
  const blog = await Blog.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(blog);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}