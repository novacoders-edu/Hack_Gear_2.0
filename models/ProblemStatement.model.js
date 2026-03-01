import mongoose from "mongoose";

const ProblemStatementSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, sparse: true },
    tag: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, default: "border-cyan-neon" },
    accent: { type: String, default: "text-cyan-neon" },
    bgColor: { type: String, default: "bg-cyan-neon" },
    shadowColor: { type: String, default: "shadow-cyan-neon" },
    hexColor: { type: String, default: "#00E0FF" },
    icon: { type: String, default: "🤖" },
    resources: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.models.ProblemStatement ||
  mongoose.model("ProblemStatement", ProblemStatementSchema);