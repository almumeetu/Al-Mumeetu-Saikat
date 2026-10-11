'use client';

import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import type { BlogReference } from '@/lib/blog-metadata';

type Props = {
  references: BlogReference[];
  onChange: (references: BlogReference[]) => void;
};

const inputCls = 'w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-700';

export default function BlogReferencesEditor({ references, onChange }: Props) {
  const update = (index: number, key: keyof BlogReference, value: string) => {
    onChange(references.map((reference, current) => current === index ? { ...reference, [key]: value } : reference));
  };

  return (
    <section className="card space-y-5 p-6" aria-labelledby="blog-references-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ExternalLink size={17} className="text-primary" />
            <h2 id="blog-references-heading" className="font-semibold">References &amp; sources</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">Add sources readers can open from the published article.</p>
        </div>
        <button
          type="button"
          onClick={() => onChange([...references, { label: '', url: '' }])}
          disabled={references.length >= 20}
          className="inline-flex items-center gap-2 rounded-xl border border-primary/20 px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-500/30 dark:text-emerald-300"
        >
          <Plus size={15} /> Add link
        </button>
      </div>

      {references.length ? (
        <ol className="space-y-3">
          {references.map((reference, index) => (
            <li key={index} className="grid gap-3 rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800 sm:grid-cols-[minmax(0,0.8fr),minmax(0,1.2fr),auto] sm:items-end">
              <div>
                <label htmlFor={`reference-label-${index}`} className="mb-2 block text-xs font-medium text-slate-600 dark:text-slate-300">Link title</label>
                <input
                  id={`reference-label-${index}`}
                  value={reference.label}
                  onChange={(event) => update(index, 'label', event.target.value)}
                  placeholder="Article, paper, or source name"
                  maxLength={120}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor={`reference-url-${index}`} className="mb-2 block text-xs font-medium text-slate-600 dark:text-slate-300">URL</label>
                <input
                  id={`reference-url-${index}`}
                  type="url"
                  value={reference.url}
                  onChange={(event) => update(index, 'url', event.target.value)}
                  placeholder="https://example.com/source"
                  className={inputCls}
                />
              </div>
              <button
                type="button"
                onClick={() => onChange(references.filter((_, current) => current !== index))}
                aria-label={`Remove reference ${index + 1}`}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-7 text-center dark:border-slate-700">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">No references added</p>
          <p className="mt-1 text-xs text-slate-500">References are optional. Add a link when your post cites an outside source.</p>
        </div>
      )}
    </section>
  );
}
