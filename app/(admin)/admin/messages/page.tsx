'use client';

import { useEffect, useState } from 'react';
import { Loader2, Trash2, MailOpen, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (!res.ok) throw new Error('Failed');
      setMessages(await res.json());
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (id: string, current: boolean) => {
    setActionId(id);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !current }),
      });
      if (!res.ok) throw new Error('Failed');
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: !current } : m))
      );
    } catch {
      toast.error('Failed to update message');
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message? This cannot be undone.')) return;
    setActionId(id + '-del');
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('Message deleted');
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch {
      toast.error('Failed to delete message');
    } finally {
      setActionId(null);
    }
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Messages</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {messages.length} total
            {unread > 0 && (
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {unread} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : messages.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <MessageSquare size={28} className="text-slate-400" />
          </div>
          <p className="font-semibold text-slate-700 dark:text-slate-300">No messages yet</p>
          <p className="text-sm text-slate-500">Messages from your contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`card space-y-3 p-5 transition-all hover:shadow-md ${
                !msg.read ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-bold">{msg.name}</h2>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-slate-500 hover:text-primary"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => toggleRead(msg._id, msg.read)}
                    disabled={actionId === msg._id}
                    className={`ml-2 flex h-8 w-8 items-center justify-center rounded-lg transition ${
                      msg.read
                        ? 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        : 'text-primary hover:bg-primary/10'
                    }`}
                    title={msg.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {actionId === msg._id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : msg.read ? (
                      <Mail size={15} />
                    ) : (
                      <MailOpen size={15} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    disabled={actionId === msg._id + '-del'}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-500/10"
                    title="Delete message"
                  >
                    {actionId === msg._id + '-del' ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>
                </div>
              </div>

              {msg.subject && (
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {msg.subject}
                </p>
              )}
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
