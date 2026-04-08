import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      match: /[^\s@]+@[^\s@]+\.[^\s@]+/
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ["admin", "super_admin"],
      default: "admin"
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isAllowed: {
      type: Boolean,
      default: true,
      description: "Whether this email is in the allowed list"
    },
    lastLoginAt: {
      type: Date,
      default: null
    },
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Hash password before saving
AdminSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Method to compare password
AdminSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// Method to reset login attempts
AdminSchema.methods.resetLoginAttempts = async function () {
  this.loginAttempts = 0;
  this.lockUntil = null;
  return this.save();
};

// Method to increment login attempts
AdminSchema.methods.incLoginAttempts = async function () {
  // Lock after 5 attempts for 1 hour
  if (this.loginAttempts < 5) {
    this.loginAttempts += 1;
  } else {
    this.lockUntil = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  }
  return this.save();
};

// Index for faster lookups
AdminSchema.index({ email: 1, isActive: 1 });

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
