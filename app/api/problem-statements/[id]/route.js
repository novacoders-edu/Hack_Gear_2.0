import dbConnect from "@/lib/dbConnect";
import ProblemStatement from "@/models/ProblemStatement.model";
import { withAuth } from "@/lib/authMiddleware";

export const PUT = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;

    const updated = await ProblemStatement.findByIdAndUpdate(id, body, { 
      new: true,
      runValidators: true 
    });

    if (!updated) {
      return Response.json(
        { message: "Problem statement not found" },
        { status: 404 }
      );
    }

    return Response.json(updated, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return Response.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await ProblemStatement.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json(
        { message: "Problem statement not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Problem statement deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return Response.json(
      { message: "Delete failed", error: error.message },
      { status: 500 }
    );
  }
});