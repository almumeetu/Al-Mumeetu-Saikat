'use client';

import { SiteSettingsData } from "@/lib/getSiteSettings";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience({ s }: { s: SiteSettingsData }) {
  const experiences = s.experience || [];

  return (
    <section className="relative bg-slate-50 py-24 dark:bg-slate-900/50 overflow-hidden" id="experience">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-md"
          >
            Experience
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold md:text-5xl tracking-tight"
          >
            Career Journey
          </motion.h2>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/10 to-transparent md:left-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-50 bg-primary shadow-xl dark:border-slate-900 z-10 transition-transform duration-500 group-hover:scale-110">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>

                  {/* Card Container - Alternate Sides */}
                  <div className={`w-full pl-20 md:w-1/2 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                      className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:ring-primary/20 dark:bg-slate-800/80 dark:ring-white/10 dark:hover:ring-primary/30 backdrop-blur-sm"
                    >
                      <div className={`flex items-center gap-2 mb-4 text-left ${isEven ? 'md:justify-end' : ''}`}>
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold uppercase tracking-wider text-primary">
                          {exp.year}
                        </span>
                      </div>
                      
                      <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {exp.title}
                      </h3>
                      
                      <div className={`mb-5 inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-700/50 dark:text-slate-300`}>
                        {exp.company}
                      </div>

                      <div 
                        className={`text-slate-600 leading-relaxed dark:text-slate-400 prose prose-sm max-w-none prose-strong:text-primary prose-strong:font-semibold text-left ${isEven ? 'md:text-right' : ''}`}
                        dangerouslySetInnerHTML={{ 
                          __html: exp.description
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br />') 
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}