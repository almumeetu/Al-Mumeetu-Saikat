'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiMongodb, SiPostgresql, SiMysql, SiRedis,
  SiPrisma, SiGraphql, SiDocker, SiGit, SiGithub,
  SiVercel, SiNetlify, SiFirebase, SiSupabase, SiCloudinary,
  SiStripe, SiSanity, SiWordpress, SiPhp, SiLaravel,
  SiPython, SiDjango, SiExpress, SiFigma, SiFramer,
  SiSass, SiVuedotjs, SiNuxt, SiSvelte, SiAstro,
  SiRemix, SiVite, SiWebpack, SiJest, SiCypress,
  SiStorybook, SiRedux, SiRecoil, SiPrisma as SiDrizzle,
  SiSocketdotio, SiTrpc, SiOpenai, SiHtml5, SiCss,
} from 'react-icons/si';
import { IconType } from 'react-icons';

export interface TechItem {
  label: string;
  icon: IconType;
  color: string; // tailwind bg color class
  textColor: string; // tailwind text color class
}

export const TECH_LIST: TechItem[] = [
  { label: 'React',        icon: SiReact,       color: 'bg-cyan-500/15',     textColor: 'text-cyan-500' },
  { label: 'Next.js',      icon: SiNextdotjs,   color: 'bg-slate-800/20',    textColor: 'text-slate-800 dark:text-slate-200' },
  { label: 'TypeScript',   icon: SiTypescript,  color: 'bg-blue-600/15',     textColor: 'text-blue-600' },
  { label: 'JavaScript',   icon: SiJavascript,  color: 'bg-yellow-400/20',   textColor: 'text-yellow-600' },
  { label: 'Tailwind CSS', icon: SiTailwindcss, color: 'bg-teal-500/15',     textColor: 'text-teal-500' },
  { label: 'Node.js',      icon: SiNodedotjs,   color: 'bg-green-600/15',    textColor: 'text-green-600' },
  { label: 'MongoDB',      icon: SiMongodb,     color: 'bg-green-500/15',    textColor: 'text-green-500' },
  { label: 'PostgreSQL',   icon: SiPostgresql,  color: 'bg-blue-700/15',     textColor: 'text-blue-700' },
  { label: 'MySQL',        icon: SiMysql,       color: 'bg-orange-500/15',   textColor: 'text-orange-500' },
  { label: 'Redis',        icon: SiRedis,       color: 'bg-red-500/15',      textColor: 'text-red-500' },
  { label: 'Prisma',       icon: SiPrisma,      color: 'bg-indigo-600/15',   textColor: 'text-indigo-600' },
  { label: 'GraphQL',      icon: SiGraphql,     color: 'bg-pink-600/15',     textColor: 'text-pink-600' },
  { label: 'Docker',       icon: SiDocker,      color: 'bg-blue-500/15',     textColor: 'text-blue-500' },
  { label: 'Git',          icon: SiGit,         color: 'bg-orange-600/15',   textColor: 'text-orange-600' },
  { label: 'GitHub',       icon: SiGithub,      color: 'bg-slate-700/15',    textColor: 'text-slate-700 dark:text-slate-300' },
  { label: 'Vercel',       icon: SiVercel,      color: 'bg-slate-900/10',    textColor: 'text-slate-900 dark:text-slate-100' },
  { label: 'Netlify',      icon: SiNetlify,     color: 'bg-teal-600/15',     textColor: 'text-teal-600' },
  { label: 'Firebase',     icon: SiFirebase,    color: 'bg-amber-500/15',    textColor: 'text-amber-500' },
  { label: 'Supabase',     icon: SiSupabase,    color: 'bg-emerald-500/15',  textColor: 'text-emerald-500' },
  { label: 'Cloudinary',   icon: SiCloudinary,  color: 'bg-blue-400/15',     textColor: 'text-blue-400' },
  { label: 'Stripe',       icon: SiStripe,      color: 'bg-violet-600/15',   textColor: 'text-violet-600' },
  { label: 'Sanity',       icon: SiSanity,      color: 'bg-red-600/15',      textColor: 'text-red-600' },
  { label: 'WordPress',    icon: SiWordpress,   color: 'bg-blue-800/15',     textColor: 'text-blue-800 dark:text-blue-400' },
  { label: 'PHP',          icon: SiPhp,         color: 'bg-indigo-500/15',   textColor: 'text-indigo-500' },
  { label: 'Laravel',      icon: SiLaravel,     color: 'bg-red-500/15',      textColor: 'text-red-500' },
  { label: 'Python',       icon: SiPython,      color: 'bg-yellow-500/15',   textColor: 'text-yellow-600' },
  { label: 'Django',       icon: SiDjango,      color: 'bg-green-800/15',    textColor: 'text-green-800 dark:text-green-400' },
  { label: 'Express',      icon: SiExpress,     color: 'bg-slate-600/15',    textColor: 'text-slate-600 dark:text-slate-300' },
  { label: 'Figma',        icon: SiFigma,       color: 'bg-purple-500/15',   textColor: 'text-purple-500' },
  { label: 'Framer Motion',icon: SiFramer,      color: 'bg-pink-500/15',     textColor: 'text-pink-500' },
  { label: 'Sass',         icon: SiSass,        color: 'bg-pink-400/15',     textColor: 'text-pink-400' },
  { label: 'Vue.js',       icon: SiVuedotjs,    color: 'bg-emerald-600/15',  textColor: 'text-emerald-600' },
  { label: 'Nuxt.js',      icon: SiNuxt,        color: 'bg-emerald-500/15',  textColor: 'text-emerald-500' },
  { label: 'Svelte',       icon: SiSvelte,      color: 'bg-orange-500/15',   textColor: 'text-orange-500' },
  { label: 'Astro',        icon: SiAstro,       color: 'bg-orange-700/15',   textColor: 'text-orange-700 dark:text-orange-400' },
  { label: 'Remix',        icon: SiRemix,       color: 'bg-slate-800/15',    textColor: 'text-slate-800 dark:text-slate-200' },
  { label: 'Vite',         icon: SiVite,        color: 'bg-purple-600/15',   textColor: 'text-purple-600' },
  { label: 'Webpack',      icon: SiWebpack,     color: 'bg-blue-400/15',     textColor: 'text-blue-400' },
  { label: 'Jest',         icon: SiJest,        color: 'bg-red-600/15',      textColor: 'text-red-600' },
  { label: 'Cypress',      icon: SiCypress,     color: 'bg-emerald-700/15',  textColor: 'text-emerald-700 dark:text-emerald-400' },
  { label: 'Storybook',    icon: SiStorybook,   color: 'bg-pink-600/15',     textColor: 'text-pink-600' },
  { label: 'Redux',        icon: SiRedux,       color: 'bg-purple-700/15',   textColor: 'text-purple-700' },
  { label: 'Zustand',      icon: SiRecoil,      color: 'bg-amber-600/15',    textColor: 'text-amber-600' },
  { label: 'tRPC',         icon: SiTrpc,        color: 'bg-blue-600/15',     textColor: 'text-blue-600' },
  { label: 'Socket.io',    icon: SiSocketdotio, color: 'bg-slate-700/15',    textColor: 'text-slate-700 dark:text-slate-300' },
  { label: 'OpenAI',       icon: SiOpenai,      color: 'bg-emerald-600/15',  textColor: 'text-emerald-600' },
  { label: 'HTML5',        icon: SiHtml5,       color: 'bg-orange-500/15',   textColor: 'text-orange-500' },
  { label: 'CSS3',         icon: SiCss,         color: 'bg-blue-500/15',     textColor: 'text-blue-500' },
];

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
}

