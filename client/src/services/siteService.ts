import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type SiteSettingPayload = {
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
};

export type SiteSetting = {
    id: string;
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

    created_at: string;
    updated_at: string;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const siteSettingService = {
    async get() {
        const res = await http.get<ApiResponse<SiteSetting>>("/site-setting");

        return res.data;
    },

    async update(payload: SiteSettingPayload) {
        const res = await http.put<ApiResponse<SiteSetting>>(
            "/site-setting",
            payload,
        );

        return res.data;
    },
};
