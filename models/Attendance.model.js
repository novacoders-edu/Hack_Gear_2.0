import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      index: true
    },
    teamName: {
      type: String,
      required: true
    },
    memberName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    markedAt: {
      type: Date,
      default: Date.now
    },
    markedBy: {
      type: String, // Admin/scanner identifier
      default: "system"
    },
    eventName: {
      type: String,
      default: "HackGear 2.0"
    }
  },
  { timestamps: true }
);

// Compound index to prevent duplicate attendance
AttendanceSchema.index({ teamId: 1, email: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
