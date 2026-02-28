import dbConnect from "@/lib/dbConnect";
import ApiToken from "@/models/ApiToken.model";
import { withAuth } from "@/lib/authMiddleware";

// PUT - Update token
export const PUT = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;

    const updated = await ApiToken.findByIdAndUpdate(
      id,
      {
        name: body.name,
        description: body.description,
        isActive: body.isActive,
        expiresAt: body.expiresAt
      },
      { new: true }
    );

    if (!updated) {
      return new Response(
        JSON.stringify({ message: "Token not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Token update error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update token" }),
      { status: 500 }
    );
  }
});

// DELETE - Delete token
export const DELETE = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await ApiToken.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(
        JSON.stringify({ message: "Token not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Token deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Token delete error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete token" }),
      { status: 500 }
    );
  }
});