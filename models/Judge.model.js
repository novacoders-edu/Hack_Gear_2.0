import mongoose from "mongoose";

// Social links schema (embedded)
const SocialSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

// Judge schema
const JudgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    socials: {
      type: [SocialSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Judge ||
  mongoose.model("Judge", JudgeSchema);
