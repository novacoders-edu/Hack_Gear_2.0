import mongoose from "mongoose";

const ApiTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date,
      default: null // null means no expiration
    },
    lastUsedAt: {
      type: Date,
      default: null
    },
    usageCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Index for faster lookups
ApiTokenSchema.index({ token: 1, isActive: 1 });

export default mongoose.models.ApiToken || mongoose.model("ApiToken", ApiTokenSchema);