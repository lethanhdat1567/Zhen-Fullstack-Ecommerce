import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { searchController } from "@/controllers/search.controller";

const router = Router();

router.get("/suggest", asyncHandler(searchController.suggest));
router.get("/", asyncHandler(searchController.search));

export default router;
