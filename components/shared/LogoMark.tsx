import React from 'react';

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export default function LogoMark({ className = 'h-9 w-9', size = 36 }: LogoMarkProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl overflow-hidden shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 48 48"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#080c10" />
            <stop offset="50%" stopColor="#052319" />
            <stop offset="100%" stopColor="#02140e" />
          </linearGradient>
          <linearGradient id="logoStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="logoAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="60%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="logoBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(52, 211, 153, 0.55)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.15)" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="rgba(16, 185, 129, 0.4)" />
          </filter>
        </defs>

        {/* Squircle Base */}
        <rect
          x="1.5"
          y="1.5"
          width="45"
          height="45"
          rx="12"
          fill="url(#logoBg)"
          stroke="url(#logoBorder)"
          strokeWidth="1.5"
        />

        {/* A-Frame Architectural Chevron */}
        <path
          d="M13.5 35 L24 13 L34.5 35"
          stroke="url(#logoStroke)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#logoGlow)"
        />

        {/* S-Curve Dynamic Weave */}
        <path
          d="M31.5 20.5 C27.5 17 21 18.5 21 23 C21 27.5 27 27 27 31.5 C27 35 22 36 16.5 33.5"
          stroke="url(#logoAccent)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Core Precision Diamond */}
        <polygon points="24,19 26,22 24,25 22,22" fill="#34d399" opacity="0.9" />
      </svg>
    </div>
  );
}
