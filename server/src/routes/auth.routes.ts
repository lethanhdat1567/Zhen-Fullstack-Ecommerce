import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/register", asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));
router.post("/refresh", asyncHandler(AuthController.refresh));
router.post("/forgot-password", asyncHandler(AuthController.forgotPassword));
router.get(
    "/reset-password/verify",
    asyncHandler(AuthController.verifyResetToken),
);
router.post("/reset-password", asyncHandler(AuthController.resetPassword));

router.post("/logout", authMiddleware, asyncHandler(AuthController.logout));

export default router;
