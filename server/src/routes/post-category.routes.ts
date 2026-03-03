import postCategoryController from "@/controllers/post-category.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", asyncHandler(postCategoryController.listCategories));
router.get("/slug/:slug", asyncHandler(postCategoryController.getDetail));
router.get("/:id", asyncHandler(postCategoryController.getById));

router.use(authMiddleware);

router.post("/", asyncHandler(postCategoryController.createCategory));
router.patch(
    "/:id/toggle-status",
    asyncHandler(postCategoryController.toggleStatus),
);
router.put("/:id", asyncHandler(postCategoryController.updateCategory));
router.delete("/bulk", asyncHandler(postCategoryController.bulkDeleteCategory));
router.delete("/:id", asyncHandler(postCategoryController.deleteCategory));

export default router;
