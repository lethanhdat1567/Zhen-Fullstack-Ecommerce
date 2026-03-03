import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "@/utils/appError";

const uploadPath = path.join(process.cwd(), "uploads/images");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${uuidv4()}_${Date.now()}${ext}`;
        cb(null, filename);
    },
});

// ======================
// 4️⃣ Custom storage switch
// ======================

const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const storage: multer.StorageEngine = {
    _handleFile(req, file, cb) {
        if (allowedImageTypes.includes(file.mimetype)) {
            imageStorage._handleFile(req, file, cb);
        } else {
            cb(new AppError("UNSUPPORTED_MEDIA_TYPE", 400));
        }
    },

    _removeFile(req, file, cb) {
        imageStorage._removeFile(req, file, cb);
    },
};

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
