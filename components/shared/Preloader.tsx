'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible]   = useState(false);
  const [fadeOut, setFadeOut]   = useState(false);

  useEffect(() => {
    setVisible(true);
    const t1 = setTimeout(() => setFadeOut(true),  1800);
    const t2 = setTimeout(() => setVisible(false), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient glow — inline style avoids styled-jsx */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Spinning gradient ring */}
        <div className="relative h-20 w-20">
          <svg
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: '2s' }}
            viewBox="0 0 80 80"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="40" cy="40" r="36"
              stroke="url(#pl-ring)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="180 48"
            />
            <defs>
              <linearGradient id="pl-ring" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-xl font-extrabold text-transparent select-none">
              AL
            </span>
          </div>
        </div>

        {/* Name */}
        <p className="text-sm font-semibold tracking-[0.25em] text-slate-400 uppercase">
          Al Mumeetu Saikat
        </p>

        {/* Progress bar — CSS animation via inline keyframes in globals.css */}
        <div className="h-0.5 w-48 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-secondary preloader-bar" />
        </div>
      </div>
    </div>
  );
}
