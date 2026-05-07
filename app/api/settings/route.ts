import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';

// Helper: get or create the singleton doc
async function getSettings() {
  const existing = await SiteSettings.findById('singleton').lean();
  if (existing) return existing;
  const created = await SiteSettings.create({ _id: 'singleton' });
  return created.toObject();
}

export async function GET() {
  try {
    await connectDB();
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const data = await req.json();

    // Make sure we never accidentally change _id
    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;

    const updated = await SiteSettings.findByIdAndUpdate(
      'singleton',
      { $set: data },
      { new: true, upsert: true, runValidators: true },
    ).lean();

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
