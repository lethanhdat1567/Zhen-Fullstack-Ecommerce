import { translateController } from "@/controllers/translate.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.post("/", asyncHandler(translateController.post));

export default router;
