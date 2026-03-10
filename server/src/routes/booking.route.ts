import bookingController from "@/controllers/booking.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import { optionalAuthMiddleware } from "@/middlewares/authOptional.middleware";

const router = Router();

router.post(
    "/",
    optionalAuthMiddleware,
    asyncHandler(bookingController.createBooking),
);

router.use(authMiddleware);

router.get("/", asyncHandler(bookingController.listBookings));
router.get("/:id", asyncHandler(bookingController.getById));
router.patch("/:id", asyncHandler(bookingController.updateBooking));
router.delete("/bulk", asyncHandler(bookingController.bulkDelete));
router.delete("/:id", asyncHandler(bookingController.deleteBooking));

export default router;
