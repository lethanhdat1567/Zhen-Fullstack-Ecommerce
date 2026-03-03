import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type NavStatus = "active" | "inactive";

export type NavPayload = {
    name: string;
    code: string;
    status?: NavStatus;
};

export type UpdateNavPayload = {
    name?: string;
    status?: NavStatus;
};

export type Nav = {
    id: string;
    name: string;
    code: string;
    status: NavStatus;
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

export const navService = {
    async getAll() {
        const res = await http.get<ApiResponse<Nav[]>>("/navs");
        return res.data;
    },

    async getById(id: string) {
        const res = await http.get<ApiResponse<Nav>>(`/navs/${id}`);
        return res.data;
    },

    async create(payload: NavPayload) {
        const res = await http.post<ApiResponse<Nav>>("/navs", payload);

        return res.data;
    },

    async update(id: string, payload: UpdateNavPayload) {
        const res = await http.put<ApiResponse<Nav>>(`/navs/${id}`, payload);

        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<Nav>>(
            `/navs/${id}/toggle-status`,
        );
        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<{ message: string }>>(
            `/navs/${id}`,
        );

        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ count: number }>>(
            "/navs/bulk",
            {
                data: { ids },
            },
        );

        return res.data;
    },
};
