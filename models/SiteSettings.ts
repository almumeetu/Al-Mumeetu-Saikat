import mongoose, { Schema, models } from 'mongoose';

const SiteSettingsSchema = new Schema(
  {
    _id: { type: String, default: 'singleton' },

    // ── Hero / Personal Info ──────────────────────────────
    heroName: { type: String, default: 'Md Al Mumeetu (Al Mumeetu Saikat)' },
    heroTagline: { type: String, default: 'Software Engineer | React & Next.js Specialist | Full-Stack Developer' },
    heroBio: {
      type: String,
      default:
        'Frontend-focused software developer with 4+ years of experience building production web applications, ERP systems, e-commerce platforms, POS solutions, and business workflows.',
    },
    avatarUrl: { type: String, default: '' },

    // ── Social Links ──────────────────────────────────────
    githubUrl: { type: String, default: 'https://github.com/almumeetu' },
    linkedinUrl: { type: String, default: 'https://www.linkedin.com/in/almumeetu/' },
    twitterUrl: { type: String, default: '' },
    upworkUrl: { type: String, default: '' },
    email: { type: String, default: 'almumeetu@gmail.com' },

    // ── About ─────────────────────────────────────────────
    aboutHeadline: {
      type: String,
      default: 'I build reliable products with modern frontend engineering.',
    },
    aboutBio: {
      type: String,
      default:
        'I am a frontend-focused software developer specializing in React, Next.js, TypeScript, WordPress, and WooCommerce, with practical experience across REST APIs, Prisma, PostgreSQL, Supabase, and Docker.',
    },
    aboutBio2: {
      type: String,
      default:
        'I translate requirements into scalable product features, efficient workflows, and production-ready delivery while continuing my Bachelor of Science in Computer Science and Engineering at World University of Bangladesh.',
    },

    // ── Stats ─────────────────────────────────────────────
    statYearsExp: { type: String, default: '4+' },
    statProjects: { type: String, default: '120+' },
    statSatisfaction: { type: String, default: '200+' },

    // ── Skills (stored as JSON string arrays) ─────────────
    skillsFrontend: {
      type: [String],
      default: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap'],
    },
    skillsBackend: {
      type: [String],
      default: ['Node.js', 'Express.js', 'REST APIs', 'Prisma ORM', 'PostgreSQL', 'Supabase', 'MySQL'],
    },
    skillsDevops: {
      type: [String],
      default: ['Git', 'GitHub', 'Docker', 'Docker Compose', 'Vercel', 'GitHub Actions', 'Postman', 'Jira', 'Agile/Scrum'],
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
          year: 'Jan 2024 — Present',
          title: 'Associate Software Developer',
          company: 'Softzino Technologies · Dhaka, Bangladesh',
          description:
            'Develop and maintain production e-commerce and Point-of-Sale interfaces using Next.js, React, and TypeScript.\n• Build reusable responsive components, commerce workflows, and client-side interactions from product requirements and designs.\n• Integrate REST APIs and relational data using Prisma ORM, PostgreSQL, and Supabase, including inventory-related operations.\n• Collaborate directly with clients and stakeholders to gather requirements, discuss solutions, manage feedback, and deliver production-ready features.\n• Use Docker, Git, code review, and collaborative Agile workflows to deliver production features, fixes, and improvements.\n• Deliver tailored WordPress/WooCommerce solutions for international clients, including custom Elementor widgets and frontend fixes.',
        },
        {
          year: 'Nov 2022 – Dec 2023',
          title: 'Frontend Developer / Web Designer',
          company: 'WebDev Software Solutions',
          description:
            'Developed 120+ responsive, cross-browser websites using HTML5, CSS3, JavaScript, SCSS, and Bootstrap. Customized WordPress themes, plugins, and WooCommerce sites while collaborating in Git/GitHub-based sprint teams.',
        },
        {
          year: 'Aug 2022 – Oct 2022',
          title: 'Web Designer Intern',
          company: 'Bdevs · Mirpur DOHS, Dhaka',
          description:
            'Built responsive components and marketing landing pages with senior engineers, checking cross-browser consistency, breakpoints, and accessibility.',
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
