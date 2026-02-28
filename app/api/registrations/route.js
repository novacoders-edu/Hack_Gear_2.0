import dbConnect from "@/lib/dbConnect";
import RegistrationModel from "@/models/Registration.model";

// GET → Fetch total registrations count
export async function GET() {
  try {
    await dbConnect();

    let registration = await RegistrationModel.findOne();

    // If no registration record exists, create one with count = 0
    if (!registration) {
      registration = await RegistrationModel.create({ count: 0 });
    }

    return new Response(
      JSON.stringify({ success: true, total: registration.count }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching total registrations:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch total registrations" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT → Update total registrations count
export async function PUT(req) {
  try {
    await dbConnect();

    const { count } = await req.json();

    // Validate the count value
    if (count === undefined || count < 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid count value" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const registration = await RegistrationModel.findOneAndUpdate(
      {},
      { count }, // Update the count to the provided value
      { new: true, upsert: true } // Create a new record if none exists
    );

    return new Response(
      JSON.stringify({ success: true, total: registration.count }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating total registrations:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to update total registrations" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}