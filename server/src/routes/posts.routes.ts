import postController from "@/controllers/post.controller";
import { asyncHandler } from "@/utils/asyncHandler";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", asyncHandler(postController.listPosts));
router.get("/related", asyncHandler(postController.getRelatedPosts));
router.get("/:id", asyncHandler(postController.getById));
router.get("/slug/:slug", asyncHandler(postController.getDetail));

router.use(authMiddleware);

router.post("/", asyncHandler(postController.createPost));
router.patch("/:id/toggle-status", asyncHandler(postController.toggleStatus));
router.put("/:id", asyncHandler(postController.updatePost));
router.delete("/bulk", asyncHandler(postController.bulkDelete));
router.delete("/:id", asyncHandler(postController.deletePost));

export default router;
