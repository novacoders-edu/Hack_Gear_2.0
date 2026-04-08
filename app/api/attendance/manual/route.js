import dbConnect from "@/lib/dbConnect";
import Attendance from "@/models/Attendance.model";
import { withAuth } from "@/lib/authMiddleware";

// POST - Manual attendance entry (requires authentication)
export const POST = withAuth(async (req) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { team_id, team_name, name, email, role, status } = body;

    // Validate required fields
    if (!team_id || !team_name || !name || !email) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Missing required fields (team_id, team_name, name, email)" 
        }),
        { status: 400 }
      );
    }

    // Use either role or status
    const memberRole = role || status || "Member";

    // Check if attendance already marked
    const existingAttendance = await Attendance.findOne({
      teamId: team_id,
      email: email
    });

    if (existingAttendance) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Attendance already marked for this person",
          data: {
            teamName: team_name,
            memberName: name,
            role: memberRole,
            email: email,
            markedAt: existingAttendance.markedAt
          }
        }),
        { status: 409 }
      );
    }

    // Mark attendance
    const attendance = await Attendance.create({
      teamId: team_id,
      teamName: team_name,
      memberName: name,
      email: email,
      role: memberRole,
      markedBy: "manual-entry"
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Attendance marked successfully",
        data: {
          teamName: team_name,
          memberName: name,
          role: memberRole,
          email: email,
          markedAt: attendance.markedAt
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Manual attendance error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to mark attendance",
        error: error.message
      }),
      { status: 500 }
    );
  }
});
