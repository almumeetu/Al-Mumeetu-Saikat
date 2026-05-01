import Link from 'next/link';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/blogs', label: 'Blogs' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/subscribers', label: 'Subscribers' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="container-custom flex min-h-20 items-center justify-between gap-4 py-4">
          <Link href="/admin" className="text-xl font-extrabold gradient-text">
            Admin Panel
          </Link>
          <nav className="flex flex-wrap gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="container-custom py-10">{children}</main>
    </div>
  );
}