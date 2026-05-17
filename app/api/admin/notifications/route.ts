import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Message from '@/models/Message';
import Subscriber from '@/models/Subscriber';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const [unreadMessages, totalSubscribers] = await Promise.all([
      Message.countDocuments({ read: false }),
      Subscriber.countDocuments({ active: true }),
    ]);

    return NextResponse.json({
      unreadMessages,
      totalSubscribers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
