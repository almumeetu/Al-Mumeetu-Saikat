'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { subscribeSchema } from '@/lib/validations';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';
import { z } from 'zod';

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
    <section className="py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-center text-white">
          <Mail className="mx-auto mb-4 h-12 w-12" />
          <h2 className="mb-3 text-3xl font-extrabold md:text-4xl">Subscribe to My Newsletter</h2>
          <p className="mb-6 text-white/80">Get the latest blog posts and project updates.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              {...register('email')}
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full px-5 py-3 text-slate-900 outline-none"
            />
            <button
              disabled={loading}
              className="rounded-full bg-white px-6 py-3 font-bold text-primary transition hover:scale-105 disabled:opacity-50"
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </form>
          {errors.email ? <p className="mt-2 text-sm text-yellow-200">{errors.email.message}</p> : null}
        </div>
      </div>
    </section>
  );
}