import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { mediaCategoryController } from "@/controllers/media-category.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", asyncHandler(mediaCategoryController.findAll));
router.get("/slug/:slug", asyncHandler(mediaCategoryController.findBySlug));
router.get("/:id", asyncHandler(mediaCategoryController.findOne));

router.use(authMiddleware);

router.post("/", asyncHandler(mediaCategoryController.create));
router.patch(
    "/:id/toggle-status",
    asyncHandler(mediaCategoryController.toggleStatus),
);
router.put("/:id", asyncHandler(mediaCategoryController.update));
router.delete("/bulk", asyncHandler(mediaCategoryController.bulkDelete));
router.delete("/:id", asyncHandler(mediaCategoryController.delete));

export default router;
