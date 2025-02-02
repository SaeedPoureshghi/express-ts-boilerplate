import { Router } from "express";
import PublicRoutes from "@routes/PublicRoutes";

const router = Router();

router.use("/", PublicRoutes);

export default router;
