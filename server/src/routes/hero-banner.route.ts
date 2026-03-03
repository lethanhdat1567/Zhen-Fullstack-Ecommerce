import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { heroBannerController } from "@/controllers/hero-banner.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", asyncHandler(heroBannerController.findAll));
router.get("/:id", asyncHandler(heroBannerController.findOne));

router.use(authMiddleware);

router.post("/", asyncHandler(heroBannerController.create));
router.put("/", asyncHandler(heroBannerController.update));
router.delete("/bulk", asyncHandler(heroBannerController.bulkDelete));
router.delete("/:id", asyncHandler(heroBannerController.delete));

export default router;
