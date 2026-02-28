import dbConnect from "@/lib/dbConnect";
import Judge from "@/models/Judge.model";
import { withAuth } from "@/lib/authMiddleware";

export const GET = withAuth(async (req) => {
  try {
    await dbConnect();

    const judges = await Judge.find({}).lean();

    return Response.json({
      success:true,
      data:judges
    }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch judges", error: error.message },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (req) => {
  try {
    await dbConnect();

    const body = await req.json();

    await Judge.create(body);

    return Response.json({
      status:true
    }, { status: 201 });
  } catch (error) {
    console.error("Judge API Error:", error);

    return Response.json(
      { 
        status:false,
        message: "Failed to add judge", error: error.message 
      },
      { status: 500 }
    );
  }
});