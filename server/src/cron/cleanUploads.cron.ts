import cron from "node-cron";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { deleteMultipleFiles } from "@/utils/media";

const uploadsPath = path.join(process.cwd(), "uploads", "images");

export const cleanUploadsCron = () => {
    cron.schedule("*0 3 * * *", async () => {
        console.log("🧹 Start cleaning uploads/images...");

        try {
            /* =========================
               1️⃣ Lấy file trong folder
            ========================== */
            const files = await fs.readdir(uploadsPath);

            if (!files.length) {
                console.log("⚠️ Folder trống.");
                return;
            }

            /* =========================
               2️⃣ Lấy ảnh từ tất cả table
            ========================== */
            const [
                services,
                serviceGalleries,
                products,
                productGalleries,
                posts,
                admins,
                mediaAlbums,
                mediaItems,
                popups,
                siteSettings,
                heroBanners,
            ] = await Promise.all([
                prisma.services.findMany({ select: { thumbnail: true } }),
                prisma.service_galleries.findMany({ select: { image: true } }),
                prisma.products.findMany({ select: { thumbnail: true } }),
                prisma.product_galleries.findMany({ select: { image: true } }),
                prisma.posts.findMany({ select: { thumbnail: true } }),
                prisma.admins.findMany({ select: { avatar: true } }),
                prisma.media_albums.findMany({ select: { thumbnail: true } }),
                prisma.media_items.findMany({ select: { file_url: true } }),
                prisma.popups.findMany({ select: { thumbnail: true } }),
                prisma.site_settings.findMany({ select: { logo: true } }),
                prisma.hero_banners.findMany({ select: { thumbnail: true } }),
            ]);

            const usedImages = [
                ...services.map((i) => i.thumbnail),
                ...serviceGalleries.map((i) => i.image),
                ...products.map((i) => i.thumbnail),
                ...productGalleries.map((i) => i.image),
                ...posts.map((i) => i.thumbnail),
                ...admins.map((i) => i.avatar),
                ...mediaAlbums.map((i) => i.thumbnail),
                ...mediaItems.map((i) => i.file_url),
                ...popups.map((i) => i.thumbnail),
                ...siteSettings.map((i) => i.logo),
                ...heroBanners.map((i) => i.thumbnail),
            ]
                .filter(Boolean)
                .map((url) => path.basename(url as string));

            const usedImagesSet = new Set(usedImages);

            /* =========================
               3️⃣ Xác định file rác
            ========================== */

            const trashFiles: string[] = [];

            for (const file of files) {
                if (!usedImagesSet.has(file)) {
                    // phải truyền full relative path
                    trashFiles.push(`uploads/images/${file}`);
                }
            }

            if (!trashFiles.length) {
                console.log("✅ Không có file rác.");
                return;
            }

            /* =========================
               4️⃣ Xoá file rác
            ========================== */

            await deleteMultipleFiles(trashFiles);

            console.log(`🗑 Đã xoá ${trashFiles.length} file rác.`);
        } catch (error) {
            console.error("❌ Clean uploads error:", error);
        }
    });
};
