import { siteSettingController } from "@/controllers/site-setting.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", asyncHandler(siteSettingController.get));

router.use(authMiddleware);

router.put("/", asyncHandler(siteSettingController.update));

export default router;
