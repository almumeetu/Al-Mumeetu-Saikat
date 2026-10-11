import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import ProjectsFilter from '@/components/projects/ProjectsFilter';

export const metadata: Metadata = {
  title: 'Projects | Al Mumeetu Saikat',
  description: 'A comprehensive collection of web applications, landing pages, and frontend solutions built by Al Mumeetu Saikat.',
  alternates: {
    canonical: '/projects',
  }
};

const FALLBACK_PROJECTS = [
  {
    _id: 'proj-1',
    title: 'Enterprise E-Commerce & Retail POS Platform',
    category: 'Full-Stack Commerce',
    description:
      'Engineered production e-commerce and Point-of-Sale (POS) interfaces with sub-second response times, real-time inventory synchronization, Prisma ORM, and PostgreSQL relational data pipelines.',
    image: '/images/profile-portfolio.png',
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://github.com/almumeetu',
    githubUrl: 'https://github.com/almumeetu',
  },
  {
    _id: 'proj-2',
    title: 'Distributors Management System (DMS)',
    category: 'Enterprise ERP System',
    description:
      'Engineered a distributor operations management platform with session authentication, inventory tracking, order status pipelines, and automated reporting dashboards.',
    image: '/images/profile-portfolio.jpg',
    tech: ['React', 'Next.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    liveUrl: 'https://github.com/almumeetu',
    githubUrl: 'https://github.com/almumeetu',
  },
  {
    _id: 'proj-3',
    title: 'Enterprise WordPress & WooCommerce Solutions',
    category: 'Custom E-Commerce CMS',
    description:
      'Delivered tailored WooCommerce systems for international clients, including custom Elementor widgets, theme/plugin optimization, responsive UI fixes, and post-deployment maintenance.',
    image: '/images/portfolio.jpg',
    tech: ['WordPress', 'WooCommerce', 'Elementor', 'PHP', 'JavaScript', 'Bootstrap'],
    liveUrl: 'https://github.com/almumeetu',
    githubUrl: 'https://github.com/almumeetu',
  },
];

export const revalidate = 3600;
export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    const conn = await connectDB();
    if (conn) {
      projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }

  if (!projects || projects.length === 0) {
    projects = FALLBACK_PROJECTS;
  }

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-10 left-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 space-y-12 sm:space-y-16">
        <div className="max-w-4xl space-y-5 sm:space-y-6">
          <span className="eyebrow">
            <Sparkles size={16} /> All Projects
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
            Selected work across product engineering and the web.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Explore production-minded interfaces, commerce workflows, WordPress solutions, and business systems built with clarity, performance, and maintainability in mind.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
            Have a similar challenge? Let&apos;s talk <ArrowUpRight size={16} />
          </a>
        </div>

        <ProjectsFilter projects={projects.map((p: any) => ({ ...p, _id: p._id.toString() }))} />
      </div>
    </section>
  );
}
