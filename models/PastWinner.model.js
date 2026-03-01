import mongoose from "mongoose";

const PastWinnerSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    teamName: { type: String, required: true, trim: true },
    position: { 
      type: String, 
      enum: ["1st Place", "2nd Place", "3rd Place", "Best Girls Team"],
      required: true 
    },
    rank: { type: Number, required: true },
    image: { type: String, required: true },
    project: { type: String, required: true, trim: true },
    prize: { type: String, default: "" },
    achievement: {
      type: String,
      enum: ["FIRST_PLACE", "SECOND_PLACE", "THIRD_PLACE", "BEST_GIRLS_TEAM"],
      required: true
    },
    college: { type: String, required: true, trim: true },
    members: { type: [String], default: [] },
    bio: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

// Index for faster queries
PastWinnerSchema.index({ year: -1, rank: 1 });

export default mongoose.models.PastWinner ||
  mongoose.model("PastWinner", PastWinnerSchema);