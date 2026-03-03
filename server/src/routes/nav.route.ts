import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { navController } from "@/controllers/nav.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", asyncHandler(navController.findAll));
router.get("/:id", asyncHandler(navController.findOne));

router.use(authMiddleware);

router.post("/", asyncHandler(navController.create));
router.put("/:id", asyncHandler(navController.update));
router.patch("/:id/toggle-status", asyncHandler(navController.toggleStatus));
router.delete("/bulk", asyncHandler(navController.bulkDelete));
router.delete("/:id", asyncHandler(navController.delete));

export default router;
