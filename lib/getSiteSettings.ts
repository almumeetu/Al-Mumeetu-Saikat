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
  experience: { year: string; title: string; description: string }[];
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
      year: 'April 2026 - Present',
      title: 'AI Feedback Engineer @ Outlier / Scale AI',
      description:
        'Evaluating AI model logic and technical accuracy for coding projects, ensuring high-quality outputs for advanced AI systems.',
    },
    {
      year: '2023 - Present',
      title: 'Associate Software Developer @ Softzino Technologies',
      description:
        'Focusing on e-commerce themes, custom page builders, and headless architecture to deliver scalable and performant web solutions.',
    },
    {
      year: '2020 - 2023',
      title: 'WordPress & Frontend Specialist',
      description:
        'Delivered robust client websites, landing pages, and custom WordPress builds with a focus on speed and maintainability.',
    },
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
