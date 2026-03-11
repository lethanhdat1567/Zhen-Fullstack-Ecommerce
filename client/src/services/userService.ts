import { http } from "@/lib/http/http";

/* =========================
    TYPES
========================= */

export type User = {
    id: string;
    username: string;
    email: string;
    full_name?: string;
    phone?: string; // Bổ sung
    address?: string; // Bổ sung
    avatar?: string;
    role: string;
    status: "active" | "inactive" | "blocked";
    created_at: string;
    updated_at?: string;
};

export type CreateUserPayload = {
    username: string;
    email: string;
    password: string;
    full_name?: string;
    phone?: string; // Bổ sung
    address?: string; // Bổ sung
    role?: string;
};

export type UpdateUserPayload = {
    full_name?: string;
    phone?: string; // Bổ sung
    address?: string; // Bổ sung
    avatar?: string;
    role?: string;
    status?: "active" | "inactive" | "blocked";
};

// ... Các types khác (ChangePasswordPayload, UserQueryParams, v.v.) giữ nguyên ...

export type ChangePasswordPayload = {
    old_password: string;
    new_password: string;
};

export type UserQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListUserResponse = {
    items: User[];
    pagination: Pagination;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
    SERVICE
========================= */

export const userService = {
    /* =========================
        CREATE
    ========================= */
    async create(payload: CreateUserPayload) {
        // Payload lúc này đã bao gồm phone và address
        const res = await http.post<ApiResponse<User>>("/users", payload);
        return res.data;
    },

    /* =========================
        LIST
    ========================= */
    async list(params?: UserQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.role) query.append("role", params.role);
        if (params?.status) query.append("status", params.status);

        const res = await http.get<ApiResponse<ListUserResponse>>(
            `/users?${query.toString()}`,
        );

        return res.data;
    },

    /* =========================
        DETAIL
    ========================= */
    async detail(id: string) {
        const res = await http.get<ApiResponse<User>>(`/users/${id}`);
        return res.data;
    },

    /* =========================
        UPDATE
    ========================= */
    async update(id: string, payload: UpdateUserPayload) {
        // Payload lúc này đã bao gồm phone và address
        const res = await http.put<ApiResponse<User>>(`/users/${id}`, payload);
        return res.data;
    },

    /* =========================
        CHANGE PASSWORD
    ========================= */
    async changePassword(id: string, payload: ChangePasswordPayload) {
        const res = await http.patch<ApiResponse<{ message: string }>>(
            `/users/${id}/change-password`,
            payload,
        );
        return res.data;
    },

    /* =========================
        DELETE
    ========================= */
    async delete(id: string) {
        const res = await http.delete<ApiResponse<{ message: string }>>(
            `/users/${id}`,
        );
        return res.data;
    },

    /* =========================
        BULK DELETE
    ========================= */
    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            `/users/bulk`,
            { ids } as any,
        );
        return res.data;
    },
};
