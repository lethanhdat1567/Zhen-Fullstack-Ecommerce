import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { dashboardController } from "@/controllers/dashboard.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/overview", asyncHandler(dashboardController.overview));

export default router;
