import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true }
  },
  { _id: false }
);

const CoreTeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    department: { type: String, required: true },
    socials: { type: [SocialSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.models.CoreTeam || mongoose.model("CoreTeam", CoreTeamSchema);