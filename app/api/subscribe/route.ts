import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import { subscribeSchema } from '@/lib/validations';
import { sendMail } from '@/lib/mailer';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(subscribers);
}

export async function POST(req: Request) {
  try {
    const { email } = subscribeSchema.parse(await req.json());
    await connectDB();

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 400 });
    }

    await Subscriber.create({ email });
    await sendMail(
      email,
      'Welcome to Al Mumeetu Newsletter 🎉',
      `<h2>Thanks for subscribing!</h2><p>You'll get updates on new projects & blogs.</p>`,
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}