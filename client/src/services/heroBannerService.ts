import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type HeroBannerPayload = {
    thumbnail: string;
    sort_order?: number;
};

export type HeroBanner = {
    id: string;
    thumbnail: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListHeroBannerResponse = {
    items: HeroBanner[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const heroBannerService = {
    async create(payload: HeroBannerPayload[]) {
        const res = await http.post<ApiResponse<HeroBanner[]>>(
            "/hero-banners",
            payload,
        );

        return res.data;
    },

    async list(params?: { search?: string; page?: number; limit?: number }) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));

        const res = await http.get<ApiResponse<ListHeroBannerResponse>>(
            `/hero-banners?${query.toString()}`,
        );

        return res.data;
    },

    async detail(id: string) {
        const res = await http.get<ApiResponse<HeroBanner>>(
            `/hero-banners/${id}`,
        );

        return res.data;
    },

    async update(payload: HeroBannerPayload[]) {
        const res = await http.put<ApiResponse<HeroBanner[]>>(
            "/hero-banners",
            payload,
        );

        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<{ message: string }>>(
            `/hero-banners/${id}`,
        );

        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            "/hero-banners/bulk",
            { ids } as any,
        );

        return res.data;
    },
};
