import cartController from "@/controllers/cart.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/asyncHandler";
import { Router } from "express";

const router = Router();

router.post("/sync", asyncHandler(cartController.getCartInfo));
router.use(authMiddleware);

router.get("/", asyncHandler(cartController.getCart));
router.post("/merge", asyncHandler(cartController.mergeCart));
router.post("/add", asyncHandler(cartController.addToCart));
router.patch("/update-quantity", asyncHandler(cartController.updateQuantity));
router.delete("/:id", asyncHandler(cartController.removeItem));
router.delete("/clear", asyncHandler(cartController.clearCart));

export default router;
