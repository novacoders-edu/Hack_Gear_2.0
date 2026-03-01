import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema(
  {
    count: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Visitor ||
  mongoose.model("Visitor", VisitorSchema);
