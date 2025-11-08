import React from 'react';
import type { Skill, Project, ExperienceItem, BlogPost, GalleryImage, EducationItem, OnlineCourseItem, Service } from './types';
import { 
    HtmlIcon, CssIcon, SassIcon, BootstrapIcon, TailwindCssIcon, JavascriptIcon, JqueryIcon, ReactIcon, NextjsIcon,
    WordpressIcon, ElementorIcon, WoocommerceIcon, PhpIcon, GitIcon, GithubIcon
} from './components/icons';

export const SKILLS: { [key: string]: Skill[] } = {
  "Web Design": [
    { name: "HTML5", icon: HtmlIcon },
    { name: "CSS3", icon: CssIcon },
    { name: "SASS/SCSS", icon: SassIcon },
    { name: "Bootstrap", icon: BootstrapIcon },
  ],
  "Modern Frontend": [
    { name: "JavaScript", icon: JavascriptIcon },
    { name: "jQuery", icon: JqueryIcon },
    { name: "React", icon: ReactIcon },
    { name: "Next.js", icon: NextjsIcon },
    { name: "Tailwind CSS", icon: TailwindCssIcon },
  ],
  "CMS & Backend": [
    { name: "WordPress", icon: WordpressIcon },
    { name: "Elementor", icon: ElementorIcon },
    { name: "WooCommerce", icon: WoocommerceIcon },
    { name: "PHP", icon: PhpIcon },
  ],
  "Tools & Workflow": [
    { name: "Git", icon: GitIcon },
    { name: "GitHub", icon: GithubIcon },
  ],
};

export const SERVICES: Service[] = [
  {
    title: "Frontend Web Development",
    description: "Expert in HTML5, CSS3, JavaScript, SCSS, and responsive design. Clean, accessible code with pixel-perfect results.",
    projects: "150+ Projects",
    icon: "ph-laptop-code",
  },
  {
    title: "PSD / Figma to HTML",
    description: "Convert PSD or Figma files into responsive, W3C-validated HTML using Bootstrap or custom layouts.",
    projects: "90+ Projects",
    icon: "ph-paint-brush",
  },
  {
    title: "Elementor Website Building",
    description: "Highly skilled in building modern websites with Elementor Pro including custom widgets, animations, and dynamic content.",
    projects: "70+ Projects",
    icon: "ph-selection-all",
  },
  {
    title: "Custom WordPress Theme Development",
    description: "Develop WordPress themes from scratch with advanced PHP, template hierarchy, hooks, and clean structure.",
    projects: "45+ Themes",
    icon: "ph-code",
  },
  {
    title: "JavaScript Development",
    description: "Strong foundation in vanilla JavaScript: DOM manipulation, functions, ES6, animations, and interactive UI components.",
    projects: "60+ Projects",
    icon: "ph-file-js",
  },
  {
    title: "SASS / SCSS Styling",
    description: "Experienced in writing efficient, scalable SCSS code using variables, mixins, nesting, and modular organization.",
    projects: "40+ Projects",
    icon: "ph-paint-roller",
  },
  {
    title: "Bootstrap Development",
    description: "Build fast, mobile-first websites using Bootstrap 4/5 with full grid, utility, and component-based layouts.",
    projects: "50+ Projects",
    icon: "ph-t-shirt",
  },
  {
    title: "SEO & Optimization",
    description: "Improve website ranking and performance with on-page SEO, page speed improvements, and semantic markup.",
    projects: "15+ Projects",
    icon: "ph-chart-line-up",
  }
];

