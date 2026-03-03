import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { userController } from "@/controllers/user.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", asyncHandler(userController.create));
router.get("/", asyncHandler(userController.findAll));
router.get("/:id", asyncHandler(userController.findOne));
router.put("/:id", asyncHandler(userController.update));
router.delete("/bulk", asyncHandler(userController.bulkDelete));
router.delete("/:id", asyncHandler(userController.delete));

// Đổi mật khẩu
router.patch(
    "/:id/change-password",
    asyncHandler(userController.changePassword),
);

export default router;
