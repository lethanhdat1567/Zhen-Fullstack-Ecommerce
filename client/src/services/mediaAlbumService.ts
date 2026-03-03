import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type MediaAlbumStatus = "active" | "inactive" | "draft";

export type MediaAlbumQueryParams = {
    search?: string;
    lang?: string;
    page?: number;
    limit?: number;
    status?: MediaAlbumStatus;
    categorySlug?: string;
    isActive?: boolean;
};

export type MediaGalleryPayload = {
    type: "image" | "video";
    file_url: string;
    sort_order: number;
};

export type MediaAlbumPayload = {
    title: string;
    slug: string;
    description?: string;
    category_id: string;
    thumbnail?: string;
    status?: MediaAlbumStatus;
    galleries: MediaGalleryPayload[];
};

export type MediaGallery = {
    id: string;
    type: "image" | "video";
    file_url: string;
    sort_order: number;
};

export type MediaAlbum = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    thumbnail: string | null;
    status: MediaAlbumStatus;
    created_at: string;
    updated_at: string;

    category: {
        id: string;
        name: string;
    };

    galleries: MediaGallery[];
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListMediaAlbumResponse = {
    items: MediaAlbum[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const mediaAlbumService = {
    async create(payload: MediaAlbumPayload) {
        const res = await http.post<ApiResponse<MediaAlbum>>(
            "/media-albums",
            payload,
        );
        return res.data;
    },

    async update(id: string, payload: Partial<MediaAlbumPayload>) {
        const res = await http.put<ApiResponse<MediaAlbum>>(
            `/media-albums/${id}`,
            payload,
        );
        return res.data;
    },

    async list(params?: MediaAlbumQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.lang) query.append("lang", params.lang);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.status) query.append("status", params.status);
        if (params?.categorySlug)
            query.append("categorySlug", params.categorySlug);
        if (typeof params?.isActive === "boolean")
            query.append("isActive", String(params.isActive));

        const queryString = query.toString();
        const url = queryString
            ? `/media-albums?${queryString}`
            : "/media-albums";

        const res = await http.get<ApiResponse<ListMediaAlbumResponse>>(url);

        return res.data;
    },

    async getById(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<MediaAlbum>>(
            `/media-albums/${id}${query}`,
        );
        return res.data;
    },

    async getBySlug(slug: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<MediaAlbum>>(
            `/media-albums/slug/${slug}${query}`,
        );
        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<MediaAlbum>>(
            `/media-albums/${id}/toggle-status`,
        );
        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(`/media-albums/${id}`);
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            `/media-albums/bulk`,
            {
                ids,
            },
        );
        return res.data;
    },
};
