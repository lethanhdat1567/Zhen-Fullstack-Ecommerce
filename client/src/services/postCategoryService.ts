import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type PostCategoryQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
    lang?: string;
    isActive?: boolean;
};

export type PostCategoryTranslationPayload = {
    language_code: string;
    name: string;
    slug: string;
};

export type PostCategoryPayload = {
    status?: "active" | "inactive";
    translations: PostCategoryTranslationPayload[];
};

export type PostCategory = {
    id: string;
    status: "active" | "inactive";
    translations: {
        id: string;
        name: string;
        slug: string;
        language: {
            code: string;
        };
    }[];
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

export const postCategoryService = {
    async create(payload: PostCategoryPayload) {
        const res = await http.post<ApiResponse<PostCategory>>(
            "/post-categories",
            payload,
        );
        return res.data;
    },

    async update(id: string, payload: PostCategoryPayload) {
        const res = await http.put<ApiResponse<PostCategory>>(
            `/post-categories/${id}`,
            payload,
        );
        return res.data;
    },

    async list(params?: PostCategoryQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.lang) query.append("lang", params.lang);
        if (params?.isActive !== undefined)
            query.append("isActive", String(params.isActive));

        const queryString = query.toString();
        const url = queryString
            ? `/post-categories?${queryString}`
            : "/post-categories";

        const res = await http.get<ApiResponse<any>>(url);

        return res.data;
    },

    async getById(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";

        const res = await http.get<ApiResponse<PostCategory>>(
            `/post-categories/${id}${query}`,
        );

        return res.data;
    },

    async getDetail(slug: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";

        const res = await http.get<ApiResponse<PostCategory>>(
            `/post-categories/slug/${slug}${query}`,
        );

        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(
            `/post-categories/${id}`,
        );
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            "/post-categories/bulk",
            {
                ids,
            },
        );

        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<PostCategory>>(
            `/post-categories/${id}/toggle-status`,
        );

        return res.data;
    },
};
