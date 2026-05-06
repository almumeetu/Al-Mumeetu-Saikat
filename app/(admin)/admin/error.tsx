'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center px-4">
      <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">
        Admin Error
      </span>
      <h2 className="text-3xl font-extrabold">Something went wrong</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        {error.message || 'An error occurred in the admin panel.'}
      </p>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}
