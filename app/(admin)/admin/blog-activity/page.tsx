'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Bell, Check, ExternalLink, Heart, Loader2, MessageCircle, Share2, X } from 'lucide-react';
import toast from 'react-hot-toast';

type Activity = {
  id: string;
  blogTitle: string;
  blogSlug: string;
  type: 'like' | 'comment' | 'share';
  name: string;
  message: string;
  channel: string;
  approved: boolean;
  active: boolean;
  read: boolean;
  createdAt: string;
};

const activityIcon = {
  like: Heart,
  comment: MessageCircle,
  share: Share2,
};

export default function BlogActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/blog-activity', { cache: 'no-store' });
      if (!response.ok) throw new Error('Could not load activity');
      setActivities(await response.json());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not load activity');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchActivities(); }, [fetchActivities]);

  const updateActivity = async (activity: Activity, action: 'read' | 'approve' | 'dismiss') => {
    setBusyId(activity.id);
    try {
      const response = await fetch('/api/admin/blog-activity', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: activity.id, action }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not update activity');
      setActivities((current) => current.map((item) => item.id === activity.id
        ? { ...item, read: data.read, approved: data.approved, active: data.active }
        : item));
      if (action === 'approve') toast.success('Comment approved and published');
      if (action === 'dismiss') toast.success('Comment rejected');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not update activity');
    } finally {
      setBusyId(null);
    }
  };

  const unreadCount = activities.filter((activity) => !activity.read).length;
  const pendingCount = activities.filter((activity) => activity.type === 'comment' && !activity.approved && activity.active).length;

  return (
    <section className="min-w-0 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow"><Bell size={14} /> Reader activity</span>
          <h1 className="mt-2 text-2xl font-medium sm:text-3xl">Blog Activity</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Likes, shares, and comments from your published stories.</p>
        </div>
        <div className="flex gap-2 text-xs font-medium">
          <span className="rounded-full bg-emerald-600/10 px-3 py-1.5 text-emerald-800 dark:text-emerald-300">{unreadCount} unread</span>
          <span className="rounded-full bg-amber-500/10 px-3 py-1.5 text-amber-800 dark:text-amber-300">{pendingCount} pending comments</span>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-primary" /></div>
      ) : activities.length === 0 ? (
        <div className="card flex flex-col items-center px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300"><Bell size={23} /></div>
          <h2 className="mt-4 text-lg font-medium">No reader activity yet</h2>
          <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">When someone likes, shares, or comments on a published story, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activityIcon[activity.type];
            const isBusy = busyId === activity.id;
            return (
              <article key={activity.id} className={`card min-w-0 p-4 sm:p-5 ${!activity.read ? 'border-emerald-700/25 dark:border-emerald-500/30' : ''}`}>
                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.type === 'like' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300' : activity.type === 'comment' ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'}`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold capitalize text-slate-900 dark:text-white">{activity.type}</span>
                        {!activity.read && <span className="h-2 w-2 rounded-full bg-emerald-500" aria-label="Unread" />}
                        {activity.type === 'comment' && (
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${activity.approved && activity.active ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : activity.active ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                            {!activity.active ? 'Rejected' : activity.approved ? 'Published' : 'Pending review'}
                          </span>
                        )}
                        {activity.type === 'like' && !activity.active && <span className="text-xs text-slate-500">Unlike</span>}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {activity.type === 'like' && `${activity.name || 'A reader'} liked this story.`}
                        {activity.type === 'share' && `${activity.channel === 'native' ? 'A reader shared' : 'A reader copied the link to'} this story.`}
                        {activity.type === 'comment' && <><span className="font-medium text-slate-900 dark:text-white">{activity.name || 'Reader'} commented:</span> {activity.message}</>}
                      </p>
                      <Link href={`/blog/${activity.blogSlug}`} target="_blank" className="mt-2 inline-flex max-w-full items-center gap-1 truncate text-xs font-medium text-emerald-800 hover:underline dark:text-emerald-300">
                        {activity.blogTitle} <ExternalLink size={12} className="shrink-0" />
                      </Link>
                      <time dateTime={activity.createdAt} className="mt-1 block text-xs text-slate-400">
                        {new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(activity.createdAt))}
                      </time>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pl-4">
                    {activity.type === 'comment' && activity.active && (
                      <>
                        {!activity.approved && (
                          <button type="button" disabled={isBusy} onClick={() => updateActivity(activity, 'approve')} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-700 px-3 text-xs font-medium text-white transition hover:bg-emerald-800 disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500">
                            {isBusy ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Approve
                          </button>
                        )}
                        <button type="button" disabled={isBusy} onClick={() => updateActivity(activity, 'dismiss')} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-500/40 dark:hover:text-red-300">
                          <X size={14} /> {activity.approved ? 'Remove' : 'Reject'}
                        </button>
                      </>
                    )}
                    {!activity.read && (
                      <button type="button" disabled={isBusy} onClick={() => updateActivity(activity, 'read')} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:border-emerald-700/40 hover:text-emerald-800 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:text-emerald-300">
                        <Check size={14} /> Mark read
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
