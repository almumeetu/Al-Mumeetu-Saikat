'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Code2, Briefcase, Sparkles, Send } from 'lucide-react';

const highlights = [
  { label: 'Years Experience', value: '5+', icon: Briefcase },
  { label: 'Projects Delivered', value: '250+', icon: Code2 },
  { label: 'Happy Clients', value: '100+', icon: Sparkles },
];

export default function AboutPage() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 space-y-20">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl space-y-6 mx-auto text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-bold tracking-wide text-primary backdrop-blur-md">
            About Me
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight">
            Next.js Full-Stack Developer specializing in pixel-perfect eCommerce solutions.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            I work on modern web builds, frontend architecture, and conversion-oriented digital experiences for clients around the world. My goal is to keep the work fast, maintainable, and easy for teams to evolve.
          </p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10"
        >
          <div className="relative aspect-video w-full sm:aspect-[21/9]">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10" />
            <Image
              src="/images/portfolio.jpg"
              alt="Al Mumeetu Saikat Portfolio"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Highlights Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div 
              key={item.label} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/80 dark:ring-white/10 backdrop-blur-xl group"
            >
              <div className="absolute -right-6 -top-6 opacity-5 transition-transform group-hover:scale-110 group-hover:rotate-12">
                <item.icon size={120} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
                  <item.icon size={28} />
                </div>
                <div className="text-5xl font-extrabold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                  {item.value}
                </div>
                <p className="mt-3 font-medium text-slate-600 dark:text-slate-400">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid Layout for Content */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800/80 dark:ring-white/10 backdrop-blur-xl"
            >
              <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
                <Sparkles className="text-primary" /> How I work
              </h2>
              <div className="space-y-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  I start with structure and clarity, then layer in visual polish and motion where it improves the product rather than distracting from it. The emphasis is always on performance, accessibility, and conversion.
                </p>
                <p>
                  If you need a landing page, complex dashboard build, or a frontend implementation with a clean handoff, I can help ship it with modern tools like Next.js, React, and Tailwind CSS.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 text-white shadow-xl group"
            >
              <div className="absolute -right-10 -top-10 opacity-10 transition-transform duration-700 group-hover:scale-150 group-hover:rotate-45">
                <Sparkles size={200} />
              </div>
              <div className="relative z-10">
                <h2 className="mb-4 text-3xl font-bold">Availability</h2>
                <p className="mb-8 text-lg text-white/80">
                  I am currently open to freelance projects, collaborations, and long-term remote work opportunities.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-slate-900 transition hover:bg-slate-50 hover:scale-105">
                  Get in Touch <Send size={18} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800/80 dark:ring-white/10 backdrop-blur-xl"
            >
              <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold">
                <GraduationCap className="text-primary" /> Education
              </h2>
              <div className="space-y-8">
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                  <div className="absolute left-[-4px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-slate-800" />
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-3">
                    BSc in CSE 
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                      Running
                    </span>
                  </h3>
                  <p className="mt-1 font-medium text-primary">World University Of Bangladesh</p>
                  <p className="mt-2 text-sm text-slate-500">2025 - Present</p>
                </div>
                
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                  <div className="absolute left-[-4px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-800" />
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">HSC in Science</h3>
                  <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">Jahangirpur Govt. College</p>
                  <p className="mt-2 text-sm text-slate-500">Dec 2019 - Dec 2021</p>
                </div>
                
                <div className="relative pl-6">
                  <div className="absolute left-[-4px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-800" />
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">SSC in Science</h3>
                  <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">Bagdob High School</p>
                  <p className="mt-2 text-sm text-slate-500">Jan 2014 - Nov 2019</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800/80 dark:ring-white/10 backdrop-blur-xl"
            >
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <BookOpen className="text-primary" /> Online Courses
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Web Designer Courses', org: 'BanglaDevs, Dhaka' },
                  { title: 'PSD to HTML', org: 'Bangla-devs' },
                  { title: 'SASS & Bootstrap', org: 'Bangla-devs' },
                  { title: 'WordPress Theme Dev', org: 'Weblearn' },
                ].map((course, i) => (
                  <div key={i} className="group flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-primary/5 dark:bg-slate-800/50 dark:hover:bg-primary/10">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{course.title}</p>
                      <p className="text-sm font-medium text-primary mt-1">{course.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}