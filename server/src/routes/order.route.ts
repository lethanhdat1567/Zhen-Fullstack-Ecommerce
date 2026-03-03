import orderController from "@/controllers/order.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { checkRole } from "@/middlewares/checkRole.middleware";
import { asyncHandler } from "@/utils/asyncHandler";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

// Routes cho User
router.post("/checkout", asyncHandler(orderController.checkout));
router.get("/history", asyncHandler(orderController.getMyOrders));
router.get("/:id", asyncHandler(orderController.getOrderDetail));

// Routes cho Admin
router.get(
    "/admin/all",
    // checkRole("admin"),
    asyncHandler(orderController.getAllOrders),
);
router.patch(
    "/admin/status/:id",
    // checkRole("admin"),
    asyncHandler(orderController.updateStatus),
);

export default router;
