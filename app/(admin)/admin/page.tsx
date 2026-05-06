import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import Project from '@/models/Project';
import Message from '@/models/Message';
import Subscriber from '@/models/Subscriber';

export const dynamic = 'force-dynamic';

const stats = [
  { label: 'Blogs', key: 'blogs' },
  { label: 'Projects', key: 'projects' },
  { label: 'Messages', key: 'messages' },
  { label: 'Subscribers', key: 'subscribers' },
] as const;

export default async function AdminDashboardPage() {
  let values = { blogs: 0, projects: 0, messages: 0, subscribers: 0 };

  try {
    await connectDB();
    const [blogs, projects, messages, subscribers] = await Promise.all([
      Blog.countDocuments(),
      Project.countDocuments(),
      Message.countDocuments(),
      Subscriber.countDocuments(),
    ]);
    values = { blogs, projects, messages, subscribers };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
  }

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Overview
        </span>
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Quick snapshot of content and inbound activity across the portfolio site.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.key} className="card p-6">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
            <div className="mt-2 text-4xl font-extrabold gradient-text">{values[stat.key]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}