import { connectDB } from '@/lib/db';
import Subscriber from '@/models/Subscriber';

export const dynamic = 'force-dynamic';

export default async function AdminSubscribersPage() {
  await connectDB();
  const subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).lean();

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Audience
        </span>
        <h1 className="text-3xl font-extrabold">Subscribers</h1>
      </div>

      <div className="space-y-4">
        {subscribers.length > 0 ? (
          subscribers.map((subscriber: any) => (
            <div key={subscriber._id} className="card flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <h2 className="text-lg font-semibold">{subscriber.email}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{subscriber.active ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="card p-8 text-slate-600 dark:text-slate-400">No subscribers yet.</div>
        )}
      </div>
    </section>
  );
}