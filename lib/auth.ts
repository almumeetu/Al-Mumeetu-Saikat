import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from './db';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				await connectDB();

				const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
				const adminPassword = process.env.ADMIN_PASSWORD;
				if (!adminEmail || !adminPassword) return null;

				const adminCount = await User.countDocuments();
				if (adminCount === 0) {
					const hashed = await bcrypt.hash(adminPassword, 10);
					await User.create({
						email: adminEmail,
						password: hashed,
						name: 'Admin',
					});
				}

				const user = await User.findOne({ email: credentials.email.toLowerCase() });
				if (!user) return null;

				const valid = await bcrypt.compare(credentials.password, user.password);
				if (!valid) return null;

				return { id: user._id.toString(), email: user.email, name: user.name };
			},
		}),
	],
	session: { strategy: 'jwt' },
	pages: { signIn: '/admin/login' },
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.role = 'admin';
			return token;
		},
		async session({ session, token }) {
			if (session.user) (session.user as any).role = token.role;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
