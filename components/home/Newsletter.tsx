import Link from 'next/link';
import { ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

export default function Newsletter({ s }: { s: SiteSettingsData }) {
  const email = s.email || 'almumeetu@gmail.com';

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#f7f8f6] dark:bg-[#07090c]">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm sm:p-12 lg:p-14 dark:border-slate-800 dark:bg-slate-900/80">
          {/* Subtle ambient accent glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/15" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl dark:bg-teal-400/10" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              <span className="eyebrow">
                <Sparkles size={13} className="text-emerald-700 dark:text-emerald-400" />
                Let&apos;s Work Together
              </span>
              <h2 className="text-xl font-medium tracking-tight text-slate-950 sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] dark:text-white">
                Have a project idea?{' '}
                <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300">
                  Let&apos;s build something
                </span>{' '}
                exceptional.
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Open to frontend engineering roles, enterprise commerce solutions, and technical advisory worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/contact"
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium shadow-md"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight size={16} />
              </Link>

              <a
                href={`mailto:${email}`}
                className="btn-outline flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium"
              >
                <Mail size={16} className="text-emerald-700 dark:text-emerald-400" />
                <span>Email Me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
