import { Router } from "express";
import PublicController from "@controllers/PublicController";

const router = Router();

/**
 *  GET /
 * @tags Public
 * @summary Get Hello World
 * @returns {HelloWorldResponse} 200 - A successful response
 */
router.get("/", PublicController.getHelloWorld);

export default router;