export default function TechStackPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = TECH_LIST.filter((t) =>
    t.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (label: string) => {
    onChange(
      value.includes(label) ? value.filter((v) => v !== label) : [...value, label]
    );
  };

  const remove = (label: string) => onChange(value.filter((v) => v !== label));

  const selectedItems = value
    .map((v) => TECH_LIST.find((t) => t.label === v))
    .filter(Boolean) as TechItem[];

  return (
    <div ref={ref} className="relative">
      {/* Trigger box */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="min-h-[46px] w-full cursor-pointer rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm transition focus-within:border-primary dark:border-slate-700"
      >
        {selectedItems.length === 0 ? (
          <span className="flex items-center gap-2 text-slate-400 py-1">
            <ChevronDown size={14} /> Pick tech stack…
          </span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {selectedItems.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${item.color} ${item.textColor}`}
                >
                  <Icon size={12} />
                  {item.label}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); remove(item.label); }}
                    className="ml-0.5 opacity-60 hover:opacity-100"
                  >
                    <X size={10} />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          {/* Search */}
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
            <Search size={14} className="shrink-0 text-slate-400" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tech…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Options grid */}
          <div className="max-h-64 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">No match found</p>
            ) : (
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {filtered.map((item) => {
                  const Icon = item.icon;
                  const selected = value.includes(item.label);
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggle(item.label)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                        selected
                          ? `${item.color} ${item.textColor} ring-1 ring-current/30`
                          : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon size={14} className={selected ? item.textColor : 'text-slate-400'} />
                      <span className="truncate">{item.label}</span>
                      {selected && (
                        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {value.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2 dark:border-slate-800">
              <span className="text-xs text-slate-400">{value.length} selected</span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-red-400 hover:text-red-500"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
