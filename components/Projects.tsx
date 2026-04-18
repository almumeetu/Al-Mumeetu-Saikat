
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import ProjectModal from './ProjectModal';
import type { Project } from '../types';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight">{children}</h2>
);

const TAG_COLORS: Record<string, string> = {
    'Next.js':    'bg-slate-900 text-white border border-slate-600',
    'TypeScript': 'bg-blue-900/60 text-blue-200 border border-blue-700/60',
    'React':      'bg-cyan-900/50 text-cyan-200 border border-cyan-700/50',
    'PostgreSQL': 'bg-indigo-900/50 text-indigo-200 border border-indigo-700/50',
    'Docker':     'bg-sky-900/60 text-sky-200 border border-sky-700/60',
    'Prisma':     'bg-slate-800 text-slate-200 border border-slate-600',
    'Supabase':   'bg-emerald-900/50 text-emerald-200 border border-emerald-700/50',
    'pnpm':       'bg-orange-900/50 text-orange-200 border border-orange-700/50',
    'Open Source':'bg-violet-900/50 text-violet-200 border border-violet-700/50',
    'E-commerce': 'bg-pink-900/50 text-pink-200 border border-pink-700/50',
    'Tailwind':   'bg-teal-900/50 text-teal-200 border border-teal-700/50',
    'WordPress':  'bg-blue-800/50 text-blue-300 border border-blue-700/50',
    'Elementor':  'bg-rose-900/50 text-rose-200 border border-rose-700/50',
    'Frontend':   'bg-yellow-900/50 text-yellow-200 border border-yellow-700/50',
    'HTML':       'bg-orange-800/50 text-orange-200 border border-orange-700/50',
    'SCSS':       'bg-pink-800/50 text-pink-300 border border-pink-700/50',
    'Bootstrap':  'bg-purple-900/50 text-purple-200 border border-purple-700/50',
    'JavaScript': 'bg-yellow-800/50 text-yellow-200 border border-yellow-700/50',
};

const tagClass = (tag: string) =>
    `${TAG_COLORS[tag] ?? 'bg-slate-700 text-gray-300 border border-slate-500'} text-xs font-semibold px-2 py-0.5 rounded-full`;

// Copy-to-clipboard button for pnpm package
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return (
        <button
            onClick={handleCopy}
            title="Copy install command"
            className="flex items-center gap-2 mt-3 bg-slate-900/80 border border-orange-500/40 rounded-lg px-3 py-2 text-xs font-mono text-orange-300 hover:bg-slate-800 transition-colors w-full"
        >
            <i className="ph-bold ph-terminal text-orange-400 text-sm flex-shrink-0"></i>
            <span className="flex-1 text-left truncate">{text}</span>
            <span className={`flex-shrink-0 transition-colors ${copied ? 'text-green-400' : 'text-slate-400 hover:text-white'}`}>
                {copied ? <i className="ph-bold ph-check text-sm"></i> : <i className="ph-bold ph-copy text-sm"></i>}
            </span>
        </button>
    );
};

// Architecture flow diagram for e-commerce projects
const ArchDiagram: React.FC = () => (
    <div className="mt-3 p-3 bg-slate-900/70 rounded-lg border border-slate-700/50 text-xs">
        <p className="text-slate-400 mb-2 font-semibold uppercase tracking-widest text-[10px]">Architecture Flow</p>
        <div className="flex items-center gap-1 flex-wrap">
            {['Next.js RSC', '→', 'API Layer', '→', 'PostgreSQL', '→', 'Prisma ORM'].map((item, i) => (
                <span key={i} className={item === '→'
                    ? 'text-slate-500'
                    : 'bg-slate-800 text-indigo-300 border border-slate-700 px-2 py-0.5 rounded font-mono'
                }>{item}</span>
            ))}
        </div>
        <div className="flex items-center gap-1 flex-wrap mt-1">
            {['Docker Dev', '→', 'GitLab CI/CD', '→', 'Production'].map((item, i) => (
                <span key={i} className={item === '→'
                    ? 'text-slate-500'
                    : 'bg-slate-800 text-emerald-300 border border-slate-700 px-2 py-0.5 rounded font-mono'
                }>{item}</span>
            ))}
        </div>
    </div>
);

