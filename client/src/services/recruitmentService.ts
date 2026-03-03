import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type RecruitmentQueryParams = {
    page?: number;
    limit?: number;
    lang?: string;
    isActive?: boolean;
};

export type RecruitmentTranslationPayload = {
    language_code: string;
    title: string;
};

export type RecruitmentPayload = {
    address?: string;
    quantity?: number;
    status?: "active" | "inactive";
    translations: RecruitmentTranslationPayload[];
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type Recruitment = {
    id: string;
    address?: string | null;
    quantity: number;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;

    // Khi có lang
    title?: string | null;

    // Khi không truyền lang
    translations?: {
        id: string;
        title: string;
        language: {
            code: string;
        };
    }[];
};

export type ListRecruitmentResponse = {
    items: Recruitment[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const recruitmentService = {
    async create(payload: RecruitmentPayload) {
        const res = await http.post<ApiResponse<Recruitment>>(
            "/recruitments",
            payload,
        );
        return res.data;
    },

    async update(id: string, payload: RecruitmentPayload) {
        const res = await http.put<ApiResponse<Recruitment>>(
            `/recruitments/${id}`,
            payload,
        );
        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<Recruitment>>(
            `/recruitments/${id}/toggle-status`,
        );
        return res.data;
    },

    async list(params?: RecruitmentQueryParams) {
        const query = new URLSearchParams();

        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.lang) query.append("lang", params.lang);

        if (typeof params?.isActive === "boolean") {
            query.append("isActive", String(params.isActive));
        }

        const queryString = query.toString();
        const url = queryString
            ? `/recruitments?${queryString}`
            : "/recruitments";

        const res = await http.get<ApiResponse<ListRecruitmentResponse>>(url);

        return res.data;
    },

    async getById(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";

        const res = await http.get<ApiResponse<Recruitment>>(
            `/recruitments/${id}${query}`,
        );

        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(`/recruitments/${id}`);

        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            "/recruitments/bulk",
            {
                ids,
            },
        );

        return res.data;
    },
};