export const PROJECTS: Project[] = [
    {
    id: 1,
    title: "Airlinehnd Pethotel",
    description: "A professional website for a pet hotel service, built on WordPress with Elementor.",
    longDescription: "This project for a Japanese client involved creating a clean, user-friendly website to showcase their pet hotel services. Built with WordPress and Elementor, it features custom post types for services, a gallery, and clear contact information. The design is fully responsive and optimized for performance.",
    imageUrl: "https://i.ibb.co/d2N8pW2/al-hnd.png",
    tags: ["WordPress", "Elementor", "Custom Theme"],
    liveUrl: "https://www.airlinehnd-pethotel.com/",
  },
  {
    id: 2,
    title: "News Auto",
    description: "A comprehensive automobile news and inspection service portal from Japan.",
    longDescription: "News Auto required a robust platform to deliver auto news and manage vehicle inspection services. The site was developed on WordPress using Elementor, featuring complex layouts, service booking integration, and a news blog. It's optimized for high traffic and lead generation.",
    imageUrl: "https://i.ibb.co/9vM5xW0/news-auto.png",
    tags: ["WordPress", "Elementor", "PHP", "Custom Plugin"],
    liveUrl: "https://www.news-auto.net/",
  },
  {
    id: 3,
    title: "Grand Cru Animal Eye Clinic",
    description: "An elegant and professional website for a specialized animal eye clinic.",
    longDescription: "This project focused on creating a sophisticated and trustworthy online presence for an animal eye clinic. The site features a minimalist design, detailed service pages, and an easy-to-use contact system. Built with WordPress and Elementor for easy content management by the client.",
    imageUrl: "https://i.ibb.co/9g0g2Y7/grand-cru.png",
    tags: ["WordPress", "Elementor", "UI/UX"],
    liveUrl: "https://grandcru-aec.com/",
  },
  {
    id: 4,
    title: "Fuji Horse Riding Club",
    description: "A visually engaging website for a horse riding club in Japan.",
    longDescription: "The goal was to capture the excitement and beauty of horse riding. The website uses high-quality imagery and a dynamic layout to attract new members. It includes information on lessons, club membership, and events. Developed using WordPress and Elementor.",
    imageUrl: "https://i.ibb.co/gZ7rVzQ/fuji-horse.png",
    tags: ["WordPress", "Elementor", "Booking"],
    liveUrl: "https://fuji-horse.com/",
  },
    {
    id: 5,
    title: "Sycho - Psychology HTML Template",
    description: "A modern and responsive HTML5 template for psychology and therapy clinics.",
    longDescription: "Sycho is a premium, handcrafted HTML5 template designed for counselors, psychologists, and health clinics. It features a clean, calming design, multiple page layouts, and is built with Bootstrap for full responsiveness. The code is well-commented and easy to customize.",
    imageUrl: "https://i.ibb.co/L8zBjw3/sycho.png",
    tags: ["HTML", "SCSS", "Bootstrap", "JavaScript", "jQuery"],
    liveUrl: "https://almumeetu.github.io/sycho/",
  },
  {
    id: 6,
    title: "Gardomia - Gardening HTML Template",
    description: "A beautiful and feature-rich HTML5 template for landscaping and gardening businesses.",
    longDescription: "Gardomia is a fully responsive template built with Bootstrap. It's designed to help gardening businesses create a professional online presence. Features include service pages, project galleries, and a contact form. The SASS files are included for easy styling.",
    imageUrl: "https://i.ibb.co/sKkGv7C/gardomia.png",
    tags: ["HTML", "SCSS", "Bootstrap", "JavaScript"],
    liveUrl: "https://almumeetu.github.io/gardomia/",
  },
    {
    id: 7,
    title: "Nailsalongalene",
    description: "A stylish and chic website for a nail salon in Japan.",
    longDescription: "This project showcases the salon's services, portfolio, and pricing in an elegant design. Built on WordPress with Elementor, it allows the owner to easily update their gallery and services. The site includes a booking inquiry form and is mobile-friendly.",
    imageUrl: "https://i.ibb.co/qmWfX0D/nail-salone.png",
    tags: ["WordPress", "Elementor", "E-commerce"],
    liveUrl: "https://nailsalongalene.com/",
  },
  {
    id: 8,
    title: "Men's Egg Drama",
    description: "A promotional website for the Men's Egg Japanese fashion model collection and event.",
    longDescription: "A visually-driven website for a fashion event. This site features bold typography, a model collection gallery, and event details. Built with WordPress and Elementor, it is designed to be impactful and easy to navigate for fans.",
    imageUrl: "https://i.ibb.co/Jqj8c4j/mens-egg.png",
    tags: ["WordPress", "Elementor", "Events"],
    liveUrl: "https://mensegg.jp/",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
    {
        role: "Associate Software Developer",
        company: "Softzino Technologies, Dhaka",
        period: "Jan 2024 – Present",
        description: [
            "Worked on Japanese client projects, focusing on Elementor-based WordPress development.",
            "Built and customized WordPress themes and developed custom Elementor widgets with dynamic controls.",
            "Created responsive HTML templates following ThemeForest standards.",
            "Developed and maintained WordPress plugins tailored to specific project needs.",
            "Fixed advanced Elementor bugs and layout issues with clean, optimized code.",
            "Collaborated within a dedicated team to deliver scalable, high-performance websites."
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
        period: "2024 - Present",
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