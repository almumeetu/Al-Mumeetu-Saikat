'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setVisible(scrollY > 400);
    setProgress(docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Sync initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle math
  const size = 48;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${
        visible
          ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
          : 'translate-y-6 scale-75 opacity-0 pointer-events-none'
      }`}
    >
      {/* Hover glow */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200/60 dark:text-slate-700/50"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#btt-grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
        />
        <defs>
          <linearGradient id="btt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>

      {/* Button face */}
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 shadow-lg shadow-slate-900/10 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-emerald-500/40 group-hover:shadow-xl group-hover:shadow-emerald-500/20 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-slate-950/30 dark:group-hover:border-emerald-500/40 dark:group-hover:shadow-emerald-500/20">
        <ArrowUp
          size={16}
          strokeWidth={2.5}
          className="text-slate-500 transition-colors duration-300 group-hover:text-emerald-700 dark:text-slate-400 dark:group-hover:text-emerald-400"
        />
      </span>
    </button>
  );
}
