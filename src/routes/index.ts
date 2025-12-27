import { Router } from "express";
import PublicRoutes from "@routes/PublicRoutes";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

const router = Router();

router.use("/", PublicRoutes);
router.use("/protected", ProtectedRoutes);

export default router;
