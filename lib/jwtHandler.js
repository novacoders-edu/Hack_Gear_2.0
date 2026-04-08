import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const JWT_EXPIRE = "7d"; // Token expires in 7 days

/**
 * Generate JWT token for admin
 */
export function generateToken(adminId, email) {
  if (!JWT_SECRET || JWT_SECRET.includes("change-this")) {
    console.warn("⚠️  WARNING: JWT_SECRET is not properly configured in .env.local");
  }

  return jwt.sign(
    {
      id: adminId,
      email: email,
      type: "admin"
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      valid: true,
      data: decoded
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
}

/**
 * Decode token without verification (for debugging)
 */
export function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
}

