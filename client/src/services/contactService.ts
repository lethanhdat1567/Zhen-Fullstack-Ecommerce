import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type Contact = {
    id: string;
    fullname: string;
    phone_number?: string;
    email: string;
    content: string;
    created_at: string;
    updated_at?: string;
};

export type ContactQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListContactResponse = {
    items: Contact[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const contactService = {
    /* PUBLIC */
    async create(payload: {
        fullname: string;
        phone_number?: string;
        email: string;
        content: string;
    }) {
        const res = await http.post<ApiResponse<Contact>>("/contact", payload);

        return res.data;
    },

    /* ADMIN LIST */
    async list(params?: ContactQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));

        const res = await http.get<ApiResponse<ListContactResponse>>(
            `/contact?${query.toString()}`,
        );

        return res.data;
    },

    /* DETAIL */
    async detail(id: string) {
        const res = await http.get<ApiResponse<Contact>>(`/contact/${id}`);

        return res.data;
    },

    /* DELETE */
    async delete(id: string) {
        const res = await http.delete<ApiResponse<{ message: string }>>(
            `/contact/${id}`,
        );

        return res.data;
    },

    /* BULK DELETE */
    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            `/contact/bulk`,
            { ids } as any,
        );

        return res.data;
    },
};
