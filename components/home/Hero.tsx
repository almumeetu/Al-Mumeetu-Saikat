'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, Briefcase, Twitter } from 'lucide-react';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

export default function Hero({ s }: { s: SiteSettingsData }) {
  const socials = [
    { icon: Github, href: s.githubUrl || '#', label: 'GitHub' },
    { icon: Linkedin, href: s.linkedinUrl || '#', label: 'LinkedIn' },
    { icon: Twitter, href: s.twitterUrl || '#', label: 'Twitter' },
    { icon: Briefcase, href: s.upworkUrl || '#', label: 'Upwork' },
    { icon: Mail, href: `mailto:${s.email}`, label: 'Email' },
  ].filter((l) => l.href && l.href !== '#' && l.href !== 'mailto:');

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container-custom grid items-center gap-12 py-20 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span className="mb-5 inline-block rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
            Hello, I&apos;m
          </span>
          <h1 className="mb-4 text-5xl font-extrabold leading-tight md:text-7xl">
            Md Al Mumeetu{' '}
            <span className="gradient-text mt-2 block text-4xl md:text-5xl">
              (Al Mumeetu Saikat)
            </span>
          </h1>
          <h2 className="mb-5 font-mono text-xl text-primary md:text-2xl">{s.heroTagline}</h2>
          <p className="mb-8 max-w-xl text-lg text-slate-600 dark:text-slate-400">{s.heroBio}</p>

          <div className="mb-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">Let&apos;s Talk</Link>
            <Link href="/projects" className="btn-outline">View Projects</Link>
          </div>

          {socials.length > 0 && (
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-100 transition-all hover:-translate-y-1 hover:bg-primary hover:text-white dark:border-slate-700 dark:bg-slate-800"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-md"
        >
          <div className="relative aspect-square rounded-full bg-gradient-to-br from-primary to-secondary p-2">
            <Image
              src={
                s.avatarUrl ||
                `https://ui-avatars.com/api/?name=Al+Mumeetu&size=400&background=6366f1&color=fff&bold=true`
              }
              alt={s.heroName}
              width={400}
              height={400}
              className="h-full w-full rounded-full object-cover"
              priority
            />
          </div>
          {[
            { emoji: '⚛️', pos: 'top-0 -left-6' },
            { emoji: '🐘', pos: 'top-1/2 -right-6' },
            { emoji: '⚡', pos: 'bottom-0 left-10' },
          ].map((badge, index) => (
            <div
              key={index}
              className={`absolute ${badge.pos} flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-2xl dark:bg-slate-800`}
            >
              {badge.emoji}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}