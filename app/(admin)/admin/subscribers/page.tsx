'use client';

import { useEffect, useState } from 'react';
import { Loader2, Trash2, Users, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface Subscriber {
  _id: string;
  email: string;
  active: boolean;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/subscribe');
      if (!res.ok) throw new Error('Failed');
      setSubscribers(await res.json());
    } catch {
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Remove ${email} from subscribers?`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/subscribers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('Subscriber removed');
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch {
      toast.error('Failed to remove subscriber');
    } finally {
      setDeleting(null);
    }
  };

  const active = subscribers.filter((s) => s.active).length;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Subscribers</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {subscribers.length} total · {active} active
          </p>
        </div>
        {subscribers.length > 0 && (
          <a
            href={`mailto:?bcc=${subscribers.map((s) => s.email).join(',')}`}
            className="btn-outline text-sm"
          >
            <Mail size={15} />
            Email All
          </a>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : subscribers.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <Users size={28} className="text-slate-400" />
          </div>
          <p className="font-semibold text-slate-700 dark:text-slate-300">No subscribers yet</p>
          <p className="text-sm text-slate-500">People who subscribe via your newsletter will appear here.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {subscribers.map((sub) => (
                <tr key={sub._id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 font-medium">{sub.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        sub.active
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {sub.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(sub._id, sub.email)}
                      disabled={deleting === sub._id}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-500/10"
                      title="Remove subscriber"
                    >
                      {deleting === sub._id ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <Trash2 size={15} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
