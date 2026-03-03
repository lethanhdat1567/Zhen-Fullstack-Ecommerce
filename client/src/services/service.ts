import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type ServiceQueryParams = {
    search?: string;
    lang?: string;
    page?: number;
    limit?: number;
    categorySlug?: string;
    isActive?: boolean;
};

export type ServicePayload = {
    slug: string;
    categoryId: string;
    status?: boolean;
    thumbnail?: string;
    translations: {
        lang: string;
        title: string;
        description?: string;
        content?: string;
    }[];
};

export type Service = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    content: string | null;
    sku: string;
    price: string;
    category_id: string;
    thumbnail: string | null;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    category: {
        id: string;
        name: string;
    };
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListServiceResponse = {
    items: Service[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

export type RelatedServiceQueryParams = {
    lang: string; // bắt buộc
    serviceId?: string;
    categorySlug?: string;
    limit?: number;
    isActive?: boolean;
    excludeIds?: string[];
    random?: boolean;
};

export type RelatedService = {
    id: string;
    title: string | null;
    slug: string | null;
    description: string | null;
    content: string | null;
    thumbnail: string | null;
    price: number | null;
    created_at: string;
    category?: {
        id: string;
        name: string | null;
    } | null;
};

/* =========================
   SERVICE
========================= */

export const serviceService = {
    async createService(payload: ServicePayload) {
        const res = await http.post<ApiResponse<Service>>("/services", payload);
        return res.data;
    },

    async updateService(id: string, payload: Partial<ServicePayload>) {
        const res = await http.put<ApiResponse<Service>>(
            `/services/${id}`,
            payload,
        );
        return res.data;
    },

    async listServices(params?: ServiceQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.lang) query.append("lang", params.lang);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.categorySlug)
            query.append("categorySlug", params.categorySlug);
        if (typeof params?.isActive === "boolean")
            query.append("isActive", String(params.isActive));

        const queryString = query.toString();
        const url = queryString ? `/services?${queryString}` : "/services";

        const res = await http.get<ApiResponse<ListServiceResponse>>(url);

        return res.data;
    },

    async getServiceDetail(slug: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<Service>>(
            `/services/slug/${slug}${query}`,
        );
        return res.data;
    },

    async getServiceById(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<Service>>(
            `/services/${id}${query}`,
        );
        return res.data;
    },

    async getRelatedServices(params: RelatedServiceQueryParams) {
        const query = new URLSearchParams();

        query.append("lang", params.lang);

        if (params.serviceId) query.append("serviceId", params.serviceId);

        if (params.categorySlug)
            query.append("categorySlug", params.categorySlug);

        if (params.limit) query.append("limit", String(params.limit));

        if (typeof params.isActive === "boolean")
            query.append("isActive", String(params.isActive));

        if (params.excludeIds?.length)
            query.append("excludeIds", params.excludeIds.join(","));

        if (params.random) query.append("random", "true");

        const res = await http.get<ApiResponse<RelatedService[]>>(
            `/services/related?${query.toString()}`,
            { cache: "no-cache" },
        );

        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<Service>>(
            `/services/${id}/toggle-status`,
        );
        return res.data;
    },

    async deleteService(id: string) {
        const res = await http.delete<ApiResponse<null>>(`/services/${id}`);
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            `/services/bulk`,
            { ids } as any,
        );
        return res.data;
    },
};