// Featured enterprise project card
const FeaturedProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
    const isPnpm = project.title.toLowerCase().includes('pnpm') || project.tags.includes('pnpm');
    const isEcom = project.title.toLowerCase().includes('e-commerce') || project.title.toLowerCase().includes('storefront');

    return (
        <div
            className="group relative rounded-xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-slate-800/80 to-slate-900/90 shadow-xl shadow-indigo-900/20 cursor-pointer transition-all duration-300 hover:border-indigo-400/60 hover:shadow-indigo-700/30 hover:scale-[1.01]"
            onClick={onClick}
        >
            {/* Featured badge */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                <i className="ph-bold ph-star text-yellow-300 text-xs"></i> Enterprise
            </div>

            <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 pr-24 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tags.map(tag => (
                        <span key={tag} className={tagClass(tag)}>{tag}</span>
                    ))}
                </div>

                {/* Special extras */}
                {isPnpm && <CopyButton text="pnpm add neocomerz-storefront-ui" />}
                {isEcom && <ArchDiagram />}

                {/* Action links */}
                <div className="mt-4 flex items-center gap-3">
                    {project.codeUrl && (
                        <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors font-semibold"
                        >
                            <i className="ph-bold ph-package text-sm"></i> View on pnpm
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
                        >
                            <i className="ph-bold ph-arrow-square-out text-sm"></i> Live Site
                        </a>
                    )}
                    <span className="ml-auto text-xs text-slate-500 group-hover:text-slate-400 transition-colors flex items-center gap-1">
                        Read more <i className="ph-bold ph-caret-right text-xs"></i>
                    </span>
                </div>
            </div>
        </div>
    );
};

// Standard project card
const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
    <div
        className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 aspect-video"
        onClick={onClick}
    >
        <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-75 flex flex-col justify-end p-5">
            <h3 className="text-xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={tagClass(tag)}>{tag}</span>
                ))}
            </div>
        </div>
    </div>
);


const Projects: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState('All');

    const filterTabs = ['All', 'Enterprise', 'Next.js', 'E-commerce', 'WordPress', 'Frontend', 'Open Source'];

    const filteredProjects = filter === 'All'
        ? PROJECTS
        : filter === 'Enterprise'
            ? PROJECTS.filter(p => p.isFeatured)
            : filter === 'Frontend'
                ? PROJECTS.filter(p => p.tags.some(t => ['HTML', 'SCSS', 'Bootstrap', 'JavaScript', 'Frontend'].includes(t)))
                : filter === 'Next.js'
                    ? PROJECTS.filter(p => p.tags.some(t => ['Next.js', 'React', 'TypeScript', 'React/Next.js'].includes(t)))
                    : PROJECTS.filter(p => p.tags.includes(filter));

    const featuredProjects = filteredProjects.filter(p => p.isFeatured);
    const regularProjects = filteredProjects.filter(p => !p.isFeatured);

    return (
        <div className="max-w-7xl mx-auto">
            <SectionTitle>My Work</SectionTitle>
            <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto text-sm">
                Full Stack Next.js Developer &amp; Headless E-commerce Expert — building enterprise systems and open-source tools at Softzino Technologies.
            </p>

            {/* Filter tabs */}
            <div className="flex justify-center flex-wrap gap-2 mb-12">
                {filterTabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                            filter === tab
                                ? tab === 'Enterprise'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-700/30'
                                    : 'bg-purple-600 text-white'
                                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                        }`}
                    >
                        {tab === 'Enterprise' && <i className="ph-bold ph-star mr-1 text-yellow-300 text-xs"></i>}
                        {tab}
                    </button>
                ))}
            </div>

            {/* Featured / Enterprise projects */}
            {featuredProjects.length > 0 && (
                <div className="mb-10">
                    {filter === 'All' && (
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                            <span className="inline-block w-4 h-px bg-indigo-500"></span>
                            Enterprise Projects
                            <span className="inline-block flex-1 h-px bg-indigo-900"></span>
                        </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.map(project => (
                            <FeaturedProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                        ))}
                    </div>
                </div>
            )}

            {/* Regular projects */}
            {regularProjects.length > 0 && (
                <div>
                    {filter === 'All' && featuredProjects.length > 0 && (
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                            <span className="inline-block w-4 h-px bg-slate-600"></span>
                            Client Projects
                            <span className="inline-block flex-1 h-px bg-slate-800"></span>
                        </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {regularProjects.map(project => (
                            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                        ))}
                    </div>
                </div>
            )}

            {filteredProjects.length === 0 && (
                <p className="text-center text-gray-500 py-10">No projects match this filter.</p>
            )}

            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </div>
    );
};

export default Projects;