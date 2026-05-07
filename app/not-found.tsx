import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
      <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
        404
      </span>
      <h1 className="text-4xl font-extrabold">Page Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  );
}
