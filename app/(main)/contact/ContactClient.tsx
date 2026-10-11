'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validations';
import { Mail, MapPin, Briefcase, Send, Clock3, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { z } from 'zod';

type FormData = z.infer<typeof contactSchema>;

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      toast.success("Message sent! I'll reply soon 📨");
      reset();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-custom">
        <div className="mb-16 max-w-3xl">
          <span className="eyebrow">
            Start a conversation
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">Have a product, problem, or opportunity in mind?</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Tell me what you are trying to achieve. I&apos;ll review the context and reply with a clear next step—whether that means working together or pointing you in the right direction.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.75fr,1.25fr]">
          <div className="space-y-5">
            {[
              { icon: Mail, title: 'Email', value: 'almumeetu@gmail.com', href: 'mailto:almumeetu@gmail.com' },
              { icon: MapPin, title: 'Location', value: 'Dhaka, Bangladesh · Remote worldwide' },
              { icon: Briefcase, title: 'Engagements', value: 'Freelance, contract, and product teams' },
              { icon: Clock3, title: 'Response time', value: 'Usually within 1–2 business days' },
            ].map((contact) => (
              <div key={contact.title} className="card flex gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <contact.icon size={22} />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">{contact.title}</h4>
                  {contact.href ? (
                    <a href={contact.href} className="text-slate-600 transition hover:text-primary dark:text-slate-400">
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400">{contact.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-6 md:p-9">
            <div className="mb-2 border-b border-slate-200 pb-5 dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-white">Project enquiry</p>
              <p className="mt-1 text-sm text-slate-500">A few details help me understand how I can be useful.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input aria-invalid={Boolean(errors.name)} {...register('name')} className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800" />
                {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input aria-invalid={Boolean(errors.email)} type="email" {...register('email')} className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800" />
                {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email.message}</p> : null}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Subject</label>
              <input aria-invalid={Boolean(errors.subject)} {...register('subject')} className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800" />
              {errors.subject ? <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Message</label>
              <textarea aria-invalid={Boolean(errors.message)} {...register('message')} rows={6} placeholder="What are you building, and what would you like help with?" className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800" />
              {errors.message ? <p className="mt-1 text-sm text-red-500">{errors.message.message}</p> : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-xs text-slate-500"><CheckCircle2 size={14} className="text-emerald-500" /> Your details stay private.</p>
              <button disabled={loading} className="btn-primary">
              <Send size={16} />
              {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}