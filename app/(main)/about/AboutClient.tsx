'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Download,
  GraduationCap,
  Handshake,
  Layers3,
  MapPin,
} from 'lucide-react';

const highlights = [
  { label: 'Years of experience', value: '4+', icon: BriefcaseBusiness },
  { label: 'Responsive websites', value: '120+', icon: Code2 },
  { label: 'UI challenges solved', value: '200+', icon: Layers3 },
];

const principles = [
  ['Clarity before code', 'I turn ambiguous requirements into a focused plan, sensible milestones, and measurable outcomes.'],
  ['Quality that ships', 'I care about performance, accessibility, maintainability, and the details users feel in production.'],
  ['A reliable partner', 'Clear communication, honest progress updates, and a clean handoff are part of the work—not extras.'],
];

export default function AboutClient() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container-custom space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid items-end gap-8 lg:grid-cols-[1.15fr,0.85fr]"
        >
          <div>
            <span className="eyebrow">About me</span>
            <h1 className="mt-5 max-w-4xl text-3xl font-medium tracking-[-0.04em] text-slate-950 dark:text-white md:text-5xl">
              An engineer who makes complex products feel simple.
            </h1>
          </div>
          <div className="space-y-5 lg:pb-1">
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              I&apos;m Md Al Mumeetu Saikat, a React and Next.js software engineer based in Dhaka, Bangladesh, working with teams and clients worldwide.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Let&apos;s work together <ArrowUpRight size={16} /></Link>
              <a href="https://almumeetu.github.io/CV/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                View résumé <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-[1.25fr,0.75fr]"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 shadow-2xl shadow-slate-900/10 dark:border-slate-800">
            <Image src="/images/portfolio.jpg" alt="Al Mumeetu Saikat working on digital products" width={1200} height={700} className="h-full min-h-[22rem] object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex flex-wrap items-end justify-between gap-5 text-white">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Based in</p>
                <p className="mt-2 flex items-center gap-2 text-lg font-medium"><MapPin size={17} /> Dhaka, Bangladesh</p>
              </div>
              <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-4 py-2 text-sm font-medium text-emerald-200">Open to the right opportunity</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">What I bring</p>
            <p className="mt-5 text-xl font-medium leading-8 text-slate-900 dark:text-white">
              Frontend depth with practical full-stack awareness.
            </p>
            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              My work spans e-commerce, POS, ERP, WordPress, and business workflows. I use React, Next.js, TypeScript, Node.js, PostgreSQL, Supabase, and Docker to move products from requirements to dependable release.
            </p>
            <div className="mt-7 space-y-3 border-t border-slate-100 pt-6 dark:border-slate-800">
              {['Production-focused engineering', 'Comfortable with global collaboration', 'Clear documentation and handoff'].map((item) => (
                <p key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map(({ label, value, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <Icon size={21} className="text-primary" />
              <p className="mt-5 text-4xl font-medium tracking-tight text-slate-950 dark:text-white">{value}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.8fr,1.2fr]">
          <div>
            <span className="eyebrow">How I work</span>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">Built for teams that care about the outcome.</h2>
            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              Whether you are hiring for a product team or looking for a delivery partner, I bring structure, ownership, and thoughtful execution to every stage.
            </p>
            <a href="/cv/Al-Mumeetu-Saikat-CV.pdf" download className="mt-7 inline-flex items-center gap-2 font-medium text-primary hover:underline">
              <Download size={16} /> Download CV
            </a>
          </div>
          <div className="grid gap-4">
            {principles.map(([title, description], index) => (
              <motion.div key={title} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 20 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">0{index + 1}</span>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
            <GraduationCap className="text-primary" />
            <h2 className="mt-5 text-2xl font-medium">Education</h2>
            <p className="mt-4 font-medium">Bachelor of Science in Computer Science &amp; Engineering</p>
            <p className="mt-1 text-sm text-primary">World University of Bangladesh · Ongoing</p>
            <p className="mt-6 text-sm leading-6 text-slate-600 dark:text-slate-400">Higher Secondary Certificate (HSC), Science — Jahangirpur Government College, Naogaon.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
            <Handshake className="text-primary" />
            <h2 className="mt-5 text-2xl font-medium">Ready to collaborate?</h2>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">Share your goals, timeline, and current challenge. I&apos;ll help you understand the best next step.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">Get in touch <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
