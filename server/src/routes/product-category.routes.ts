import productCategoryController from "@/controllers/product-category.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", productCategoryController.listCategories);
router.get("/slug/:slug", productCategoryController.getDetail);
router.get("/:id", productCategoryController.getDetailById);

router.use(authMiddleware);

router.post("/", productCategoryController.createCategory);
router.patch("/:id/toggle-status", productCategoryController.toggleStatus);
router.put("/:id", productCategoryController.updateCategory);
router.delete("/bulk", productCategoryController.bulkDeleteCategory);
router.delete("/:id", productCategoryController.deleteCategory);

export default router;
