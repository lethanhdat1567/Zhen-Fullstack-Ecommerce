import orderHistoryController from "@/controllers/order-history.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/asyncHandler";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    authMiddleware,
    asyncHandler(orderHistoryController.getOrderHistory),
);

export default router;
