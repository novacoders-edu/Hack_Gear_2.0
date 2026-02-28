import dbConnect from "@/lib/dbConnect";
import ProblemStatement from "@/models/ProblemStatement.model";
import { withAuth } from "@/lib/authMiddleware";

// GET: all problem statements (public)
export const GET = withAuth(async(req)=> {
  try {
    await dbConnect();

    const problems = await ProblemStatement.find({})
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success:true,
      data:problems
    }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch problem statements" },
      { status: 500 }
    );
  }
});

// POST: add new problem statement (protected)
export const POST = withAuth(async (req) => {
  try {
    await dbConnect();

    const body = await req.json();

    // Generate ID if not provided
    if (!body.id) {
      const count = await ProblemStatement.countDocuments();
      body.id = `TRK_${String(count + 1).padStart(2, '0')}`;
    }

    const problem = await ProblemStatement.create(body);

    return Response.json({
      status: true,
      length: problem.length
    }, { status: 201 });
  } catch (error) {
    console.error("Problem Statement API Error:", error);

    return Response.json(
      {
        message: "Failed to create problem statement",
        error: error.message
      },
      { status: 400 }
    );
  }
});