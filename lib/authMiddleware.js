import dbConnect from "@/lib/dbConnect";
import ApiToken from "@/models/ApiToken.model";

/**
 * Validates API token from request headers
 * @param {Request} request - The incoming request
 * @returns {Promise<{valid: boolean, token?: object, error?: string}>}
 */
export async function validateApiToken(request) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get("authorization");
    const apiToken = request.headers.get("hg-api-token");

    // Check both Authorization: Bearer <token> and x-api-token header
    let token = null;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (apiToken) {
      token = apiToken;
    }

    if (!token) {
      return {
        valid: false,
        error: "No API token provided"
      };
    }

    // Connect to database
    await dbConnect();

    // Find token in database
    const tokenDoc = await ApiToken.findOne({
      token,
      isActive: true
    });

    if (!tokenDoc) {
      return {
        valid: false,
        error: "Invalid or inactive API token"
      };
    }

    // Check if token is expired
    if (tokenDoc.expiresAt && new Date() > tokenDoc.expiresAt) {
      return {
        valid: false,
        error: "API token has expired"
      };
    }

    // Update usage statistics
    await ApiToken.findByIdAndUpdate(tokenDoc._id, {
      lastUsedAt: new Date(),
      $inc: { usageCount: 1 }
    });

    return {
      valid: true,
      token: tokenDoc
    };
  } catch (error) {
    console.error("Token validation error:", error);
    return {
      valid: false,
      error: "Token validation failed"
    };
  }
}

/**
 * Middleware wrapper for protected routes
 * @param {Function} handler - The route handler function
 * @returns {Function} Wrapped handler with auth check
 */
export function withAuth(handler) {
  return async (request, context) => {
    const validation = await validateApiToken(request);

    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          error: validation.error,
          message: "Unauthorized access"
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "WWW-Authenticate": 'Bearer realm="API"'
          }
        }
      );
    }

    // Attach token info to request for use in handler
    request.apiToken = validation.token;

    // Call the original handler
    return handler(request, context);
  };
}