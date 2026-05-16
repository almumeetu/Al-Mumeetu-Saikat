'use client';

import { motion } from 'framer-motion';
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiBootstrap, SiSass,
  SiPostgresql, SiSupabase, SiSqlite, SiPrisma,
  SiDocker, SiGitlab, SiPnpm, SiLinux,
  SiNodedotjs, SiMongodb, SiGraphql, SiWordpress,
  SiJavascript, SiHtml5, SiCss, SiGit,
  SiVercel, SiCloudinary, SiFigma, SiVuedotjs,
} from 'react-icons/si';
import { VscTerminalBash } from 'react-icons/vsc';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

// Map skill name → icon component
const SKILL_ICON_MAP: Record<string, React.ElementType> = {
  // Frontend
  'next.js':        SiNextdotjs,
  'next.js 15':     SiNextdotjs,
  'react':          SiReact,
  'react 19':       SiReact,
  'typescript':     SiTypescript,
  'tailwind css':   SiTailwindcss,
  'tailwindcss':    SiTailwindcss,
  'bootstrap 5':    SiBootstrap,
  'bootstrap':      SiBootstrap,
  'sass':           SiSass,
  'javascript':     SiJavascript,
  'html5':          SiHtml5,
  'html':           SiHtml5,
  'css3':           SiCss,
  'css':            SiCss,
  'vue':            SiVuedotjs,
  'nuxt':           SiVuedotjs,
  'figma':          SiFigma,
  // Backend
  'postgresql':     SiPostgresql,
  'supabase':       SiSupabase,
  'sqlite':         SiSqlite,
  'prisma':         SiPrisma,
  'prisma/drizzle orm': SiPrisma,
  'mongodb':        SiMongodb,
  'node.js':        SiNodedotjs,
  'nodejs':         SiNodedotjs,
  'graphql':        SiGraphql,
  'wordpress':      SiWordpress,
  // DevOps / Tools
  'docker':         SiDocker,
  'gitlab ci/cd':   SiGitlab,
  'gitlab':         SiGitlab,
  'pnpm':           SiPnpm,
  'linux server deployment': SiLinux,
  'linux':          SiLinux,
  'git':            SiGit,
  'vercel':         SiVercel,
  'cloudinary':     SiCloudinary,
  'bash':           VscTerminalBash,
};

function getIcon(skill: string): React.ElementType | null {
  return SKILL_ICON_MAP[skill.toLowerCase()] ?? null;
}

const categoryConfig = [
  {
    key: 'frontend' as const,
    title: 'Frontend',
    gradient: 'from-violet-500 to-indigo-500',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    border: 'hover:border-violet-400',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
  },
  {
    key: 'backend' as const,
    title: 'Backend & Database',
    gradient: 'from-cyan-500 to-teal-500',
    bg: 'bg-cyan-50 dark:bg-cyan-500/10',
    border: 'hover:border-cyan-400',
    badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300',
  },
  {
    key: 'devops' as const,
    title: 'Tools & DevOps',
    gradient: 'from-orange-500 to-pink-500',
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    border: 'hover:border-orange-400',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
  },
];

export default function Skills({ s }: { s: SiteSettingsData }) {
  const skillMap = {
    frontend: s.skillsFrontend,
    backend:  s.skillsBackend,
    devops:   s.skillsDevops,
  };

  return (
    <section className="py-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            Tech Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold md:text-5xl"
          >
            Skills &amp; Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400"
          >
            Tools and technologies I use to build fast, scalable, and modern web applications.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="grid gap-8 md:grid-cols-3">
          {categoryConfig.map((cat, catIdx) => {
            const skills = skillMap[cat.key] ?? [];
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="card overflow-hidden"
              >
                {/* Card header */}
                <div className={`bg-gradient-to-r ${cat.gradient} p-5`}>
                  <h3 className="text-lg font-extrabold text-white">{cat.title}</h3>
                  <p className="mt-0.5 text-sm text-white/70">{skills.length} technologies</p>
                </div>

                {/* Skills grid */}
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill, i) => {
                      const Icon = getIcon(skill);
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: catIdx * 0.1 + i * 0.04 }}
                          className={`group flex items-center gap-2.5 rounded-xl border border-transparent p-3 transition-all ${cat.bg} ${cat.border} hover:border-opacity-100 hover:shadow-sm`}
                        >
                          {Icon ? (
                            <Icon className="h-5 w-5 shrink-0 text-slate-600 dark:text-slate-300" />
                          ) : (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-[9px] font-bold text-white">
                              {skill.charAt(0).toUpperCase()}
                            </span>
                          )}
                          <span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                            {skill}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
