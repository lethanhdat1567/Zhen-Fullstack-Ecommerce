import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { contactController } from "@/controllers/contact.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/", asyncHandler(contactController.create));

router.use(authMiddleware);

router.get("/", asyncHandler(contactController.findAll));
router.get("/:id", asyncHandler(contactController.findOne));
router.delete("/bulk", asyncHandler(contactController.bulkDelete));
router.delete("/:id", asyncHandler(contactController.delete));

export default router;
