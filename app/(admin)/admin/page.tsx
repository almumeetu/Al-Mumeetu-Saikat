import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import Project from '@/models/Project';
import Message from '@/models/Message';
import Subscriber from '@/models/Subscriber';
import BlogActivity from '@/models/BlogActivity';
import Link from 'next/link';
import {
  FileText,
  FolderKanban,
  MessageSquare,
  Users,
  Bell,
  TrendingUp,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const statConfig = [
  {
    label: 'Blog Posts',
    key: 'blogs' as const,
    icon: FileText,
    href: '/admin/blogs',
    color: 'from-indigo-500 to-violet-500',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    text: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    label: 'Projects',
    key: 'projects' as const,
    icon: FolderKanban,
    href: '/admin/projects',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-500/10',
    text: 'text-pink-600 dark:text-pink-400',
  },
  {
    label: 'Messages',
    key: 'messages' as const,
    icon: MessageSquare,
    href: '/admin/messages',
    color: 'from-cyan-500 to-sky-500',
    bg: 'bg-cyan-50 dark:bg-cyan-500/10',
    text: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    label: 'Subscribers',
    key: 'subscribers' as const,
    icon: Users,
    href: '/admin/subscribers',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    label: 'Blog Activity',
    key: 'activity' as const,
    icon: Bell,
    href: '/admin/blog-activity',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
  },
] as const;

const quickActions = [
  { label: 'New Blog Post', href: '/admin/blogs/new', icon: FileText },
  { label: 'New Project', href: '/admin/projects/new', icon: FolderKanban },
  { label: 'Site Settings', href: '/admin/settings', icon: TrendingUp },
];

export default async function AdminDashboardPage() {
  let values = { blogs: 0, projects: 0, messages: 0, subscribers: 0, activity: 0 };
  let recentActivity: any[] = [];

  try {
    await connectDB();
    const [blogs, projects, messages, subscribers, activity, recent] = await Promise.all([
      Blog.countDocuments(),
      Project.countDocuments(),
      Message.countDocuments(),
      Subscriber.countDocuments(),
      BlogActivity.countDocuments({ read: false }),
      BlogActivity.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ]);
    values = { blogs, projects, messages, subscribers, activity };
    recentActivity = recent;
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-medium">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome back. Here&apos;s what&apos;s happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        {statConfig.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.key}
              href={stat.href}
              className="group card flex items-center gap-5 p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}
              >
                <Icon size={24} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="mt-0.5 text-3xl font-medium gradient-text">{values[stat.key]}</p>
              </div>
              <ArrowRight
                size={16}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-primary dark:text-slate-600"
              />
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="mb-4 text-lg font-medium">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-primary dark:hover:bg-primary/10"
            >
              <Plus size={15} />
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 p-6 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-medium">Recent blog activity</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Reader likes, shares, and comments</p>
          </div>
          <Link href="/admin/blog-activity" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Open activity inbox <ArrowRight size={15} />
          </Link>
        </div>
        {recentActivity.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentActivity.map((activity: any) => (
              <Link key={activity._id.toString()} href="/admin/blog-activity" className="flex min-w-0 items-start gap-3 px-6 py-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${activity.type === 'like' ? 'bg-rose-500' : activity.type === 'comment' ? 'bg-sky-500' : 'bg-emerald-500'}`} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">
                    {activity.type === 'like' && `${activity.name || 'A reader'} liked “${activity.blogTitle}”`}
                    {activity.type === 'share' && `${activity.channel === 'native' ? 'A reader shared' : 'A reader copied'} “${activity.blogTitle}”`}
                    {activity.type === 'comment' && `${activity.name || 'Reader'} commented on “${activity.blogTitle}”`}
                  </span>
                  {activity.type === 'comment' && <span className="mt-1 block truncate text-xs text-slate-500">{activity.message}</span>}
                </span>
                {!activity.read && <span className="shrink-0 rounded-full bg-emerald-600/10 px-2 py-1 text-[10px] font-medium text-emerald-800 dark:text-emerald-300">New</span>}
              </Link>
            ))}
          </div>
        ) : (
          <p className="px-6 py-8 text-sm text-slate-500 dark:text-slate-400">No reader activity yet. Likes, shares, and comments will appear here.</p>
        )}
      </div>
    </section>
  );
}
