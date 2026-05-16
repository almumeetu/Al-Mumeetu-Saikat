import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;

async function test() {
  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env.local');
    return;
  }
  
  console.log('--- Database Connection Test ---');
  console.log('Attempting to connect to host...');
  
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Successfully connected to MongoDB!');
    console.log('Your credentials are CORRECT.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Connection failed!');
    if (error.message.includes('Authentication failed')) {
      console.error('Reason: The USERNAME or PASSWORD in your .env.local is WRONG.');
      console.error('Action: Reset your password in MongoDB Atlas and update MONGODB_URI.');
    } else if (error.message.includes('alert number 80')) {
      console.error('Reason: Your IP address is not whitelisted in MongoDB Atlas.');
      console.error('Action: Add 0.0.0.0/0 to Network Access in Atlas.');
    } else {
      console.error('Error Details:', error.message);
    }
  }
  console.log('--------------------------------');
}

test();
