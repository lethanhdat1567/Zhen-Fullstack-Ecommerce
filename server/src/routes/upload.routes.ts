import { upload } from "@/config/multerConfig";
import { AppError } from "@/utils/appError";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import multer from "multer";

const router = Router();

router.use(authMiddleware);

router.post("/", (req, res, next) => {
    upload.single("file")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return next(new AppError("FILE_SIZE_LIMIT_EXCEEDED", 400));
            }
        }

        if (err) return next(err);

        try {
            if (!req.file) {
                throw new AppError("FILE_NOT_FOUND", 400);
            }

            return res.success({
                url: `/uploads/images/${req.file.filename}`,
                type: "image",
            });
        } catch (error) {
            next(error);
        }
    });
});

router.post("/multiple", (req, res, next) => {
    upload.array("files", 10)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return next(new AppError("FILE_SIZE_LIMIT_EXCEEDED", 400));
            }
        }

        if (err) return next(err);

        try {
            if (!req.files) {
                throw new AppError("FILE_NOT_FOUND", 400);
            }

            const filesArray = req.files as Express.Multer.File[];

            const response = filesArray.map((file) => ({
                url: `/uploads/images/${file.filename}`,
                type: "image",
            }));

            return res.success(response);
        } catch (error) {
            next(error);
        }
    });
});

export default router;
