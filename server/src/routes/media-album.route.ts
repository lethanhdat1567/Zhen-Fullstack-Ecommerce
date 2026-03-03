import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { mediaAlbumController } from "@/controllers/media-album.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", asyncHandler(mediaAlbumController.findAll));
router.get("/slug/:slug", asyncHandler(mediaAlbumController.findBySlug));
router.get("/:id", asyncHandler(mediaAlbumController.findOne));

router.use(authMiddleware);

router.post("/", asyncHandler(mediaAlbumController.create));
router.patch(
    "/:id/toggle-status",
    asyncHandler(mediaAlbumController.toggleStatus),
);
router.put("/:id", asyncHandler(mediaAlbumController.update));
router.delete("/bulk", asyncHandler(mediaAlbumController.bulkDelete));
router.delete("/:id", asyncHandler(mediaAlbumController.delete));

export default router;
