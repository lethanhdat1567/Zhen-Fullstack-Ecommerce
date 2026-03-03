import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { serviceCategoryController } from "@/controllers/service-category.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", asyncHandler(serviceCategoryController.list));
router.get("/slug/:slug", asyncHandler(serviceCategoryController.getBySlug));
router.get("/:id", asyncHandler(serviceCategoryController.detail));

router.use(authMiddleware);

router.post("/", asyncHandler(serviceCategoryController.create));
router.put("/:id", asyncHandler(serviceCategoryController.update));
router.patch(
    "/:id/toggle-status",
    asyncHandler(serviceCategoryController.toggleStatus),
);
router.delete("/bulk", asyncHandler(serviceCategoryController.bulkDelete));
router.delete("/:id", asyncHandler(serviceCategoryController.delete));

export default router;
