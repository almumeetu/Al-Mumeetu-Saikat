import { connectDB } from '@/lib/db';
import Message from '@/models/Message';

export default async function AdminMessagesPage() {
  await connectDB();
  const messages = await Message.find({}).sort({ createdAt: -1 }).lean();

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Inbox
        </span>
        <h1 className="text-3xl font-extrabold">Messages</h1>
      </div>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message: any) => (
            <div key={message._id} className="card space-y-3 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{message.name}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{message.email}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
                  {message.read ? 'Read' : 'Unread'}
                </span>
              </div>
              <p className="font-medium">{message.subject || 'No subject'}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{message.message}</p>
            </div>
          ))
        ) : (
          <div className="card p-8 text-slate-600 dark:text-slate-400">No messages yet.</div>
        )}
      </div>
    </section>
  );
}