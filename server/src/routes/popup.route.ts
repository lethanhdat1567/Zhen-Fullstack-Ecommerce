import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { popupController } from "@/controllers/popup.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", asyncHandler(popupController.findAll));
router.get("/:id", asyncHandler(popupController.findOne));

router.use(authMiddleware);

router.post("/", asyncHandler(popupController.create));
router.put("/:id", asyncHandler(popupController.update));
router.patch("/reorder", asyncHandler(popupController.reorder));
router.patch("/:id/toggle-status", asyncHandler(popupController.toggleStatus));
router.delete("/bulk", asyncHandler(popupController.bulkDelete));
router.delete("/:id", asyncHandler(popupController.delete));

export default router;
