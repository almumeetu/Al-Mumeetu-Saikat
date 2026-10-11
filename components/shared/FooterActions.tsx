'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, ArrowUp, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success('Email copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy email');
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 text-xs font-medium text-slate-600 shadow-2xs transition hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
      title="Copy email to clipboard"
    >
      {copied ? (
        <>
          <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
          <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <Copy size={13} className="text-slate-400" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export function DhakaTimeDisplay() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <Clock size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span>
        Dhaka, BD{time ? <span className="font-mono text-slate-700 dark:text-slate-300"> · {time}</span> : ''}
      </span>
    </span>
  );
}

export function FooterBackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="group inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
      aria-label="Back to top"
    >
      <span>Back to top</span>
      <ArrowUp
        size={12}
        className="transition-transform duration-200 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
