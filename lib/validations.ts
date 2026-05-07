import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().min(2, 'Name too short'),
	email: z.string().email('Invalid email'),
	subject: z.string().min(3).optional(),
	message: z.string().min(10, 'Message too short'),
});

export const subscribeSchema = z.object({
	email: z.string().email('Invalid email'),
});

export const blogSchema = z.object({
	title: z.string().min(3),
	excerpt: z.string().min(10),
	content: z.string().min(20),
	coverImage: z.string().url(),
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
	published: z.boolean().optional(),
});

export const projectSchema = z.object({
	title: z.string().min(3),
	description: z.string().min(10),
	image: z.string().url(),
	category: z.string().min(2),
	tech: z.array(z.string()).optional(),
	liveUrl: z.string().url().optional().or(z.literal('')),
	githubUrl: z.string().url().optional().or(z.literal('')),
	featured: z.boolean().optional(),
});
