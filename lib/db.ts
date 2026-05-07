import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Please define MONGODB_URI');

interface Cached {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	// eslint-disable-next-line no-var
	var mongoose: Cached | undefined;
}

const cached: Cached = global.mongoose || { conn: null, promise: null };
if (!global.mongoose) global.mongoose = cached;

export async function connectDB() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		const uri = MONGODB_URI!;
		cached.promise = mongoose.connect(uri, {
			bufferCommands: false,
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
