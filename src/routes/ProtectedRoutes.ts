import { authMiddleware } from "@/middlewares/Auth";
import { Router } from "express";
import ProtectedController from "@/controllers/ProtectedController";

const router = Router();

/**
 * GET /protected
 * @tags Protected
 * @summary Get Protected Route
 * @security CookieAuth
 * @returns {SuccessResponse} 200 - A successful response
 */
router.get("/", authMiddleware, ProtectedController.successResponse);

/**
 * POST /protected/create-token
 * @tags Protected
 * @summary Create JWE Token
 * @returns {SuccessResponse} 200 - JWE token created and saved to cookie
 */
router.post("/create-token", ProtectedController.createJWE);

export default router;
