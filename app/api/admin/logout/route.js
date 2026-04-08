export async function POST(request) {
  try {
    // Create response to clear the cookie
    const response = new Response(
      JSON.stringify({
        success: true,
        message: "Logged out successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

    // Clear the authToken cookie
    response.headers.set(
      "Set-Cookie",
      "authToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0" // Max-Age=0 deletes the cookie
    );

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
