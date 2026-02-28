import dbConnect from "@/lib/dbConnect";
import PastWinner from "@/models/PastWinner.model";
import { withAuth } from "@/lib/authMiddleware";

// PUT: Update past winner (protected)
export const PUT = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;

    // Auto-set rank and achievement based on position
    if (body.position) {
      switch (body.position) {
        case "1st Place":
          body.rank = 1;
          body.achievement = "FIRST_PLACE";
          break;
        case "2nd Place":
          body.rank = 2;
          body.achievement = "SECOND_PLACE";
          break;
        case "3rd Place":
          body.rank = 3;
          body.achievement = "THIRD_PLACE";
          break;
        case "Best Girls Team":
          body.rank = 4;
          body.achievement = "BEST_GIRLS_TEAM";
          break;
      }
    }

    const updated = await PastWinner.findByIdAndUpdate(id, body, { 
      new: true,
      runValidators: true 
    });

    if (!updated) {
      return Response.json(
        { message: "Past winner not found" },
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

// DELETE: Delete past winner (protected)
export const DELETE = withAuth(async (req, { params }) => {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await PastWinner.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json(
        { message: "Past winner not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Past winner deleted successfully" },
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