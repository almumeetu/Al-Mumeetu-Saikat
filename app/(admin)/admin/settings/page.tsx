'use client';

import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import {
  User,
  Share2,
  Info,
  Layers,
  Briefcase,
  Save,
  Plus,
  Trash2,
  Loader2,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExperienceEntry {
  year: string;
  title: string;
  description: string;
}

interface Settings {
  heroName: string;
  heroTagline: string;
  heroBio: string;
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  upworkUrl: string;
  email: string;
  aboutHeadline: string;
  aboutBio: string;
  aboutBio2: string;
  statYearsExp: string;
  statProjects: string;
  statSatisfaction: string;
  skillsFrontend: string[];
  skillsBackend: string[];
  skillsDevops: string[];
  experience: ExperienceEntry[];
}

const TABS = [
  { id: 'hero', label: 'Hero', icon: User },
  { id: 'social', label: 'Social Links', icon: Share2 },
  { id: 'about', label: 'About', icon: Info },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'experience', label: 'Experience', icon: Briefcase },
] as const;

type TabId = (typeof TABS)[number]['id'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-slate-700';
const textareaCls = inputCls + ' resize-none';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">{label}</label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<TabId>('hero');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Derived skill strings for controlled textareas
  const [frontendStr, setFrontendStr] = useState('');
  const [backendStr, setBackendStr] = useState('');
  const [devopsStr, setDevopsStr] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setFrontendStr((data.skillsFrontend ?? []).join(', '));
        setBackendStr((data.skillsBackend ?? []).join(', '));
        setDevopsStr((data.skillsDevops ?? []).join(', '));
      })
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const set = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) =>
      setSettings((s) => s && { ...s, [key]: value }),
    [],
  );

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const payload: Settings = {
        ...settings,
        skillsFrontend: frontendStr.split(',').map((s) => s.trim()).filter(Boolean),
        skillsBackend: backendStr.split(',').map((s) => s.trim()).filter(Boolean),
        skillsDevops: devopsStr.split(',').map((s) => s.trim()).filter(Boolean),
      };
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success('Settings saved!');
    } catch (err: any) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  // ── Experience helpers ─────────────────────────────────
  const addExp = () =>
    set('experience', [
      { year: '', title: '', description: '' },
      ...(settings?.experience ?? []),
    ]);

  const removeExp = (i: number) =>
    set(
      'experience',
      (settings?.experience ?? []).filter((_, idx) => idx !== i),
    );

  const updateExp = (i: number, key: keyof ExperienceEntry, val: string) =>
    set(
      'experience',
      (settings?.experience ?? []).map((e, idx) =>
        idx === i ? { ...e, [key]: val } : e,
      ),
    );

  // ─── Render ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={36} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="card p-8 text-center text-slate-500">
        Could not load settings. Is MongoDB connected?
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Configuration
          </span>
          <h1 className="text-3xl font-extrabold">Site Settings</h1>
          <p className="text-sm text-slate-500">
            Manage all your portfolio content from one place.
          </p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-0 dark:border-slate-800">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 rounded-t-lg px-5 py-2.5 text-sm font-semibold transition
              ${
                tab === id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-slate-500 hover:text-primary'
              }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB: Hero ─────────────────────────────────────────── */}
      {tab === 'hero' && (
        <div className="card space-y-6 p-8">
          <ImageUploader
            label="Profile / Avatar Image"
            value={settings.avatarUrl}
            onChange={(url) => set('avatarUrl', url)}
          />
          <Field label="Full Name">
            <input
              className={inputCls}
              value={settings.heroName}
              onChange={(e) => set('heroName', e.target.value)}
            />
          </Field>
          <Field label="Role / Tagline">
            <input
              className={inputCls}
              value={settings.heroTagline}
              onChange={(e) => set('heroTagline', e.target.value)}
            />
          </Field>
          <Field label="Hero Bio" hint="Short paragraph shown below the role.">
            <textarea
              className={textareaCls}
              rows={4}
              value={settings.heroBio}
              onChange={(e) => set('heroBio', e.target.value)}
            />
          </Field>
        </div>
      )}

      {/* ── TAB: Social Links ─────────────────────────────────── */}
      {tab === 'social' && (
        <div className="card space-y-5 p-8">
          {(
            [
              ['Email', 'email', 'mailto:…'],
              ['GitHub URL', 'githubUrl', 'https://github.com/…'],
              ['LinkedIn URL', 'linkedinUrl', 'https://linkedin.com/in/…'],
              ['Twitter / X URL', 'twitterUrl', 'https://twitter.com/…'],
              ['Upwork URL', 'upworkUrl', 'https://upwork.com/freelancers/…'],
            ] as [string, keyof Settings, string][]
          ).map(([label, key, placeholder]) => (
            <Field key={key} label={label}>
              <input
                className={inputCls}
                type={key === 'email' ? 'email' : 'url'}
                value={settings[key] as string}
                placeholder={placeholder}
                onChange={(e) => set(key, e.target.value)}
              />
            </Field>
          ))}
        </div>
      )}

      {/* ── TAB: About ────────────────────────────────────────── */}
      {tab === 'about' && (
        <div className="card space-y-5 p-8">
          <Field label="Section Headline">
            <input
              className={inputCls}
              value={settings.aboutHeadline}
              onChange={(e) => set('aboutHeadline', e.target.value)}
            />
          </Field>
          <Field label="Bio Paragraph 1">
            <textarea
              className={textareaCls}
              rows={4}
              value={settings.aboutBio}
              onChange={(e) => set('aboutBio', e.target.value)}
            />
          </Field>
          <Field label="Bio Paragraph 2 (Education / Goals)">
            <textarea
              className={textareaCls}
              rows={3}
              value={settings.aboutBio2}
              onChange={(e) => set('aboutBio2', e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                ['Years of Experience', 'statYearsExp'],
                ['Projects Delivered', 'statProjects'],
                ['Client Satisfaction', 'statSatisfaction'],
              ] as [string, keyof Settings][]
            ).map(([label, key]) => (
              <Field key={key} label={label}>
                <input
                  className={inputCls}
                  value={settings[key] as string}
                  onChange={(e) => set(key, e.target.value)}
                />
              </Field>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: Skills ───────────────────────────────────────── */}
      {tab === 'skills' && (
        <div className="card space-y-5 p-8">
          <p className="text-sm text-slate-500">Enter skills as a comma-separated list.</p>
          <Field label="Frontend">
            <textarea
              className={textareaCls}
              rows={3}
              value={frontendStr}
              onChange={(e) => setFrontendStr(e.target.value)}
              placeholder="Next.js 15, React 19, TypeScript, Tailwind CSS"
            />
          </Field>
          <Field label="Backend">
            <textarea
              className={textareaCls}
              rows={3}
              value={backendStr}
              onChange={(e) => setBackendStr(e.target.value)}
              placeholder="PostgreSQL, Supabase, SQLite, Prisma/Drizzle ORM"
            />
          </Field>
          <Field label="Tools & DevOps">
            <textarea
              className={textareaCls}
              rows={3}
              value={devopsStr}
              onChange={(e) => setDevopsStr(e.target.value)}
              placeholder="Docker, GitLab CI/CD, pnpm, Linux Server Deployment"
            />
          </Field>
        </div>
      )}

      {/* ── TAB: Experience ───────────────────────────────────── */}
      {tab === 'experience' && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={addExp}
            className="btn-outline flex items-center gap-2"
          >
            <Plus size={15} />
            Add Entry
          </button>

          {(settings.experience ?? []).map((exp, i) => (
            <div key={i} className="card space-y-4 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-primary">Entry #{i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeExp(i)}
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={13} />
                  Remove
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Period">
                  <input
                    className={inputCls}
                    value={exp.year}
                    placeholder="e.g. April 2026 - Present"
                    onChange={(e) => updateExp(i, 'year', e.target.value)}
                  />
                </Field>
                <Field label="Title / Company">
                  <input
                    className={inputCls}
                    value={exp.title}
                    placeholder="e.g. Software Engineer @ Company"
                    onChange={(e) => updateExp(i, 'title', e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Description">
                    <textarea
                      className={textareaCls}
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExp(i, 'description', e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Save */}
      <div className="sticky bottom-6 flex justify-end">
        <button onClick={save} disabled={saving} className="btn-primary shadow-2xl shadow-primary/30">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </section>
  );
}
