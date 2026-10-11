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

// Disable buffering so queries fail immediately instead of hanging 10,000ms if DB is not connected
mongoose.set('bufferCommands', false);

const cached: Cached = global.mongoose || { conn: null, promise: null };
if (!global.mongoose) global.mongoose = cached;

export async function connectDB() {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		return null;
	}

	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
		};
		cached.promise = mongoose.connect(uri, opts).catch((err) => {
			cached.promise = null;
			throw err;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		console.error('MongoDB connection error:', error);
		return null;
	}

	return cached.conn;
}

