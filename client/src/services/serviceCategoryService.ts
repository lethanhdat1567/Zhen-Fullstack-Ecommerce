import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type ServiceCategoryQueryParams = {
    search?: string;
    lang?: string;
    page?: number;
    limit?: number;
    isActive?: boolean;
};

export type ServiceCategoryPayload = {
    slug: string;
    status?: boolean;
    translations: {
        lang: string;
        title: string;
        description?: string;
    }[];
};

export type ServiceCategory = {
    id: string;
    slug: string;
    status: boolean;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListServiceCategoryResponse = {
    items: ServiceCategory[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const serviceCategoryService = {
    async create(payload: ServiceCategoryPayload) {
        const res = await http.post<ApiResponse<ServiceCategory>>(
            "/service-categories",
            payload,
        );
        return res.data;
    },

    async update(id: string, payload: Partial<ServiceCategoryPayload>) {
        const res = await http.put<ApiResponse<ServiceCategory>>(
            `/service-categories/${id}`,
            payload,
        );
        return res.data;
    },

    async list(params?: ServiceCategoryQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.lang) query.append("lang", params.lang);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (typeof params?.isActive === "boolean")
            query.append("isActive", String(params.isActive));

        const queryString = query.toString();
        const url = queryString
            ? `/service-categories?${queryString}`
            : "/service-categories";

        const res =
            await http.get<ApiResponse<ListServiceCategoryResponse>>(url);

        return res.data;
    },

    async detail(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<ServiceCategory>>(
            `/service-categories/${id}${query}`,
        );
        return res.data;
    },

    async detailBySlug(slug: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<ServiceCategory>>(
            `/service-categories/slug/${slug}${query}`,
        );
        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<ServiceCategory>>(
            `/service-categories/${id}/toggle-status`,
        );
        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(
            `/service-categories/${id}`,
        );
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            `/service-categories/bulk`,
            { ids } as any,
        );
        return res.data;
    },
};
