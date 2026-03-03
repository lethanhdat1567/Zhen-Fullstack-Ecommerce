import productController from "@/controllers/product.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", asyncHandler(productController.listProducts));
router.get("/related", asyncHandler(productController.getRelatedProducts));
router.get("/:id", productController.getById);
router.get("/slug/:slug", asyncHandler(productController.getProductDetail));

router.use(authMiddleware);

router.post("/", asyncHandler(productController.createProduct));
router.put("/:id", asyncHandler(productController.updateProduct));
router.patch(
    "/:id/toggle-status",
    asyncHandler(productController.toggleStatus),
);
router.delete("/bulk", asyncHandler(productController.bulkDelete));
router.delete("/:id", asyncHandler(productController.deleteProduct));

export default router;
