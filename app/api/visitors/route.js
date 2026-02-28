import dbConnect from "@/lib/dbConnect";
import Visitor from "@/models/Visitor.model";

// GET → current visitor count
export async function GET() {
  try {
    await dbConnect();

    let visitor = await Visitor.findOne();

    // agar first time hai to create karo
    if (!visitor) {
      visitor = await Visitor.create({ count: 1 });
    }

    return Response.json({ count: visitor.count }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch visitor count" },
      { status: 500 }
    );
  }
}

// POST → increment visitor count
export async function POST() {
  try {
    await dbConnect();

    const visitor = await Visitor.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    return Response.json({ count: visitor.count }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to update visitor count" },
      { status: 500 }
    );
  }
}
