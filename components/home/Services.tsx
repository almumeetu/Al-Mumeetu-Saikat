import { ArrowUpRight, LayoutDashboard, PanelsTopLeft, Smartphone, Workflow } from 'lucide-react';

const SERVICES = [
  { icon: PanelsTopLeft, title: 'Modern React applications', text: 'Product interfaces with reusable components, thoughtful states, and an architecture that scales with the team.' },
  { icon: Smartphone, title: 'Responsive websites', text: 'Fast, accessible experiences that hold up across real devices, browsers, and content changes.' },
  { icon: LayoutDashboard, title: 'Dashboards & systems', text: 'Clear data-heavy workflows for teams that need to make decisions quickly and confidently.' },
  { icon: Workflow, title: 'Frontend UI solutions', text: 'From Figma handoff to production polish, I turn design intent into maintainable code.' },
];

export default function Services() {
  return <section id="services" className="section-shell bg-white dark:bg-[#0b0d0e]"><div className="container-custom"><div className="max-w-2xl"><p className="section-kicker">03 / What I do</p><h2 className="section-title mt-4">Useful software, not just beautiful screens.</h2><p className="section-lede">Whether you need a product feature or a complete marketing experience, I help teams move from idea to dependable release.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-800">{SERVICES.map(({ icon: Icon, title, text }) => <article key={title} className="group bg-white p-7 dark:bg-[#0b0d0e] sm:p-9"><Icon size={22} className="text-emerald-700 dark:text-emerald-400" /><h3 className="mt-8 text-lg font-medium text-slate-950 dark:text-white">{title}</h3><p className="mt-3 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p><a href="#contact" className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition group-hover:text-emerald-700 dark:text-slate-400 dark:group-hover:text-emerald-400">Let&apos;s talk <ArrowUpRight size={14} /></a></article>)}</div></div></section>;
}
