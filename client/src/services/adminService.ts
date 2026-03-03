import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type Admin = {
    id: string;
    username: string;
    email: string;
    full_name?: string;
    avatar?: string;
    role: string;
    status: string;
    created_at: string;
    updated_at?: string;
};

export type CreateAdminPayload = {
    username: string;
    email: string;
    password: string;
    full_name?: string;
    role?: string;
};

export type UpdateAdminPayload = {
    full_name?: string;
    avatar?: string;
    role?: string;
    status?: string;
};

export type ChangePasswordPayload = {
    old_password: string;
    new_password: string;
};

export type AdminQueryParams = {
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

export type ListAdminResponse = {
    items: Admin[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const adminService = {
    /* =========================
       CREATE
    ========================= */
    async create(payload: CreateAdminPayload) {
        const res = await http.post<ApiResponse<Admin>>("/admins", payload);

        return res.data;
    },

    /* =========================
       LIST
    ========================= */
    async list(params?: AdminQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));

        const res = await http.get<ApiResponse<ListAdminResponse>>(
            `/admins?${query.toString()}`,
        );

        return res.data;
    },

    /* =========================
       DETAIL
    ========================= */
    async detail(id: string) {
        const res = await http.get<ApiResponse<Admin>>(`/admins/${id}`);

        return res.data;
    },

    /* =========================
       UPDATE
    ========================= */
    async update(id: string, payload: UpdateAdminPayload) {
        const res = await http.put<ApiResponse<Admin>>(
            `/admins/${id}`,
            payload,
        );

        return res.data;
    },

    /* =========================
       CHANGE PASSWORD
    ========================= */
    async changePassword(id: string, payload: ChangePasswordPayload) {
        const res = await http.patch<ApiResponse<{ message: string }>>(
            `/admins/${id}/change-password`,
            payload,
        );

        return res.data;
    },

    /* =========================
       DELETE
    ========================= */
    async delete(id: string) {
        const res = await http.delete<ApiResponse<{ message: string }>>(
            `/admins/${id}`,
        );

        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            `/admins/bulk`,
            { ids } as any,
        );

        return res.data;
    },
};
