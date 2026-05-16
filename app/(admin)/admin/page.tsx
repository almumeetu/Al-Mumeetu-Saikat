import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import Project from '@/models/Project';
import Message from '@/models/Message';
import Subscriber from '@/models/Subscriber';
import Link from 'next/link';
import {
  FileText,
  FolderKanban,
  MessageSquare,
  Users,
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
] as const;

const quickActions = [
  { label: 'New Blog Post', href: '/admin/blogs/new', icon: FileText },
  { label: 'New Project', href: '/admin/projects/new', icon: FolderKanban },
  { label: 'Site Settings', href: '/admin/settings', icon: TrendingUp },
];

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
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome back. Here&apos;s what&apos;s happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
                <p className="mt-0.5 text-3xl font-extrabold gradient-text">{values[stat.key]}</p>
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
        <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
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
    </section>
  );
}
