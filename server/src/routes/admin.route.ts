import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { adminController } from "@/controllers/admin.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", asyncHandler(adminController.create));
router.get("/", asyncHandler(adminController.findAll));
router.get("/:id", asyncHandler(adminController.findOne));
router.put("/:id", asyncHandler(adminController.update));
router.delete("/bulk", asyncHandler(adminController.bulkDelete));
router.delete("/:id", asyncHandler(adminController.delete));

// Đổi mật khẩu
router.patch(
    "/:id/change-password",
    asyncHandler(adminController.changePassword),
);

export default router;
