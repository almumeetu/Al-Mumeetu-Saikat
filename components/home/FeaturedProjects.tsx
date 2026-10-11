import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { ExternalLink, Github, Layers, ArrowUpRight } from 'lucide-react';

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

async function getFeaturedProjects() {
  try {
    const conn = await connectDB();
    if (!conn) return FALLBACK_PROJECTS;

    // 1. Fetch featured projects
    let projects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    // 2. If no projects are explicitly featured, fetch any projects
    if (!projects || projects.length === 0) {
      projects = await Project.find({})
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();
    }

    if (!projects || projects.length === 0) {
      return FALLBACK_PROJECTS;
    }

    return projects.map((p: any, idx: number) => ({
      _id: p._id ? p._id.toString() : `db-proj-${idx}`,
      title: p.title || 'Untitled Project',
      category: Array.isArray(p.category)
        ? p.category.join(' • ')
        : (p.category || 'Web Application'),
      description: p.description || '',
      image: p.image || '/images/portfolio.jpg',
      tech: Array.isArray(p.tech)
        ? p.tech
        : typeof p.tech === 'string'
        ? p.tech.split(',').map((t: string) => t.trim())
        : [],
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      featured: Boolean(p.featured),
    }));
  } catch (err) {
    console.error('Failed to fetch projects from database:', err);
    return FALLBACK_PROJECTS;
  }
}

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section className="section-shell overflow-hidden bg-white dark:bg-[#0b0d0e]" id="projects">
      <div className="container-custom">
        <div className="mb-14 max-w-3xl">
          <p className="section-kicker"><Layers size={13} /> 05 / Selected work</p>
          <h2 className="section-title mt-4">A closer look at what I build.</h2>
          <p className="section-lede">
            Selected interfaces, business platforms, and production systems crafted with performance, clean architecture, and real user value.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <article
              key={project._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-[#fafbfa] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200/70 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
                <Image
                  src={project.image || '/images/portfolio.jpg'}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Clean Hover Action Overlay (Visible on hover on desktop) */}
                <div className="absolute inset-0 bg-slate-950/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:flex items-center justify-center gap-3 p-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-medium text-slate-900 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-900"
                    >
                      <ExternalLink size={14} /> Live View
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800"
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  {project.category}
                </div>
                <h3 className="mb-2 text-xl font-medium text-slate-950 dark:text-white leading-tight">
                  {project.title}
                </h3>
                <p className="mb-5 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                  {project.description}
                </p>

                {/* Mobile Direct Action Buttons */}
                <div className="mb-4 flex items-center gap-2 sm:hidden">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 px-3 rounded-lg bg-emerald-700 text-white text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink size={13} /> Live Preview
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <Github size={13} /> Code
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 border-t border-slate-200/70 pt-3 dark:border-slate-800">
                  {(project.tech || []).slice(0, 5).map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200/80 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/projects" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm">
            <span>Explore All Projects</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
