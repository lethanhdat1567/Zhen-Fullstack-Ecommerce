import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

export interface UpdateSiteSettingDTO {
    phone_number?: string;
    email?: string;
    address?: string;
    open_time?: string;
    logo?: string;
    google_map_embed?: string;

    facebook_url?: string;
    instagram_url?: string;
    tiktok_url?: string;
    youtube_url?: string;

    meta_title_default?: string;
    meta_description_default?: string;
}

export const siteSettingService = {
    /* ================================
       GET
    ================================== */
    async get() {
        const setting = await prisma.site_settings.findFirst();

        if (!setting) {
            throw new AppError("Chưa có thông tin website", 404);
        }

        return setting;
    },

    /* ================================
       UPDATE (singleton)
    ================================== */
    async update(data: UpdateSiteSettingDTO) {
        const existing = await prisma.site_settings.findFirst();

        if (!existing) {
            return prisma.site_settings.create({
                data,
            });
        }

        return prisma.site_settings.update({
            where: { id: existing.id },
            data,
        });
    },
};
