import dbConnect from "@/lib/dbConnect";
import PastWinner from "@/models/PastWinner.model";
import { withAuth } from "@/lib/authMiddleware";

// GET: Fetch all past winners (public)
export const GET = withAuth(async (req)=> {
  try {
    await dbConnect();

    const pastWinners = await PastWinner.find({})
      .sort({ year: -1, rank: 1 }) // Latest year first, then by rank
      .lean();

    return Response.json({
      success:true,
      data:pastWinners
    }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch past winners", error: error.message },
      { status: 500 }
    );
  }
});

// POST: Add new past winner (protected)
export const POST = withAuth(async (req) => {
  try {
    await dbConnect();

    const body = await req.json();

    // Validate required fields
    const { teamName, position, rank, image, project, achievement, college, year } = body;
    
    if (!teamName || !position || !rank || !image || !project || !achievement || !college || !year) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Set rank based on position if not provided
    if (!body.rank) {
      switch (position) {
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

    const newWinner = await PastWinner.create(body);

    return Response.json({
      success:true,
      length:newWinner.length
    }, { status: 201 });
  } catch (error) {
    console.error("Past Winner API Error:", error);

    return Response.json(
      { message: "Failed to add past winner", error: error.message },
      { status: 500 }
    );
  }
});