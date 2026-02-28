import dbConnect from "@/lib/dbConnect";
import ApiToken from "@/models/ApiToken.model";
import crypto from "crypto";

// Generate a secure random token
function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// GET all tokens (for admin)
export async function GET() {
  try {
    await dbConnect();

    const tokens = await ApiToken.find({})
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();

    return new Response(JSON.stringify(tokens), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Tokens fetch error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch tokens" }),
      { status: 500 }
    );
  }
}

// POST - Create new token
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return new Response(
        JSON.stringify({ message: "Token name is required" }),
        { status: 400 }
      );
    }

    // Generate unique token
    const token = generateToken();
    const expiresInDays = 10;
    // Calculate expiration date if specified
    let expiresAt = null;
    if (expiresInDays && expiresInDays > 0) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiresInDays);
    }

    const newToken = await ApiToken.create({
      token,
      name,
      description: description || "",
      expiresAt,
      isActive: true
    });

    return new Response(JSON.stringify(newToken), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Token creation error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create token" }),
      { status: 500 }
    );
  }
}