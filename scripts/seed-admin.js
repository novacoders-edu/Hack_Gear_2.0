/**
 * Admin Seed Script
 * Usage: npm run seed:admin
 *
 * This script creates an admin user in the database.
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Load environment variables BEFORE doing anything else
dotenv.config({ path: path.join(rootDir, '.env.local') });

// Verify MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
  console.error('✗ MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Now do the async seeding
const seedAdmins = async () => {
  try {
    // Import after env vars are loaded
    const { default: Admin } = await import('../models/Admin.model.js');
    const { default: dbConnect } = await import('../lib/dbConnect.js');

    await dbConnect();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@hackgearv2.live' });

    if (existingAdmin) {
      console.log('✓ Admin already exists');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create default admin
    const admin = new Admin({
      email: 'admin@hackgearv2.live',
      name: 'Super Admin',
      password: 'Admin@1104',
      role: 'super_admin',
      isActive: true
    });

    await admin.save();
    console.log('✓ Admin user created successfully');
    console.log('  Email: admin@hackgear.com');
    console.log('  Password: admin123');
    console.log('  ⚠️  Change the password immediately after first login!');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding admin:', error.message);
    try {
      await mongoose.disconnect();
    } catch (e) {
      // ignore disconnect errors
    }
    process.exit(1);
  }
};

seedAdmins();
