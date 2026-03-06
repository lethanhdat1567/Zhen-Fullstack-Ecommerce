import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import availableServiceController from "@/controllers/available-service.controller";

const router = Router();

router.use(authMiddleware);

router.get("/summary", asyncHandler(availableServiceController.listSummary));
router.get(
    "/calendar/:serviceId",
    asyncHandler(availableServiceController.getServiceCalendar),
);
router.post("/block", asyncHandler(availableServiceController.blockDates));
router.delete(
    "/bulk-unblock",
    asyncHandler(availableServiceController.bulkUnblock),
);
router.delete("/:id", asyncHandler(availableServiceController.unblockDate));

export default router;
