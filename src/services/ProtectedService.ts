import { EncryptJWT } from "jose";
import { config } from "@/config/dotenv";

class ProtectedService {
  /**
   * Creates a JWE token with the provided payload
   * @param payload - The payload to encrypt in the JWE token
   * @returns A promise that resolves to the encrypted JWE token string
   */
  public async createJWE(payload: Record<string, any>): Promise<string> {
    const jweSecret = config.jweSecret;
    if (!jweSecret) {
      throw new Error("JWE_SECRET is not configured");
    }

    // Convert secret to Uint8Array for jose library
    // Try to decode as base64 first, otherwise use as UTF-8
    let secretKey: Uint8Array;
    try {
      // Try base64 decoding first
      const decoded = Buffer.from(jweSecret, "base64");
      if (decoded.length === 32) {
        secretKey = new Uint8Array(decoded);
      } else {
        // If base64 decoded but wrong length, use UTF-8 encoding
        secretKey = new TextEncoder().encode(jweSecret);
      }
    } catch {
      // If base64 decode fails, use UTF-8 encoding
      secretKey = new TextEncoder().encode(jweSecret);
    }

    // Ensure the key is exactly 32 bytes for A256GCM
    if (secretKey.length !== 32) {
      // Pad or truncate to 32 bytes
      const key32 = new Uint8Array(32);
      if (secretKey.length > 32) {
        key32.set(secretKey.slice(0, 32));
      } else {
        key32.set(secretKey);
        // Fill remaining with repeated secret if needed
        for (let i = secretKey.length; i < 32; i++) {
          key32[i] = secretKey[i % secretKey.length];
        }
      }
      secretKey = key32;
    }

    // Create and encrypt the JWE token
    const jwe = await new EncryptJWT(payload)
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .setIssuedAt()
      .setExpirationTime(config.jweExpirationTime)
      .encrypt(secretKey);

    return jwe;
  }
}

export default new ProtectedService();
