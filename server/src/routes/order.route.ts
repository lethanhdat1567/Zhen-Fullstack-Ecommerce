import orderController from "@/controllers/order.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { optionalAuthMiddleware } from "@/middlewares/authOptional.middleware";
import { checkRole } from "@/middlewares/checkRole.middleware";
import { asyncHandler } from "@/utils/asyncHandler";
import { Router } from "express";

const router = Router();

router.post(
    "/checkout",
    optionalAuthMiddleware,
    asyncHandler(orderController.checkout),
);

router.use(authMiddleware);

// Routes cho User
router.get("/history", asyncHandler(orderController.getMyOrders));
router.get("/:id", asyncHandler(orderController.getOrderDetail));

// Routes cho Admin
router.get(
    "/admin/all",
    checkRole("admin"),
    asyncHandler(orderController.getAllOrders),
);
router.patch(
    "/admin/status/:id",
    checkRole("admin"),
    asyncHandler(orderController.updateStatus),
);

router.delete("/admin/:id", orderController.destroy);

router.delete("/admin/bulk", orderController.bulkDestroy);

export default router;
