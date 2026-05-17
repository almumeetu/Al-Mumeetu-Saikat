'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check, Plus } from 'lucide-react';

export const DEFAULT_PROJECT_CATEGORIES = [
  'Frontend',
  'Full-Stack',
  'Ecommerce',
  'Portfolio/Agency',
  'Realstate',
  'Landing Pages',
];

// Distinct color per category (fallback for custom ones too)
const PALETTE = [
  { bg: 'bg-cyan-500/15',    text: 'text-cyan-600' },
  { bg: 'bg-violet-500/15',  text: 'text-violet-600' },
  { bg: 'bg-emerald-500/15', text: 'text-emerald-600' },
  { bg: 'bg-amber-500/15',   text: 'text-amber-600' },
  { bg: 'bg-rose-500/15',    text: 'text-rose-600' },
  { bg: 'bg-blue-500/15',    text: 'text-blue-600' },
  { bg: 'bg-orange-500/15',  text: 'text-orange-600' },
  { bg: 'bg-pink-500/15',    text: 'text-pink-600' },
  { bg: 'bg-teal-500/15',    text: 'text-teal-600' },
  { bg: 'bg-indigo-500/15',  text: 'text-indigo-600' },
];

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  'Frontend':         PALETTE[0],
  'Full-Stack':       PALETTE[1],
  'Ecommerce':        PALETTE[2],
  'Portfolio/Agency': PALETTE[3],
  'Realstate':        PALETTE[4],
  'Landing Pages':    PALETTE[5],
};

function colorFor(cat: string, allCats: string[]) {
  if (CAT_COLORS[cat]) return CAT_COLORS[cat];
  // deterministic color for custom categories
  const idx = allCats.indexOf(cat) % PALETTE.length;
  return PALETTE[Math.max(0, idx)];
}

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
}

export default function CategoryPicker({ value, onChange }: Props) {
  const [open, setOpen]           = useState(false);
  const [customInput, setCustom]  = useState('');
  // extra categories added at runtime (persisted in component state)
  const [extra, setExtra]         = useState<string[]>([]);
  const ref                       = useRef<HTMLDivElement>(null);
  const inputRef                  = useRef<HTMLInputElement>(null);

  const allCategories = [...DEFAULT_PROJECT_CATEGORIES, ...extra];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (cat: string) => {
    onChange(value.includes(cat) ? value.filter((v) => v !== cat) : [...value, cat]);
  };

  const remove = (cat: string) => onChange(value.filter((v) => v !== cat));

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (!allCategories.includes(trimmed)) {
      setExtra((prev) => [...prev, trimmed]);
    }
    // auto-select it
    if (!value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setCustom('');
    inputRef.current?.focus();
  };

  const handleCustomKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); addCustom(); }
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="min-h-[46px] w-full cursor-pointer rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm transition hover:border-primary/50 focus-within:border-primary dark:border-slate-700"
      >
        {value.length === 0 ? (
          <span className="flex items-center gap-2 py-1 text-slate-400">
            <ChevronDown size={14} /> Select or add categories…
          </span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {value.map((cat) => {
              const c = colorFor(cat, allCategories);
              return (
                <span
                  key={cat}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${c.bg} ${c.text}`}
                >
                  {cat}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); remove(cat); }}
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
          {/* Existing options */}
          <div className="max-h-52 overflow-y-auto p-2 space-y-0.5">
            {allCategories.map((cat) => {
              const selected = value.includes(cat);
              const c = colorFor(cat, allCategories);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggle(cat)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    selected
                      ? `${c.bg} ${c.text}`
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      selected
                        ? 'border-current bg-current/20'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {selected && <Check size={10} strokeWidth={3} />}
                  </span>
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Add custom category */}
          <div className="border-t border-slate-100 p-2 dark:border-slate-800">
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-2 dark:border-slate-600 focus-within:border-primary">
              <Plus size={13} className="shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={customInput}
                onChange={(e) => setCustom(e.target.value)}
                onKeyDown={handleCustomKeyDown}
                placeholder="Add custom category…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              {customInput.trim() && (
                <button
                  type="button"
                  onClick={addCustom}
                  className="rounded-lg bg-primary px-2 py-0.5 text-xs font-bold text-white"
                >
                  Add
                </button>
              )}
            </div>
            <p className="mt-1.5 px-1 text-[11px] text-slate-400">Press Enter or click Add</p>
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
