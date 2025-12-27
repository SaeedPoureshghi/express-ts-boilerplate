import { Request, Response, NextFunction } from "express";
import { jwtDecrypt } from "jose";
import { config } from "@/config/dotenv";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const encryptedToken = req.cookies?.token;

    if (!encryptedToken) {
      res.status(401).json({
        success: false,
        message: "Authentication token not found",
      });
      return;
    }

    const jweSecret = config.jweSecret;
    if (!jweSecret) {
      console.error("JWE_SECRET is not configured");
      res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
      return;
    }

    let secretKey: Uint8Array;
    try {
      const decoded = Buffer.from(jweSecret, "base64");
      if (decoded.length === 32) {
        secretKey = new Uint8Array(decoded);
      } else {
        secretKey = new TextEncoder().encode(jweSecret);
      }
    } catch {
      secretKey = new TextEncoder().encode(jweSecret);
    }

    if (secretKey.length !== 32) {
      const key32 = new Uint8Array(32);
      if (secretKey.length > 32) {
        key32.set(secretKey.slice(0, 32));
      } else {
        key32.set(secretKey);
        for (let i = secretKey.length; i < 32; i++) {
          key32[i] = secretKey[i % secretKey.length];
        }
      }
      secretKey = key32;
    }

    const { payload } = await jwtDecrypt(encryptedToken, secretKey);

    if (
      typeof payload === "object" &&
      payload !== null &&
      "id" in payload &&
      "name" in payload
    ) {
      req.user = payload as unknown as User;
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
