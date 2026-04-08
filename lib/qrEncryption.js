// Must match Python's SECRET_PASSWORD
const SECRET_PASSWORD = "hackgear2.0";

/**
 * Derive Fernet key from password (32 bytes, base64url encoded)
 */
function getFernetKey(password) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256").update(password).digest();
  return hash; // 32 bytes for Fernet
}

/**
 * Encrypt data (Fernet-compatible format)
 * Fernet format: Version (1 byte) | Timestamp (8 bytes) | IV (16 bytes) | Ciphertext | HMAC (32 bytes)
 */
export async function encryptData(data) {
  try {
    const crypto = require("crypto");
    const key = getFernetKey(SECRET_PASSWORD);
    
    // Split key: first 16 bytes for signing, last 16 bytes for encryption
    const signingKey = key.slice(0, 16);
    const encryptionKey = key.slice(16, 32);
    
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-128-cbc", encryptionKey, iv);
    
    const jsonData = JSON.stringify(data);
    let encrypted = cipher.update(jsonData, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    // Fernet format: Version | Timestamp | IV | Ciphertext
    const version = Buffer.from([0x80]); // Fernet version
    const timestamp = Buffer.alloc(8);
    timestamp.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 1000)));
    
    const payload = Buffer.concat([version, timestamp, iv, encrypted]);
    
    // Create HMAC
    const hmac = crypto.createHmac("sha256", signingKey);
    hmac.update(payload);
    const signature = hmac.digest();
    
    // Combine and encode
    const token = Buffer.concat([payload, signature]);
    return token.toString("base64");
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
}

/**
 * Decrypt data (Fernet-compatible format)
 */
export function decryptData(encryptedData) {
  try {
    const crypto = require("crypto");
    const key = getFernetKey(SECRET_PASSWORD);
    
    // Split key: first 16 bytes for signing, last 16 bytes for encryption
    const signingKey = key.slice(0, 16);
    const encryptionKey = key.slice(16, 32);
    
    // Decode base64
    const token = Buffer.from(encryptedData, "base64");
    
    // Extract components
    const version = token[0];
    const timestamp = token.slice(1, 9);
    const iv = token.slice(9, 25);
    const ciphertext = token.slice(25, token.length - 32);
    const receivedSignature = token.slice(token.length - 32);
    
    // Verify HMAC
    const payload = token.slice(0, token.length - 32);
    const hmac = crypto.createHmac("sha256", signingKey);
    hmac.update(payload);
    const expectedSignature = hmac.digest();
    
    if (!crypto.timingSafeEqual(receivedSignature, expectedSignature)) {
      throw new Error("Invalid signature - QR code may be tampered");
    }
    
    // Decrypt
    const decipher = crypto.createDecipheriv("aes-128-cbc", encryptionKey, iv);
    let decrypted = decipher.update(ciphertext, undefined, "utf8");
    decrypted += decipher.final("utf8");
    
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt QR code data");
  }
}
