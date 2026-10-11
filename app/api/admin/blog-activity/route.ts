import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import BlogActivity from '@/models/BlogActivity';

async function requireAdmin() {
  return Boolean(await getServerSession(authOptions));
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    const activities = await BlogActivity.find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    return NextResponse.json(activities.map((activity: any) => ({
      id: activity._id.toString(),
      blogTitle: activity.blogTitle,
      blogSlug: activity.blogSlug,
      type: activity.type,
      name: activity.name || '',
      message: activity.message || '',
      channel: activity.channel || '',
      approved: Boolean(activity.approved),
      active: Boolean(activity.active),
      read: Boolean(activity.read),
      createdAt: new Date(activity.createdAt).toISOString(),
    })));
  } catch (error) {
    console.error('Failed to load blog activity:', error);
    return NextResponse.json({ error: 'Could not load blog activity' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    if (!await connectDB()) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    const { id, action } = await request.json();
    if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid activity id' }, { status: 400 });
    }
    if (!['read', 'approve', 'dismiss'].includes(action)) {
      return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
    }

    const activity = await BlogActivity.findById(id);
    if (!activity) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    if (action === 'approve' && activity.type !== 'comment') {
      return NextResponse.json({ error: 'Only comments can be approved' }, { status: 400 });
    }

    activity.read = true;
    if (action === 'approve') activity.approved = true;
    if (action === 'dismiss' && activity.type === 'comment') activity.active = false;
    await activity.save();

    return NextResponse.json({ ok: true, read: activity.read, approved: activity.approved, active: activity.active });
  } catch (error) {
    console.error('Failed to update blog activity:', error);
    return NextResponse.json({ error: 'Could not update blog activity' }, { status: 500 });
  }
}
