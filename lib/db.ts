import mongoose from 'mongoose';

function getMongoDbUri() {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		throw new Error(
			'Missing MONGODB_URI. Create .env.local from .env.example and set your MongoDB connection string.',
		);
	}
	return uri;
}

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
		const uri = getMongoDbUri();
		cached.promise = mongoose.connect(uri, {
			bufferCommands: false,
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
