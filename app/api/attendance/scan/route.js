import dbConnect from "@/lib/dbConnect";
import Attendance from "@/models/Attendance.model";
import { decryptData } from "@/lib/qrEncryption";

// POST - Scan QR and mark attendance
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { encryptedData, markedBy } = body;

    if (!encryptedData) {
      return new Response(
        JSON.stringify({ success: false, message: "No QR data provided" }),
        { status: 400 }
      );
    }

    // Decrypt QR code data
    let data;
    try {
      data = decryptData(encryptedData);
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Invalid or corrupted QR code" 
        }),
        { status: 400 }
      );
    }

    // Handle both "role" and "status" fields (Python uses "status")
    const role = data.role || data.status || "Member";

    // Check if attendance already marked
    const existingAttendance = await Attendance.findOne({
      teamId: data.team_id,
      email: data.email
    });

    if (existingAttendance) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Attendance already marked",
          data: {
            teamName: data.team_name,
            memberName: data.name,
            role: role,
            email: data.email,
            markedAt: existingAttendance.markedAt
          }
        }),
        { status: 409 }
      );
    }

    // Mark attendance
    const attendance = await Attendance.create({
      teamId: data.team_id,
      teamName: data.team_name,
      memberName: data.name,
      email: data.email,
      role: role,
      markedBy: markedBy || "scanner"
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Attendance marked successfully",
        data: {
          teamName: data.team_name,
          memberName: data.name,
          role: role,
          email: data.email,
          markedAt: attendance.markedAt
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Attendance marking error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to mark attendance" 
      }),
      { status: 500 }
    );
  }
}
