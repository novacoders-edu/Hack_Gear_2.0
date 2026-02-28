import dbConnect from "@/lib/dbConnect";
import Judge from "@/models/Judge.model";
import { withAuth } from "@/lib/authMiddleware";

// PUT - Update judge
export const PUT = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;

    const updated = await Judge.findByIdAndUpdate(
      id,
      body,
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updated) {
      return new Response(
        JSON.stringify({ message: "Judge not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(updated),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Judge update error:", error);
    return new Response(
      JSON.stringify({ 
        message: "Failed to update judge",
        error: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

// DELETE - Delete judge
export const DELETE = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await Judge.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(
        JSON.stringify({ message: "Judge not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: "Judge deleted successfully",
        deletedJudge: deleted 
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Judge delete error:", error);
    return new Response(
      JSON.stringify({ 
        message: "Failed to delete judge",
        error: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});