import React from 'react';
import type { Skill, Project, ExperienceItem, BlogPost, GalleryImage, EducationItem, OnlineCourseItem, Service } from './types';
import { 
    HtmlIcon, CssIcon, SassIcon, BootstrapIcon, TailwindCssIcon, JavascriptIcon, ReactIcon, NextjsIcon,
    WordpressIcon, GitIcon, GithubIcon,
    TypeScriptIcon, PostgreSQLIcon, DockerIcon, SupabaseIcon, PrismaIcon, DrizzleIcon, GitLabIcon, PnpmIcon, SQLiteIcon
} from './components/icons';

export const SKILLS: { [key: string]: Skill[] } = {
  "Modern Full-Stack": [
    { name: "Next.js (App Router)", icon: NextjsIcon },
    { name: "React 19", icon: ReactIcon },
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "JavaScript", icon: JavascriptIcon },
    { name: "Tailwind CSS", icon: TailwindCssIcon },
  ],
  "Database & ORM": [
    { name: "PostgreSQL", icon: PostgreSQLIcon },
    { name: "Supabase", icon: SupabaseIcon },
    { name: "SQLite", icon: SQLiteIcon },
    { name: "Prisma", icon: PrismaIcon },
    { name: "Drizzle ORM", icon: DrizzleIcon },
  ],
  "Infrastructure & DevOps": [
    { name: "Docker", icon: DockerIcon },
    { name: "pnpm", icon: PnpmIcon },
    { name: "GitLab CI/CD", icon: GitLabIcon },
    { name: "Git", icon: GitIcon },
    { name: "GitHub", icon: GithubIcon },
  ],
  "Web Foundations": [
    { name: "HTML5", icon: HtmlIcon },
    { name: "CSS3", icon: CssIcon },
    { name: "SASS/SCSS", icon: SassIcon },
    { name: "Bootstrap", icon: BootstrapIcon },
    { name: "WordPress", icon: WordpressIcon },
  ],
};

export const SERVICES: Service[] = [
  {
    title: "Headless E-commerce Development",
    description: "Architecting high-performance, API-driven storefronts with Next.js App Router, focusing on scalability, Core Web Vitals, and conversion-optimized UX.",
    projects: "Enterprise-Grade",
    icon: "ph-storefront",
  },
  {
    title: "Full Stack Next.js Development",
    description: "Building end-to-end production applications with Next.js, React 19, TypeScript, and modern ORM layers (Prisma/Drizzle) on PostgreSQL & Supabase.",
    projects: "Production Systems",
    icon: "ph-stack",
  },
  {
    title: "Dynamic Page Builder Systems",
    description: "Designing and implementing drag-and-drop landing page builders within Next.js for rapid, no-code marketing deployment at enterprise scale.",
    projects: "Custom Architecture",
    icon: "ph-layout",
  },
  {
    title: "DevOps & Local Environments",
    description: "Configuring Docker-based local dev environments with seed data scripts, managing GitLab CI/CD pipelines, and coordinating server deployments.",
    projects: "CI/CD Pipelines",
    icon: "ph-gear-six",
  },
  {
    title: "Open Source UI Libraries",
    description: "Published and maintained neocomerz-storefront-ui on pnpm — a reusable component library for e-commerce storefronts, released as an open-source package.",
    projects: "npm Published",
    icon: "ph-package",
  },
  {
    title: "PSD / Figma to Next.js",
    description: "Pixel-perfect conversion of design files into responsive, accessible React/Next.js components with Tailwind CSS and TypeScript.",
    projects: "60+ Designs",
    icon: "ph-paint-brush",
  },
  {
    title: "WordPress Theme Development",
    description: "Built production-ready custom WordPress themes and WooCommerce stores from scratch for international clients (Japanese market).",
    projects: "10+ Themes",
    icon: "ph-code",
  },
  {
    title: "SEO & Web Performance",
    description: "Optimizing Next.js apps for Core Web Vitals, semantic markup, and structured data. Experienced in SSR, ISR, and RSC rendering strategies.",
    projects: "Performance Expert",
    icon: "ph-chart-line-up",
  }
];

