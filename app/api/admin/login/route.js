import dbConnect from "@/lib/dbConnect.js";
import Admin from "@/models/Admin.model.js";
import { generateToken } from "@/lib/jwtHandler.js";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and password are required"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const lowerEmail = email.toLowerCase();

    await dbConnect();

    const admin = await Admin.findOne({ email: lowerEmail });

    if (!admin) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid email or password"
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if account is locked
    if (admin.lockUntil && new Date() < admin.lockUntil) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Account locked. Try again later."
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if account is active
    if (!admin.isActive) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Account disabled"
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Compare password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      await admin.incLoginAttempts();
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid email or password"
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Reset login attempts
    await admin.resetLoginAttempts();
    admin.lastLoginAt = new Date();
    await admin.save();

    // Generate JWT token
    const token = generateToken(admin._id.toString(), admin.email);

    // Create response
    const response = new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

    // Set secure HTTP-only cookie (7 days)
    response.headers.set(
      "Set-Cookie",
      `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
