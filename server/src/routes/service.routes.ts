import serviceController from "@/controllers/service.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", asyncHandler(serviceController.listServices));
router.get("/related", asyncHandler(serviceController.getRelatedServices));
router.get("/slug/:slug", asyncHandler(serviceController.getServiceDetail));
router.get("/:id", asyncHandler(serviceController.getServiceById));

router.use(authMiddleware);

router.post("/", asyncHandler(serviceController.createService));
router.put("/:id", asyncHandler(serviceController.updateService));
router.patch(
    "/:id/toggle-status",
    asyncHandler(serviceController.toggleStatus),
);
router.delete("/bulk", asyncHandler(serviceController.bulkDeleteServices));
router.delete("/:id", asyncHandler(serviceController.deleteService));

export default router;
