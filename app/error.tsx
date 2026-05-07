'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
      <h2 className="text-3xl font-extrabold">Something went wrong</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={reset}
        className="btn-primary"
      >
        Try again
      </button>
    </div>
  );
}
