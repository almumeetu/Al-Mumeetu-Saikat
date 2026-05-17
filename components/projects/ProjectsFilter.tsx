'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { TECH_LIST } from '@/components/admin/TechStackPicker';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string | string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface Props {
  projects: Project[];
}

function getCategories(cat: string | string[]): string[] {
  if (Array.isArray(cat)) return cat;
  return cat ? [cat] : [];
}

export default function ProjectsFilter({ projects }: Props) {
  const [active, setActive] = useState('All');

  // Build tab list dynamically from actual project categories
  const tabs = useMemo(() => {
    const seen = new Set<string>();
    projects.forEach((p) => getCategories(p.category).forEach((c) => seen.add(c)));
    return ['All', ...Array.from(seen).sort()];
  }, [projects]);

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((p) => getCategories(p.category).includes(active));

  return (
    <div className="space-y-10">
      {/* Filter Tabs — dynamic */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              active === cat
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-white text-slate-600 ring-1 ring-slate-900/10 hover:bg-primary/10 hover:text-primary dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-primary/20'
            }`}
          >
            {cat}
            {cat !== 'All' && (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                active === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
              }`}>
                {projects.filter((p) => getCategories(p.category).includes(cat)).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((project) => {
            const cats = getCategories(project.category);
            return (
              <article
                key={project._id}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 dark:bg-slate-800/80 dark:ring-white/10 backdrop-blur-xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Hover Action Links */}
                  <div className="absolute bottom-6 left-6 right-6 flex translate-y-4 gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-primary hover:text-white"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary"
                      >
                        <Github size={16} /> Code
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* Category pills */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {cats.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-primary"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="mb-6 flex-1 text-slate-600 dark:text-slate-400 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack with icons */}
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tech || []).slice(0, 5).map((techLabel) => {
                      const techItem = TECH_LIST.find((t) => t.label === techLabel);
                      if (techItem) {
                        const Icon = techItem.icon;
                        return (
                          <span
                            key={techLabel}
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${techItem.color} ${techItem.textColor}`}
                          >
                            <Icon size={11} />
                            {techLabel}
                          </span>
                        );
                      }
                      // fallback for custom/unknown tech
                      return (
                        <span
                          key={techLabel}
                          className="rounded-full bg-slate-100 dark:bg-slate-700/50 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
                        >
                          {techLabel}
                        </span>
                      );
                    })}
                    {(project.tech || []).length > 5 && (
                      <span className="rounded-full bg-slate-100 dark:bg-slate-700/50 px-3 py-1 text-xs font-semibold text-slate-500">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-[2rem] bg-white p-16 text-center text-slate-500 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800/80 dark:ring-white/10 backdrop-blur-xl lg:col-span-3">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-slate-400 opacity-50" />
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
