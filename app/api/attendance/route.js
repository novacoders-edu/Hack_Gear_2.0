import dbConnect from "@/lib/dbConnect";
import Attendance from "@/models/Attendance.model";
import { withAuth } from "@/lib/authMiddleware";

// GET - Fetch all attendance records
export const GET = withAuth(async (req) => {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const teamId = url.searchParams.get("teamId");

    let query = {};
    if (teamId) {
      query.teamId = teamId;
    }

    const attendances = await Attendance.find(query)
      .select("-__v")
      .sort({ markedAt: -1 })
      .lean();

    // Get statistics
    const totalAttendance = attendances.length;
    const uniqueTeams = [...new Set(attendances.map(a => a.teamId))].length;

    return new Response(
      JSON.stringify({
        success: true,
        count: totalAttendance,
        uniqueTeams,
        attendances
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Attendance fetch error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch attendance" }),
      { status: 500 }
    );
  }
});

// DELETE - Delete attendance record
export const DELETE = withAuth(async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Attendance ID required" }),
        { status: 400 }
      );
    }

    const deleted = await Attendance.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(
        JSON.stringify({ message: "Attendance record not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Attendance deleted successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Attendance delete error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete attendance" }),
      { status: 500 }
    );
  }
});
