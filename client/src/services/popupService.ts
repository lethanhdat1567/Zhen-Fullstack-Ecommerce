import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type PopupQueryParams = {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
    lang?: string;
};

export type Popup = {
    id: string;

    thumbnail?: string | null;

    title?: string | null;
    content?: string | null;

    status: string;
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

export type ListPopupResponse = {
    items: Popup[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

export type ReorderPopupPayload = {
    items: {
        id: string;
        sort_order: number;
    }[];
};

/* =========================
   SERVICE
========================= */

export const popupService = {
    async create(payload: any) {
        const res = await http.post<ApiResponse<Popup>>("/popups", payload);

        return res.data;
    },

    async update(id: string, payload: Partial<any>) {
        const res = await http.put<ApiResponse<Popup>>(
            `/popups/${id}`,
            payload,
        );

        return res.data;
    },

    async list(params?: PopupQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.status !== undefined)
            query.append("status", String(params.status));
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.lang) query.append("lang", params.lang);

        const res = await http.get<ApiResponse<ListPopupResponse>>(
            `/popups?${query.toString()}`,
        );

        return res.data;
    },

    async detail(id: string, lang?: string) {
        const res = await http.get<ApiResponse<any>>(
            `/popups/${id}${lang ? `?lang=${lang}` : ""}`,
        );

        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<Popup>>(
            `/popups/${id}/toggle-status`,
        );

        return res.data;
    },

    async reorder(items: { id: string; sort_order: number }[]) {
        const res = await http.patch<ApiResponse<{ message: string }>>(
            "/popups/reorder",
            { items },
        );

        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(`/popups/${id}`);

        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<null>>(
            `/popups/bulk-delete`,
            { ids } as any,
        );

        return res.data;
    },
};
