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
  heroTagline: 'Full Stack Software Engineer | MERN Stack Specialist',
  heroBio:
    'Building high-performance e-commerce architectures and modern web applications with a focus on speed, scalability, and seamless user experiences.',
  avatarUrl: '',
  githubUrl: '#',
  linkedinUrl: '#',
  twitterUrl: '#',
  upworkUrl: '#',
  email: 'almumeetu@gmail.com',
  aboutHeadline: 'I build scalable, fast, and modern web applications.',
  aboutBio:
    'I am a Full-Stack Engineer with deep expertise in Next.js, React, and modern backend stacks like PostgreSQL, SQLite, and Supabase.',
  aboutBio2:
    "I completed my HSC in 2021 and am currently preparing for a Bachelor's degree in Computer Science and Engineering (CSE) alongside the IELTS exam.",
  statYearsExp: '5+',
  statProjects: '250+',
  statSatisfaction: '100%',
  skillsFrontend: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
  skillsBackend: ['PostgreSQL', 'Supabase', 'SQLite', 'Prisma/Drizzle ORM'],
  skillsDevops: ['Docker', 'GitLab CI/CD', 'pnpm', 'Linux Server Deployment'],
  experience: [
    {
      year: 'Jan 2024 – Present',
      title: 'Associate Software Developer',
      company: 'Softzino Technologies, Dhaka',
      description:
        'Currently working on **E-Commerce Project**, focusing on modern front-end development using Next.js and Tailwind CSS.',
    },
    {
      year: 'Aug 2023 - Oct 2024',
      title: 'Online Tutor on demand',
      company: 'SSPTV, West Bengal, India',
      description:
        'Delivering web development instruction for a training center, educating students in HTML, CSS, SASS, Bootstrap, JavaScript, and jQuery.',
    },
    {
      year: 'Jan 2023 - Present',
      title: 'Web Designer/Developer',
      company: 'Upwork.com',
      description:
        'Developed websites using HTML, CSS, SCSS, Bootstrap, JS and jQuery. Communicating effectively with clients globally.',
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
    return { ...DEFAULTS, ...doc };
  } catch {
    return DEFAULTS;
  }
}
