import { connectDB } from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';

export type SiteSettingsData = {
  heroName: string;
  heroTagline: string;
  heroBio: string;
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  upworkUrl: string;
  email: string;
  aboutHeadline: string;
  aboutBio: string;
  aboutBio2: string;
  statYearsExp: string;
  statProjects: string;
  statSatisfaction: string;
  skillsFrontend: string[];
  skillsBackend: string[];
  skillsDevops: string[];
  experience: { year: string; title: string; company: string; description: string }[];
  services: { icon: string; title: string; desc: string; count: string }[];
};

const DEFAULTS: SiteSettingsData = {
  heroName: 'Md Al Mumeetu (Al Mumeetu Saikat)',
  heroTagline: 'Software Engineer | React & Next.js Specialist | Full-Stack Developer',
  heroBio:
    'Frontend-focused software developer with 4+ years of experience building production web applications, ERP systems, e-commerce platforms, POS solutions, and business workflows.',
  avatarUrl: '',
  githubUrl: 'https://github.com/almumeetu',
  linkedinUrl: 'https://www.linkedin.com/in/almumeetu/',
  twitterUrl: '#',
  upworkUrl: '#',
  email: 'almumeetu@gmail.com',
  aboutHeadline: 'I build reliable products with modern frontend engineering.',
  aboutBio:
    'I am a frontend-focused software developer specializing in React, Next.js, TypeScript, WordPress, and WooCommerce, with practical experience across REST APIs, Prisma, PostgreSQL, Supabase, and Docker.',
  aboutBio2:
    "I translate requirements into scalable product features, efficient workflows, and production-ready delivery while continuing my Bachelor of Science in Computer Science and Engineering at World University of Bangladesh.",
  statYearsExp: '4+',
  statProjects: '120+',
  statSatisfaction: '200+',
  skillsFrontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap'],
  skillsBackend: ['Node.js', 'Express.js', 'REST APIs', 'Prisma ORM', 'PostgreSQL', 'Supabase', 'MySQL'],
  skillsDevops: ['Git', 'GitHub', 'Docker', 'Docker Compose', 'Vercel', 'GitHub Actions', 'Postman', 'Jira', 'Agile/Scrum'],
  experience: [
    {
      year: 'Jan 2024 – Present',
      title: 'Associate Software Developer',
      company: 'Softzino Technologies · Dhaka',
      description:
        'Develop and maintain production e-commerce and Point-of-Sale interfaces using **Next.js**, **React**, and **TypeScript**. Build reusable responsive components, integrate REST APIs and relational data with **Prisma**, **PostgreSQL**, and **Supabase**, and deliver features through Docker, Git, code review, and Agile workflows.',
    },
    {
      year: 'Nov 2022 – Dec 2023',
      title: 'Frontend Developer / Web Designer',
      company: 'WebDev Software Solutions',
      description:
        'Developed **120+ responsive**, cross-browser websites using HTML5, CSS3, JavaScript, SCSS, and Bootstrap. Customized WordPress themes, plugins, and WooCommerce sites while collaborating in Git/GitHub-based sprint teams.',
    },
    {
      year: 'Aug 2022 – Oct 2022',
      title: 'Web Designer Intern',
      company: 'Bdevs · Mirpur DOHS, Dhaka',
      description:
        'Built responsive components and marketing landing pages with senior engineers, checking cross-browser consistency, breakpoints, and accessibility.',
    },
  ],
  services: [
    { icon: 'Blocks', title: 'Full-Stack Apps', desc: 'End-to-end web apps using Next.js, Vue, and Nuxt.', count: '30+ Apps' },
    { icon: 'Database', title: 'Database Architecture', desc: 'Robust data modeling with PostgreSQL, SQLite, and Supabase.', count: '20+ Databases' },
    { icon: 'Server', title: 'API & Backend', desc: 'Secure APIs, authentication, and serverless functions.', count: '40+ Integrations' },
    { icon: 'Code', title: 'Frontend Engineering', desc: 'Interactive, accessible UIs with React and Tailwind CSS.', count: '100+ Projects' },
    { icon: 'Globe', title: 'Custom WordPress', desc: 'Themes from scratch, plugin modifications, and Elementor.', count: '150+ Sites' },
    { icon: 'Smartphone', title: 'Responsive Design', desc: 'Mobile-first interfaces that look great on any device.', count: '200+ Projects' },
    { icon: 'Palette', title: 'UI/UX Implementation', desc: 'Figma to high-fidelity, pixel-perfect code conversion.', count: '80+ Projects' },
    { icon: 'Search', title: 'SEO & Performance', desc: 'Core Web Vitals optimization and semantic markup.', count: '50+ Audits' },
  ],
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    await connectDB();
    const doc = await SiteSettings.findById('singleton').lean<SiteSettingsData>();
    if (!doc) {
      const created = await SiteSettings.create({ _id: 'singleton' });
      return { ...DEFAULTS, ...created.toObject() };
    }
    return {
      ...DEFAULTS,
      ...doc,
      githubUrl: doc.githubUrl || DEFAULTS.githubUrl,
      linkedinUrl: doc.linkedinUrl || DEFAULTS.linkedinUrl,
    };
  } catch {
    return DEFAULTS;
  }
}
