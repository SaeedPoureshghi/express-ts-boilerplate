import { Request, Response } from "express";
import ProtectedService from "@/services/ProtectedService";

class ProtectedController {
  public successResponse = (req: Request, res: Response) => {
    const result = {
      success: true,
      message: "Success",
      user: {
        id: req.user?.id,
        name: req.user?.name,
      },
    };

    res.status(200).json(result);
  };

  public createJWE = async (req: Request, res: Response) => {
    try {
      // Mock payload with user id and name
      const mockPayload = {
        id: 12345,
        name: "John Doe",
      };

      // Create JWE token using the service
      const jweToken = await ProtectedService.createJWE(mockPayload);

      // Save JWE token to cookie
      res.cookie("token", jweToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours (matching token expiration)
      });

      const result = {
        success: true,
        message: "JWE token created and saved to cookie",
      };

      res.status(200).json(result);
    } catch (error) {
      console.error("Error creating JWE token:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create authentication token",
      });
    }
  };
}

export default new ProtectedController();
