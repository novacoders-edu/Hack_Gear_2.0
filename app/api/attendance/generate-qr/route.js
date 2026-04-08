import { encryptData } from "@/lib/qrEncryption";
import { withAuth } from "@/lib/authMiddleware";
import QRCode from "qrcode";

// POST - Generate QR code for a team member
export const POST = withAuth(async (req) => {
  try {
    const body = await req.json();
    const { team_id, team_name, name, email, role, status } = body;

    // Validate required fields
    if (!team_id || !team_name || !name || !email) {
      return new Response(
        JSON.stringify({ message: "Missing required fields (team_id, team_name, name, email)" }),
        { status: 400 }
      );
    }

    // Use either role or status (for compatibility with Python)
    const memberRole = role || status || "Member";

    // Prepare data (matches Python structure - use "status" for compatibility)
    const data = {
      team_id,
      team_name,
      name,
      status: memberRole, // Python uses "status"
      email
    };

    // Encrypt data
    const encryptedData = await encryptData(data);

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(encryptedData, {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 400,
      margin: 2
    });

    return new Response(
      JSON.stringify({
        success: true,
        qrCode: qrCodeDataURL,
        data: data
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("QR generation error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to generate QR code", error: error.message }),
      { status: 500 }
    );
  }
});
