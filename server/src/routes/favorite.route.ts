import favoriteController from "@/controllers/favorite.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/asyncHandler";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.get("/check", asyncHandler(favoriteController.checkLikedStatus));
router.get("/", asyncHandler(favoriteController.getFavorites));
router.post("/sync", asyncHandler(favoriteController.syncFavorites));
router.post("/toggle", asyncHandler(favoriteController.toggleFavorite));

export default router;
