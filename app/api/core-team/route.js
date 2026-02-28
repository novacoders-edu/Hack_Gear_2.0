import { withAuth } from "@/lib/authMiddleware";
import dbConnect from "@/lib/dbConnect";
import CoreTeam from "@/models/CoreTeam.model";

export const GET = withAuth(async(req)=> {
  try {
    await dbConnect();

    const team = await CoreTeam.find({})
      .sort({ createdAt: 1 })
      .lean();

    return new Response(JSON.stringify({
      success:true,
      data:team
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error("CoreTeam API Error:", error);

    return new Response(
      JSON.stringify({
        success:false,
        message: "Failed to fetch core team"
      }),
      { status: 500 }
    );
  }
});

export const POST = withAuth(async(req)=> {
  try {
    await dbConnect();

    const body = await req.json();

    await CoreTeam.create(body);

    return new Response(JSON.stringify({
      success:true
    }), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("CoreTeam API Error:", error);

    return new Response(
      JSON.stringify({
        success:false,
        message: "Failed to add core team member"
      }),
      { status: 500 }
    );
  }
});