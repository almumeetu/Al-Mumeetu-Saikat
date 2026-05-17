import type { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import Project from '@/models/Project';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://almumeetusaikat.com';

export const revalidate = 3600; // regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  // Dynamic blog posts
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const blogs = await Blog.find({ published: true })
      .select('slug updatedAt')
      .lean<{ slug: string; updatedAt: Date }[]>();
    blogEntries = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt ?? new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap Blog Fetch Error:', error);
  }

  // Dynamic project pages (if you add individual project pages later)
  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const projects = await Project.find({})
      .select('slug updatedAt')
      .lean<{ slug: string; updatedAt: Date }[]>();
    projectEntries = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap Project Fetch Error:', error);
  }

  return [...staticPages, ...blogEntries, ...projectEntries];
}