export const PROJECTS: Project[] = [
  {
    id: 9,
    title: "Enterprise Headless E-commerce Storefronts",
    description: "High-performance headless e-commerce themes built with Next.js App Router, targeting scalability and API-driven architecture for enterprise clients.",
    longDescription: "Architected and developed a suite of production-grade headless e-commerce storefronts using Next.js 14+ App Router and React 19. The system decouples the frontend entirely from the backend, consuming APIs for product data, cart, and checkout flows. Key engineering decisions include React Server Components (RSC) for maximum performance, ISR/SSG for catalog pages to achieve sub-second TTFBs, and a fully TypeScript-typed data layer. The architecture scales horizontally and supports multiple brand storefronts from a single codebase via theme configuration. Strict attention to Core Web Vitals (LCP, CLS, FID) ensures high Lighthouse scores. All environments are containerized with Docker and seeded with realistic test data.",
    imageUrl: "/images/projects/airlined-pethotel.png",
    tags: ["Next.js", "TypeScript", "E-commerce", "Docker", "PostgreSQL"],
    isFeatured: true,
  },
  {
    id: 10,
    title: "Custom Next.js Dynamic Page Builder",
    description: "Architected a drag-and-drop landing page builder within Next.js — enabling marketing teams to deploy conversion pages without engineering support.",
    longDescription: "Designed and built a fully extensible dynamic page builder system embedded within Next.js. The architecture uses a JSON-driven component registry, allowing marketing teams to compose landing pages from a palette of pre-built blocks (Hero, FAQ, Testimonials, CTA, etc.) via an intuitive drag-and-drop interface. Technically, each block is a typed React component with a schema-validated configuration — enabling live preview via React state and persistence to a PostgreSQL database through Prisma ORM. The builder supports multi-variant A/B test pages and integrates with a GitLab CI/CD pipeline for staged deployments.",
    imageUrl: "/images/projects/sycho.png",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "React"],
    isFeatured: true,
  },
  {
    id: 11,
    title: "neocomerz-storefront-ui (pnpm Package)",
    description: "Published an open-source UI component library for e-commerce storefronts on pnpm — install with: pnpm add neocomerz-storefront-ui",
    longDescription: "Designed and published neocomerz-storefront-ui, a reusable, tree-shakeable React component library tailored to e-commerce storefronts. The package includes production-ready components: product cards, cart drawers, quantity selectors, badge systems, and layout primitives — all fully typed with TypeScript and styled with Tailwind CSS variants. Published on the pnpm registry for fast, deterministic installs. The library follows composable design patterns and is used internally across multiple storefront themes, reducing duplicated UI code by over 60%.",
    imageUrl: "/images/projects/gardomia-1.png",
    tags: ["TypeScript", "React", "pnpm", "Open Source", "E-commerce"],
    isFeatured: true,
    codeUrl: "https://www.npmjs.com/package/neocomerz-storefront-ui",
  },
  {
    id: 1,
    title: "Airlinehnd Pethotel",
    description: "A professional website for a pet hotel service, built on WordPress with Elementor.",
    longDescription: "This project for a Japanese client involved creating a clean, user-friendly website to showcase their pet hotel services. Built with WordPress and Elementor, it features custom post types for services, a gallery, and clear contact information. The design is fully responsive and optimized for performance.",
    imageUrl: "/images/projects/airlined-pethotel.png",
    tags: ["WordPress", "Elementor", "Frontend"],
    liveUrl: "https://www.airlinehnd-pethotel.com/",
  },
  {
    id: 2,
    title: "News Auto",
    description: "A comprehensive automobile news and inspection service portal from Japan.",
    longDescription: "News Auto required a robust platform to deliver auto news and manage vehicle inspection services. The site was developed on WordPress using Elementor, featuring complex layouts, service booking integration, and a news blog. It's optimized for high traffic and lead generation.",
    imageUrl: "/images/projects/news-auto.png",
    tags: ["WordPress", "E-commerce", "Frontend"],
    liveUrl: "https://www.news-auto.net/",
  },
  {
    id: 3,
    title: "Grand Cru Animal Eye Clinic",
    description: "An elegant and professional website for a specialized animal eye clinic.",
    longDescription: "This project focused on creating a sophisticated and trustworthy online presence for an animal eye clinic. The site features a minimalist design, detailed service pages, and an easy-to-use contact system. Built with WordPress and Elementor for easy content management by the client.",
    imageUrl: "/images/projects/grand-cru.png",
    tags: ["WordPress", "Frontend", "E-commerce"],
    liveUrl: "https://grandcru-aec.com/",
  },
  {
    id: 4,
    title: "Fuji Horse Riding Club",
    description: "A visually engaging website for a horse riding club in Japan.",
    longDescription: "The goal was to capture the excitement and beauty of horse riding. The website uses high-quality imagery and a dynamic layout to attract new members. It includes information on lessons, club membership, and events. Developed using WordPress and Elementor.",
    imageUrl: "/images/projects/fuji-horse.png",
    tags: ["WordPress", "Elementor", "Booking"],
    liveUrl: "https://fuji-horse.com/",
  },
  {
    id: 5,
    title: "Sycho - Psychology HTML Template",
    description: "A modern and responsive HTML5 template for psychology and therapy clinics.",
    longDescription: "Sycho is a premium, handcrafted HTML5 template designed for counselors, psychologists, and health clinics. It features a clean, calming design, multiple page layouts, and is built with Bootstrap for full responsiveness. The code is well-commented and easy to customize.",
    imageUrl: "/images/projects/sycho.png",
    tags: ["Frontend", "Tailwind", "React/Next.js"],
    liveUrl: "https://almumeetu.github.io/sycho/",
  },
  {
    id: 6,
    title: "Gardomia - Gardening HTML Template",
    description: "A beautiful and feature-rich HTML5 template for landscaping and gardening businesses.",
    longDescription: "Gardomia is a fully responsive template built with Bootstrap. It's designed to help gardening businesses create a professional online presence. Features include service pages, project galleries, and a contact form. The SASS files are included for easy styling.",
    imageUrl: "/images/projects/gardomia-1.png",
    tags: ["HTML", "SCSS", "Bootstrap", "JavaScript"],
    liveUrl: "https://almumeetu.github.io/gardomia/",
  },
  {
    id: 7,
    title: "Nailsalongalene",
    description: "A stylish and chic website for a nail salon in Japan.",
    longDescription: "This project showcases the salon's services, portfolio, and pricing in an elegant design. Built on WordPress with Elementor, it allows the owner to easily update their gallery and services. The site includes a booking inquiry form and is mobile-friendly.",
    imageUrl: "/images/projects/nail-salone.png",
    tags: ["WordPress", "Elementor", "E-commerce"],
    liveUrl: "https://nailsalongalene.com/",
  },
  {
    id: 8,
    title: "Men's Egg Drama",
    description: "A promotional website for the Men's Egg Japanese fashion model collection and event.",
    longDescription: "A visually-driven website for a fashion event. This site features bold typography, a model collection gallery, and event details. Built with WordPress and Elementor, it is designed to be impactful and easy to navigate for fans.",
    imageUrl: "/images/projects/mens-egg.png",
    tags: ["WordPress", "Elementor", "Events"],
    liveUrl: "https://mensegg.jp/",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
    {
        role: "Associate Software Developer — Full Stack Next.js",
        company: "Softzino Technologies, Dhaka",
        period: "Jan 2024 – Present",
        description: [
            "Architecting and developing **enterprise-grade headless e-commerce storefronts** using **Next.js App Router**, **React 19**, and **TypeScript** — targeting scalability, high traffic, and sub-second page loads via RSC, ISR, and SSG strategies.",
            "Designed and built a **dynamic landing page builder** system in Next.js, enabling marketing teams to compose and deploy conversion pages without engineering involvement — reducing time-to-publish by ~70%.",
            "Developed and published **neocomerz-storefront-ui** on **pnpm** — an open-source, tree-shakeable UI component library for e-commerce interfaces, now reused across multiple internal storefront themes.",
            "Engineered the **data layer** using **PostgreSQL + Prisma ORM** and **SQLite + Drizzle ORM** for different project contexts; integrated **Supabase** for auth and real-time features.",
            "Configured and maintained **Docker-based local development environments** with seed data scripts, ensuring environment parity across the engineering team.",
            "Managed **GitLab CI/CD pipelines** for automated build, test, and deployment workflows; coordinated server deployments with zero-downtime release strategies.",
            "Collaborated within a cross-functional team using **GitLab Flow**, conducting code reviews, breaking down technical tickets, and contributing to architectural decisions.",
        ],
    },
    {
        role: "Online Tutor on demand",
        company: "SSPTV, West Bengal, India",
        period: "Aug 2023 - Oct 2024",
        description: [
            "Delivering web development instruction for a training center, educating students in HTML, CSS, SASS, Bootstrap, JavaScript, and jQuery."
        ],
    },
    {
        role: "Web Designer/Developer",
        company: "Upwork.com",
        period: "Jan 2023 - Present",
        description: [
            "Developed websites using HTML, CSS, SCSS, Bootstrap, JS and jQuery.",
            "Communicating effectively with clients to understand their requirements and preferences.",
            "Collaborated on global freelancing projects."
        ],
    },
    {
        role: "Web Designer",
        company: "WebDev Software Solutions, Joypurhat",
        period: "Nov 2022 – Dec 2023",
        description: [
            "Developed responsive websites using HTML, SCSS, Bootstrap, JavaScript, and jQuery.",
            "Ensured cross-browser compatibility and adaptive design using media queries.",
            "Used Git/GitHub for version control and collaboration.",
            "Customized websites with WordPress, handling themes, plugins, and basic PHP.",
            "Built mini JavaScript projects and solved 200+ JS challenges on GitHub."
        ],
    },
    {
        role: "Web Designer Intern",
        company: "Bdevs, Dhaka",
        period: "Aug 2022 - Oct 2022",
        description: [
            "Collaborated with developers to write and maintain clean, efficient code.",
            "Gained hands-on expertise in Responsive Design, SEO, Bootstrap, and SCSS.",
            "Built responsive websites using HTML, CSS/SCSS, Bootstrap, JavaScript, and jQuery.",
            "Ensured cross-browser compatibility and device responsiveness with media queries and adaptive techniques."
        ],
    },
    {
        role: "Web Design Trainee",
        company: "WebDev Software Solutions, Joypurhat",
        period: "Apr 2022 – Jul 2022",
        description: [
            "Enthusiastic Web Design Trainee proficient in HTML, CSS, and JavaScript.",
            "Actively applying these technologies to acquire hands-on experience."
        ],
    }
];

