import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    count: { type: Number, default: 0 }, // Only store the total count
  },
  { timestamps: true }
);

export default mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);