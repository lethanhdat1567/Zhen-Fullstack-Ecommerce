import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type MediaCategoryQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
    lang?: string;
    isActive?: boolean;
};

export type MediaCategoryPayload = {
    name: string;
    slug: string;
    status?: "active" | "inactive";
};

export type MediaCategory = {
    id: string;
    name: string;
    slug: string;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListMediaCategoryResponse = {
    items: MediaCategory[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const mediaCategoryService = {
    async create(payload: MediaCategoryPayload) {
        const res = await http.post<ApiResponse<MediaCategory>>(
            "/media-categories",
            payload,
        );
        return res.data;
    },

    async update(id: string, payload: Partial<MediaCategoryPayload>) {
        const res = await http.put<ApiResponse<MediaCategory>>(
            `/media-categories/${id}`,
            payload,
        );
        return res.data;
    },

    async list(params?: MediaCategoryQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.lang) query.append("lang", params.lang);
        if (typeof params?.isActive === "boolean")
            query.append("isActive", String(params.isActive));

        const queryString = query.toString();
        const url = queryString
            ? `/media-categories?${queryString}`
            : "/media-categories";

        const res = await http.get<ApiResponse<ListMediaCategoryResponse>>(url);

        return res.data;
    },

    async getById(id: string) {
        const res = await http.get<ApiResponse<MediaCategory>>(
            `/media-categories/${id}`,
        );
        return res.data;
    },

    async getBySlug(slug: string, lang?: string) {
        const query = new URLSearchParams();

        if (lang) query.append("lang", lang);

        const queryString = query.toString();
        const url = queryString
            ? `/media-categories/slug/${slug}?${queryString}`
            : `/media-categories/slug/${slug}`;

        const res = await http.get<ApiResponse<MediaCategory>>(url);

        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<MediaCategory>>(
            `/media-categories/${id}/toggle-status`,
        );
        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(
            `/media-categories/${id}`,
        );
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            `/media-categories/bulk`,
            { ids } as any,
        );
        return res.data;
    },
};
