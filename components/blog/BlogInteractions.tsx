'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Eye, Heart, MessageCircle, Send, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

type CommentItem = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type ActivitySummary = {
  likes: number;
  shares: number;
  views: number;
  commentCount: number;
  liked: boolean;
  comments: CommentItem[];
};

function getOrCreateVisitorId() {
  const key = 'saikat-blog-visitor';
  let visitorId = window.localStorage.getItem(key);
  if (!visitorId) {
    visitorId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(key, visitorId);
  }
  return visitorId;
}

export default function BlogInteractions({
  slug,
  title,
  excerpt,
  initialLikes = 0,
  initialShares = 0,
  initialViews = 0,
  initialComments = [],
  initialCommentCount,
}: {
  slug: string;
  title: string;
  excerpt: string;
  initialLikes?: number;
  initialShares?: number;
  initialViews?: number;
  initialCommentCount?: number;
  initialComments?: CommentItem[];
}) {
  const [visitorId, setVisitorId] = useState('');
  const [likes, setLikes] = useState(initialLikes);
  const [shares, setShares] = useState(initialShares);
  const [views, setViews] = useState(initialViews);
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [commentCount, setCommentCount] = useState(initialCommentCount ?? initialComments.length);
  const [liked, setLiked] = useState(false);
  const [ready, setReady] = useState(false);
  const [likeBusy, setLikeBusy] = useState(false);
  const [shareBusy, setShareBusy] = useState(false);
  const [commentBusy, setCommentBusy] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const endpoint = `/api/blogs/activity/${encodeURIComponent(slug)}`;

  useEffect(() => {
    let active = true;
    try {
      const id = getOrCreateVisitorId();
      setVisitorId(id);
      const activityRequest = fetch(`${endpoint}?visitorId=${encodeURIComponent(id)}`, { cache: 'no-store' })
        .then(async (response) => {
          if (!response.ok) throw new Error('Activity could not be loaded');
          return response.json() as Promise<ActivitySummary>;
        })
        .then((data) => {
          if (!active) return;
          setLikes(data.likes || 0);
          setShares(data.shares || 0);
          setCommentCount(data.commentCount || 0);
          setComments(Array.isArray(data.comments) ? data.comments : []);
          setLiked(Boolean(data.liked));
        })
        .catch(() => undefined);
      const viewRequest = fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'view', visitorId: id }),
      })
        .then(async (response) => {
          if (!response.ok) return;
          const data = await response.json() as { views?: number };
          if (active && typeof data.views === 'number') setViews(data.views);
        })
        .catch(() => undefined);
      Promise.all([activityRequest, viewRequest]).finally(() => {
        if (active) setReady(true);
      });
    } catch {
      if (active) setReady(true);
    }
    return () => { active = false; };
  }, [endpoint]);

  const postActivity = async (body: Record<string, unknown>) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, visitorId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not save activity');
    return data;
  };

  const toggleLike = async () => {
    if (!ready || !visitorId || likeBusy) return;
    const nextLiked = !liked;
    setLikeBusy(true);
    try {
      const data = await postActivity({ type: 'like', liked: nextLiked });
      setLiked(data.liked);
      setLikes(data.likes);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save your like');
    } finally {
      setLikeBusy(false);
    }
  };

  const shareStory = async () => {
    if (!ready || !visitorId || shareBusy) return;
    setShareBusy(true);
    let channel: 'native' | 'copy' = 'copy';
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ title, text: excerpt, url });
        channel = 'native';
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('textarea');
        input.value = url;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        if (!copied) throw new Error('Could not copy the story link');
      }

      const data = await postActivity({ type: 'share', channel });
      setShares(data.shares);
      toast.success(channel === 'native' ? 'Thanks for sharing this story.' : 'Story link copied.');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      toast.error(error instanceof Error ? error.message : 'Could not share this story');
    } finally {
      setShareBusy(false);
    }
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ready || !visitorId || commentBusy) return;
    setCommentBusy(true);
    try {
      const data = await postActivity({ type: 'comment', name, message });
      setName('');
      setMessage('');
      toast.success(data.message || 'Your comment was sent for review.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not submit your comment');
    } finally {
      setCommentBusy(false);
    }
  };

  const stats = [
    { label: 'Unique readers', value: views, icon: Eye, color: 'text-sky-700 dark:text-sky-300', iconBg: 'bg-sky-500/10' },
    { label: 'Likes', value: likes, icon: Heart, color: 'text-rose-600 dark:text-rose-300', iconBg: 'bg-rose-500/10' },
    { label: 'Comments', value: commentCount, icon: MessageCircle, color: 'text-violet-700 dark:text-violet-300', iconBg: 'bg-violet-500/10' },
    { label: 'Shares', value: shares, icon: Share2, color: 'text-emerald-700 dark:text-emerald-300', iconBg: 'bg-emerald-500/10' },
  ];

  return (
    <>
      <section aria-label="Reader activity" className="mt-12 overflow-hidden rounded-[1.75rem] border border-emerald-800/10 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 shadow-lg shadow-emerald-950/[0.06] dark:border-emerald-400/10 dark:from-emerald-950/35 dark:via-slate-900 dark:to-slate-900 sm:mt-16 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800 dark:text-emerald-300">Reader activity</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">This story is reaching people</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">One reader is counted once per browser.</p>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4 sm:gap-4">
          {stats.map(({ label, value, icon: Icon, color, iconBg }) => (
            <div key={label} className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/45 sm:p-5">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} ${color}`}><Icon size={17} /></div>
              <dt className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-400 sm:text-sm">{label}</dt>
              <dd className="mt-0.5 text-2xl font-semibold tabular-nums tracking-tight text-slate-950 dark:text-white">{new Intl.NumberFormat('en').format(value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav aria-label="Story actions" className="fixed inset-x-3 bottom-4 z-40 mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] items-center gap-1 rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-xl shadow-slate-900/15 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95 sm:bottom-6 sm:gap-2 sm:p-2">
        <button
          type="button"
          onClick={toggleLike}
          disabled={!ready || likeBusy}
          aria-pressed={liked}
          aria-label={`Like this story, ${likes} likes`}
          className={`inline-flex h-10 items-center gap-1.5 rounded-xl px-2.5 text-xs font-semibold transition disabled:cursor-wait disabled:opacity-60 sm:gap-2 sm:px-3 sm:text-sm ${liked
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300'
            : 'text-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-200 dark:hover:bg-rose-500/10 dark:hover:text-rose-300'}`}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> <span className="hidden sm:inline">Like</span> <span>{likes}</span>
        </button>
        <button
          type="button"
          onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          aria-label={`Comment on this story, ${commentCount} comments`}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl px-2.5 text-xs font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 sm:gap-2 sm:px-3 sm:text-sm"
        >
          <MessageCircle size={16} /> <span className="hidden sm:inline">Comment</span> <span>{commentCount}</span>
        </button>
        <button
          type="button"
          onClick={shareStory}
          disabled={!ready || shareBusy}
          aria-label={`Share this story, ${shares} shares`}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-700 px-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500 sm:gap-2 sm:px-3 sm:text-sm"
        >
          <Share2 size={16} /> <span className="hidden sm:inline">Share</span> <span>{shares}</span>
        </button>
      </nav>
      <section className="mt-14 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:mt-20" aria-labelledby="conversation-title">
      <div className="p-5 sm:p-7">
        <div>
          <h2 id="conversation-title" className="text-xl font-medium tracking-tight text-slate-950 dark:text-white">Join the conversation</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">If this story helped or resonated, let me know.</p>
        </div>
      </div>

      <div id="comments" className="scroll-mt-24 border-t border-slate-200/80 p-5 dark:border-slate-800 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr]">
          <div>
            <h3 className="text-base font-medium text-slate-950 dark:text-white">Reader comments <span className="text-slate-400">({commentCount})</span></h3>
            {comments.length > 0 ? (
              <ul className="mt-5 space-y-4">
                {comments.map((comment) => (
                  <li key={comment.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{comment.name}</p>
                      <time dateTime={comment.createdAt} className="text-xs text-slate-500 dark:text-slate-400">
                        {new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(comment.createdAt))}
                      </time>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600 dark:text-slate-300">{comment.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:bg-slate-950/70 dark:text-slate-400">No comments yet. You can start the conversation.</p>
            )}
          </div>

          <form onSubmit={submitComment} className="space-y-4 rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800 sm:p-5">
            <div>
              <h3 className="text-base font-medium text-slate-950 dark:text-white">Leave a comment</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Comments appear after a quick review.</p>
            </div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Your name
              <input
                required
                minLength={2}
                maxLength={60}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Name"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Comment
              <textarea
                required
                minLength={2}
                maxLength={2000}
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-6 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Share a thoughtful response…"
              />
            </label>
            <button type="submit" disabled={!ready || commentBusy} className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
              <Send size={15} /> {commentBusy ? 'Sending…' : 'Submit comment'}
            </button>
          </form>
        </div>
      </div>
      </section>
    </>
  );
}