export const EDUCATION: EducationItem[] = [
     {
        degree: "BSc in CSE",
        institution: "World University Of Bangladesh",
        period: "2025 - Present",
    },
    {
        degree: "HSC in Science",
        institution: "Jahangirpur Govt. Collage, Mohadevpur, Naogaon",
        period: "Dec 2019 - Dec 2021",
    },
    {
        degree: "SSC in Science",
        institution: "Bagdob High School, Mohadevpur, Naogaon",
        period: "Jan 2014 - Nov 2019",
    }
];

export const ONLINE_COURSES: OnlineCourseItem[] = [
    { title: "Web Designer Courses", platform: "BanglaDevs, Dhaka" },
    { title: "PSD to HTML", platform: "Bangla-devs" },
    { title: "SASS & Bootstrap", platform: "Bangla-devs" },
    { title: "WordPress Theme Developement", platform: "Weblearn" },
];


export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Power of Custom Elementor Widgets",
    excerpt: "A look into how custom Elementor widgets can transform a standard WordPress site into a unique, dynamic experience.",
    date: "July 15, 2024",
    imageUrl: "https://picsum.photos/seed/blog1/600/400",
  },
  {
    id: 2,
    title: "From WordPress to Headless: A Next.js Journey",
    excerpt: "Exploring the benefits of a headless CMS architecture using WordPress with a Next.js frontend.",
    date: "June 28, 2024",
    imageUrl: "https://picsum.photos/seed/blog2/600/400",
  },
  {
    id: 3,
    title: "Styling with Speed: A Tailwind CSS Deep Dive",
    excerpt: "How utility-first CSS with Tailwind can dramatically speed up development and improve maintainability.",
    date: "May 10, 2024",
    imageUrl: "https://picsum.photos/seed/blog3/600/400",
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, src: "https://picsum.photos/seed/gallery1/600/600", alt: "Abstract colorful design" },
    { id: 2, src: "https://picsum.photos/seed/gallery2/600/600", alt: "Modern workspace with laptop" },
    { id: 3, src: "https://picsum.photos/seed/gallery3/600/600", alt: "Cityscape at night" },
    { id: 4, src: "https://picsum.photos/seed/gallery4/600/600", alt: "Serene nature landscape" },
    { id: 5, src: "https://picsum.photos/seed/gallery5/600/600", alt: "Minimalist interior design" },
    { id: 6, src: "https://picsum.photos/seed/gallery6/600/600", alt: "Close-up of code on a screen" },
];