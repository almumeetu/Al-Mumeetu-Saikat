'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validations';
import { Mail, MapPin, Briefcase, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { z } from 'zod';

type FormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
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
    <section className="py-20">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Get In Touch
          </span>
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">Let&apos;s Work Together</h1>
          <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400">
            Open to new opportunities and collaborations. Reach out via the form below.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            {[
              { icon: Mail, title: 'Email', value: 'almumeetu@gmail.com', href: 'mailto:almumeetu@gmail.com' },
              { icon: MapPin, title: 'Location', value: 'Remote / Global' },
              { icon: Briefcase, title: 'Availability', value: 'Open to freelance and contract work' },
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

          <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input {...register('name')} className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-800" />
                {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input type="email" {...register('email')} className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-800" />
                {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email.message}</p> : null}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Subject</label>
              <input {...register('subject')} className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-800" />
              {errors.subject ? <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Message</label>
              <textarea {...register('message')} rows={6} className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-800" />
              {errors.message ? <p className="mt-1 text-sm text-red-500">{errors.message.message}</p> : null}
            </div>

            <button disabled={loading} className="btn-primary">
              <Send size={16} />
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}