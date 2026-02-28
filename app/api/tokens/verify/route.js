import dbConnect from "@/lib/dbConnect";
import ApiToken from "@/models/ApiToken.model";

export async function POST(req) {
  try {
    await dbConnect();

    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Token is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the token exists and is active
    const tokenDoc = await ApiToken.findOne({ token, isActive: true });

    if (!tokenDoc) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid or inactive token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Token is valid" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}