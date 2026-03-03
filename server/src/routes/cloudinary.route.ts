import { Router } from "express";
import cloudinary from "@/config/cloudinaryConfig";
import { AppError } from "@/utils/appError";

const router = Router();

router.post("/signature", async (req, res, next) => {
    try {
        const folder = req.body?.folder;

        if (!folder) {
            throw new AppError("FOLDER_REQUIRED", 400);
        }

        const timestamp = Math.round(Date.now() / 1000);

        const paramsToSign = {
            timestamp,
            folder,
        };

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET as string,
        );

        return res.success({
            timestamp,
            signature,
            apiKey: process.env.CLOUDINARY_API_KEY,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
