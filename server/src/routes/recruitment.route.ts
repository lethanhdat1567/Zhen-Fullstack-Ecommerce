import recruitmentController from "@/controllers/recruitment.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", asyncHandler(recruitmentController.listRecruitments));
router.get("/:id", asyncHandler(recruitmentController.getById));

router.use(authMiddleware);

router.post("/", asyncHandler(recruitmentController.createRecruitment));
router.put("/:id", asyncHandler(recruitmentController.updateRecruitment));
router.patch(
    "/:id/toggle-status",
    asyncHandler(recruitmentController.toggleStatus),
);
router.delete("/bulk", asyncHandler(recruitmentController.bulkDelete));
router.delete("/:id", asyncHandler(recruitmentController.deleteRecruitment));

export default router;
