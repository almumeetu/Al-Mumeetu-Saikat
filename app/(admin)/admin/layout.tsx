'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SessionProvider, signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function SidebarLink({
  href,
  label,
  icon: Icon,
  exact,
  pathname,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  pathname: string;
}) {
  const active = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
        active
          ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary shadow-sm'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
      }`}
    >
      <Icon
        size={18}
        className={active ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}
      />
      <span className="flex-1">{label}</span>
      {active && <ChevronRight size={14} className="text-primary/60" />}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return (
      <SessionProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          {children}
        </div>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-slate-200/80 px-6 dark:border-slate-800/80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Sparkles size={16} className="text-white" />
            </div>
            <Link href="/admin" className="text-lg font-extrabold gradient-text">
              Admin Panel
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Navigation
            </p>
            {links.map((link) => (
              <SidebarLink key={link.href} {...link} pathname={pathname} />
            ))}
          </nav>

          {/* Footer */}
          <div className="space-y-2 border-t border-slate-200/80 p-4 dark:border-slate-800/80">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <ExternalLink size={16} />
              View Site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────────── */}
        <div className="flex flex-1 flex-col pl-64">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-8 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Admin</span>
              {pathname !== '/admin' && (
                <>
                  <ChevronRight size={14} />
                  <span className="font-medium capitalize text-slate-900 dark:text-slate-100">
                    {pathname.split('/').filter(Boolean).slice(1).join(' / ')}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                A
              </div>
            </div>
          </header>

          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
