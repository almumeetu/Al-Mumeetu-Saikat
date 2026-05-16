'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { subscribeSchema } from '@/lib/validations';
import toast from 'react-hot-toast';
import { Mail, Send, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { motion } from 'framer-motion';

type FormData = z.infer<typeof subscribeSchema>;

export default function Newsletter() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast.success('Subscribed! Check your inbox 🎉');
      reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-900 dark:bg-black" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-white/5 p-8 ring-1 ring-white/20 backdrop-blur-2xl md:p-16 relative"
        >
          {/* Glassmorphism Shine */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="text-left text-white">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-2xl">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                Let's stay connected.
              </h2>
              <p className="text-lg text-white/70">
                Join my newsletter to receive the latest articles, tutorials, and insights on modern web development straight to your inbox.
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm font-medium text-white/50">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>No spam. Unsubscribe anytime.</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-30 blur transition duration-1000 group-hover:opacity-100" />
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="relative flex flex-col gap-4 rounded-3xl bg-slate-900/80 p-8 ring-1 ring-white/10 backdrop-blur-xl"
              >
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">Email Address</label>
                  <input
                    id="email"
                    {...register('email')}
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full rounded-2xl border-0 bg-white/5 px-5 py-4 text-white placeholder:text-white/30 outline-none ring-1 ring-white/10 transition focus:bg-white/10 focus:ring-2 focus:ring-primary"
                  />
                  {errors.email ? <p className="text-sm text-rose-400">{errors.email.message}</p> : null}
                </div>
                <button
                  disabled={loading}
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-slate-900 transition hover:bg-slate-100 disabled:opacity-70"
                >
                  {loading ? 'Subscribing...' : 'Subscribe Now'}
                  {!loading && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}