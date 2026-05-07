'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/admin',
        redirect: true,
      });

      if (result?.error) throw new Error('Invalid credentials');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="card w-full max-w-md space-y-6 p-8">
        <div className="space-y-2 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Admin Access
          </span>
          <h1 className="text-3xl font-extrabold">Sign in</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-800"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-800"
            />
          </div>
          <button disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {process.env.NODE_ENV === 'development' && (
          <div className="relative pt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 dark:bg-[#0f172a]">Development</span>
            </div>
            <div className="mt-4">
              <button
                onClick={async () => {
                  setLoading(true);
                  await signIn('credentials', {
                    email: 'almumeetu@gmail.com',
                    password: '223355',
                    callbackUrl: '/admin',
                    redirect: true,
                  });
                }}
                className="w-full rounded-2xl border border-dashed border-primary/50 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                Quick Admin Login
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}