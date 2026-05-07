#!/usr/bin/env tsx

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

(async () => {
  const checks = {
    env: false,
    db: false,
    models: false,
  };

  console.log('🔍 Verifying Admin Setup...\n');

  // Check 1: Environment Variables
  console.log('1️⃣  Checking environment variables...');
  const required = ['MONGODB_URI', 'NEXTAUTH_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length === 0) {
    console.log('   ✅ All required env vars present\n');
    checks.env = true;
  } else {
    console.log(`   ❌ Missing: ${missing.join(', ')}\n`);
  }

  // Check 2: MongoDB Connection
  console.log('2️⃣  Testing MongoDB connection...');
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('   ✅ MongoDB connected successfully\n');
    checks.db = true;
  } catch (error: any) {
    console.log(`   ❌ Connection failed: ${error.message}\n`);
  }

  // Check 3: Models
  if (checks.db) {
    console.log('3️⃣  Checking database models...');
    try {
      const collections = await mongoose.connection.db!.listCollections().toArray();
      const collectionNames = collections.map(c => c.name);
      console.log(`   ✅ Collections found: ${collectionNames.join(', ') || 'none yet'}\n`);
      checks.models = true;
    } catch (error: any) {
      console.log(`   ❌ Model check failed: ${error.message}\n`);
    }
  }

  // Summary
  console.log('📋 Summary:');
  console.log(`   Environment: ${checks.env ? '✅' : '❌'}`);
  console.log(`   Database: ${checks.db ? '✅' : '❌'}`);
  console.log(`   Models: ${checks.models ? '✅' : '❌'}`);

  if (checks.env && checks.db && checks.models) {
    console.log('\n✨ All checks passed! Your admin is ready to go.\n');
    console.log('🚀 Next steps:');
    console.log('   1. Run: pnpm dev');
    console.log('   2. Go to: http://localhost:3000/admin/login');
    console.log('   3. Login with:');
    console.log(`      Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`      Password: ${process.env.ADMIN_PASSWORD}`);
  } else {
    console.log('\n⚠️  Some checks failed. Please fix the issues above.\n');
  }

  await mongoose.disconnect();
  process.exit(checks.env && checks.db && checks.models ? 0 : 1);
})();
