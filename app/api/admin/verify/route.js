import { verifyToken } from "@/lib/jwtHandler.js";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("authToken");

    if (!tokenCookie) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Authentication token not found."
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = tokenCookie.value;
    const result = verifyToken(token);

    if (!result.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid or expired token",
          error: result.error
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Token is valid",
        data: result.data
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}