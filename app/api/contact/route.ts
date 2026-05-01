import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Message from '@/models/Message';
import { contactSchema } from '@/lib/validations';
import { sendMail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    await connectDB();
    await Message.create(data);

    await sendMail(
      process.env.EMAIL_FROM!,
      `New Message from ${data.name}`,
      `<h3>${data.subject || 'New Contact'}</h3>
       <p><b>From:</b> ${data.name} (${data.email})</p>
       <p>${data.message}</p>`,
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}