import mongoose, { Schema, models } from 'mongoose';

const SiteSettingsSchema = new Schema(
  {
    _id: { type: String, default: 'singleton' },

    // ── Hero / Personal Info ──────────────────────────────
    heroName: { type: String, default: 'Md Al Mumeetu (Al Mumeetu Saikat)' },
    heroTagline: { type: String, default: 'Full Stack Software Engineer | MERN Stack Specialist' },
    heroBio: {
      type: String,
      default:
        'Building high-performance e-commerce architectures and modern web applications with a focus on speed, scalability, and seamless user experiences.',
    },
    avatarUrl: { type: String, default: '' },

    // ── Social Links ──────────────────────────────────────
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    upworkUrl: { type: String, default: '' },
    email: { type: String, default: 'almumeetu@gmail.com' },

    // ── About ─────────────────────────────────────────────
    aboutHeadline: {
      type: String,
      default: 'I build scalable, fast, and modern web applications.',
    },
    aboutBio: {
      type: String,
      default:
        'I am a Full-Stack Engineer with deep expertise in Next.js, React, and modern backend stacks like PostgreSQL, SQLite, and Supabase.',
    },
    aboutBio2: {
      type: String,
      default:
        'I completed my HSC in 2021 and am currently preparing for a Bachelor\'s degree in CSE alongside the IELTS exam.',
    },

    // ── Stats ─────────────────────────────────────────────
    statYearsExp: { type: String, default: '5+' },
    statProjects: { type: String, default: '250+' },
    statSatisfaction: { type: String, default: '100%' },

    // ── Skills (stored as JSON string arrays) ─────────────
    skillsFrontend: {
      type: [String],
      default: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Bootstrap 5', 'SASS'],
    },
    skillsBackend: {
      type: [String],
      default: ['PostgreSQL', 'Supabase', 'SQLite', 'Prisma/Drizzle ORM'],
    },
    skillsDevops: {
      type: [String],
      default: ['Docker', 'GitLab CI/CD', 'pnpm', 'Linux Server Deployment'],
    },

    // ── Experience ────────────────────────────────────────
    experience: {
      type: [
        {
          year: String,
          title: String,
          company: String,
          description: String,
        },
      ],
      default: [
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
    },
    // ── Services ──────────────────────────────────────────
    services: {
      type: [
        {
          icon: String,
          title: String,
          desc: String,
          count: String,
        },
      ],
      default: [
        { icon: 'Blocks', title: 'Full-Stack Apps', desc: 'End-to-end web apps using Next.js, Vue, and Nuxt.', count: '30+ Apps' },
        { icon: 'Database', title: 'Database Architecture', desc: 'Robust data modeling with PostgreSQL, SQLite, and Supabase.', count: '20+ Databases' },
        { icon: 'Server', title: 'API & Backend', desc: 'Secure APIs, authentication, and serverless functions.', count: '40+ Integrations' },
        { icon: 'Code', title: 'Frontend Engineering', desc: 'Interactive, accessible UIs with React and Tailwind CSS.', count: '100+ Projects' },
      ],
    },
  },
  { _id: false, timestamps: true },
);

export default models.SiteSettings ||
  mongoose.model('SiteSettings', SiteSettingsSchema, 'sitesettings');
