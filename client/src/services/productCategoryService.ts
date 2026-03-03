import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type ProductCategoryQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
    lang?: string;
    isActive?: boolean;
    status?: "active" | "inactive";
};

export type ProductCategoryTranslationPayload = {
    language_code: string;
    name: string;
    slug: string;
};

export type ProductCategoryPayload = {
    status?: "active" | "inactive";
    translations: ProductCategoryTranslationPayload[];
};

export type ProductCategoryTranslation = {
    id: string;
    language_code: string;
    name: string;
    slug: string;
};

export type ProductCategory = {
    id: string;
    status: "active" | "inactive";
    translations: ProductCategoryTranslation[];
    slug: string;
    name: string;
    created_at: string;
    updated_at: string;
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListProductCategoryResponse = {
    items: ProductCategory[] | ProductCategoryTranslation[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const productCategoryService = {
    async create(payload: ProductCategoryPayload) {
        const res = await http.post<ApiResponse<ProductCategory>>(
            "/product-categories",
            payload,
        );
        return res.data;
    },

    async update(id: string, payload: ProductCategoryPayload) {
        const res = await http.put<ApiResponse<ProductCategory>>(
            `/product-categories/${id}`,
            payload,
        );
        return res.data;
    },

    async list(params?: ProductCategoryQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.lang) query.append("lang", params.lang);
        if (params?.status) query.append("status", params.status);

        if (typeof params?.isActive === "boolean") {
            query.append("isActive", String(params.isActive));
        }

        const queryString = query.toString();
        const url = queryString
            ? `/product-categories?${queryString}`
            : "/product-categories";

        const res =
            await http.get<ApiResponse<ListProductCategoryResponse>>(url);

        return res.data;
    },

    async getById(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<ProductCategory>>(
            `/product-categories/${id}${query}`,
        );
        return res.data;
    },

    async getBySlug(slug: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<ProductCategory>>(
            `/product-categories/slug/${slug}${query}`,
        );
        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<ProductCategory>>(
            `/product-categories/${id}/toggle-status`,
        );
        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(
            `/product-categories/${id}`,
        );
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            "/product-categories/bulk",
            {
                ids,
            },
        );
        return res.data;
    },
};
