import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { mediaItemController } from "@/controllers/media-item.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/album/:albumId", asyncHandler(mediaItemController.findByAlbum));

router.use(authMiddleware);

router.post("/", asyncHandler(mediaItemController.create));
router.post("/bulk", asyncHandler(mediaItemController.createMany));
router.put("/:id", asyncHandler(mediaItemController.update));
router.delete("/:id", asyncHandler(mediaItemController.delete));

export default router;
