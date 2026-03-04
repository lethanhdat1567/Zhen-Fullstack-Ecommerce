import { http } from "@/lib/http/http";
import { ApiResponse } from "@/services/cartService";

/* =========================
    TYPES
========================= */

export type FavoriteItem = {
    type: "product" | "service";
    id: string;
    price?: string;
    sale_price?: string;
    thumbnail: string | null;
    title: string;
    slug: string;
    stock?: number;
    status?: string;
};

export type ToggleFavoriteResponse = {
    liked: boolean;
    message: string;
};

export type CheckLikedResponse = {
    is_liked: boolean;
};

/* =========================
    SERVICE
========================= */

export const favoriteService = {
    /**
     * Lấy danh sách yêu thích
     * @param type 'product' | 'service' (optional)
     * @param lang ngôn ngữ (optional)
     */
    async getFavorites(params?: {
        type?: "product" | "service";
        lang?: string;
    }) {
        const searchParams = new URLSearchParams();
        if (params?.type) searchParams.append("type", params.type);
        if (params?.lang) searchParams.append("lang", params.lang);

        const query = searchParams.toString()
            ? `?${searchParams.toString()}`
            : "";
        const res = await http.get<ApiResponse<FavoriteItem[]>>(
            `/favorites${query}`,
        );
        return res.data;
    },

    /**
     * Thêm hoặc xóa yêu thích (Toggle)
     * Truyền vào product_id HOẶC service_id
     */
    async toggleFavorite(payload: {
        product_id?: string;
        service_id?: string;
    }) {
        const res = await http.post<ApiResponse<ToggleFavoriteResponse>>(
            "/favorites/toggle",
            payload,
        );
        return res.data;
    },

    /**
     * Kiểm tra trạng thái đã thích hay chưa của 1 item
     */
    async checkStatus(params: { product_id?: string; service_id?: string }) {
        const searchParams = new URLSearchParams();
        if (params.product_id)
            searchParams.append("product_id", params.product_id);
        if (params.service_id)
            searchParams.append("service_id", params.service_id);

        const res = await http.get<ApiResponse<CheckLikedResponse>>(
            `/favorites/check?${searchParams.toString()}`,
        );
        return res.data;
    },

    async syncFavorites(
        favorites: { type: "product" | "service"; id: string }[],
    ) {
        const res = await http.post<ApiResponse<{ count: number }>>(
            "/favorites/sync",
            {
                favorites: favorites.map(({ type, id }) => ({ type, id })),
            },
        );
        return res.data;
    },
};
