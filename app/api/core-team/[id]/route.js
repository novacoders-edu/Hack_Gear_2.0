import dbConnect from "@/lib/dbConnect";
import CoreTeam from "@/models/CoreTeam.model";
import { withAuth } from "@/lib/authMiddleware";

// PUT - Update core team member
export const PUT = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;

    const updated = await CoreTeam.findByIdAndUpdate(
      id,
      body,
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updated) {
      return new Response(
        JSON.stringify({ message: "Core team member not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(updated),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Core team update error:", error);
    return new Response(
      JSON.stringify({ 
        message: "Failed to update core team member",
        error: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

// DELETE - Delete core team member
export const DELETE = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await CoreTeam.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(
        JSON.stringify({ message: "Core team member not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: "Core team member deleted successfully",
        deletedMember: deleted 
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Core team delete error:", error);
    return new Response(
      JSON.stringify({ 
        message: "Failed to delete core team member",
        error: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});