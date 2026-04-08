/**
 * Add New Admin User Script
 * Usage: node scripts/add-admin.js
 *
 * This script adds a new admin user interactively
 */

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env.local") });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

const addAdmin = async () => {
  try {
    const { default: Admin } = await import("../models/Admin.model.js");
    const { default: dbConnect } = await import("../lib/dbConnect.js");

    await dbConnect();

    console.log("\n📝 Add New Admin User\n");

    const email = await question("Email: ");
    const name = await question("Name: ");
    const password = await question("Password: ");

    if (!email || !name || !password) {
      console.log("❌ All fields are required!");
      rl.close();
      return;
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      console.log("❌ Admin with this email already exists!");
      rl.close();
      return;
    }

    // Create new admin
    const admin = new Admin({
      email: email.toLowerCase(),
      name,
      password,
      role: "admin",
      isActive: true
    });

    await admin.save();

    console.log("\n✅ Admin user created successfully!");
    console.log(`   Email: ${email}`);
    console.log(`   Name: ${name}`);
    console.log(`   Password: ${password}\n`);

    await mongoose.disconnect();
    rl.close();
  } catch (error) {
    console.error("❌ Error:", error.message);
    try {
      await mongoose.disconnect();
    } catch (e) {
      // ignore
    }
    rl.close();
    process.exit(1);
  }
};

addAdmin();
