import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type BookingQueryParams = {
    search?: string;
    status?: "pending" | "confirmed" | "cancelled" | "completed" | null;
    page?: number;
    limit?: number;
    lang?: string;
};

export type CreateBookingPayload = {
    service_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    guests: number;
    check_in: Date;
    check_out: Date;
    note?: string;
    payment_method?: "cod" | "vnpay";
};

export type UpdateBookingPayload = {
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    status?: "pending" | "confirmed" | "cancelled" | "completed";
    payment_status?: string;
    note?: string;
};

export type Booking = {
    id: string;
    service_id: string;

    customer_name: string;
    customer_email: string;
    customer_phone: string;

    guest_count: number;

    check_in: Date;
    check_out: Date;

    total_price: number;

    status: "pending" | "confirmed" | "cancelled" | "completed";
    payment_status?: string;
    payment_url?: string;
    payment_method: string;

    note?: string;

    created_at: string;
    updated_at: string;

    service: {
        id: string;
        capacity: number;
        price: number;
        sale_price?: string;
        thumbnail?: string;
        title?: string;
        description?: string;
        content?: string;
    };
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const bookingService = {
    async create(payload: CreateBookingPayload) {
        const res = await http.post<ApiResponse<Booking>>("/bookings", payload);
        return res.data;
    },

    async update(id: string, payload: UpdateBookingPayload) {
        const res = await http.patch<ApiResponse<Booking>>(
            `/bookings/${id}`,
            payload,
        );

        return res.data;
    },

    async list(params?: BookingQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.status) query.append("status", params.status);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.lang) query.append("lang", params.lang);

        const queryString = query.toString();
        const url = queryString ? `/bookings?${queryString}` : "/bookings";

        const res = await http.get<ApiResponse<any>>(url, {
            cache: "no-cache",
        });

        return res.data;
    },

    async getById(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";

        const res = await http.get<ApiResponse<Booking>>(
            `/bookings/${id}${query}`,
        );

        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(`/bookings/${id}`);
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            "/bookings/bulk",
            {
                ids,
            },
        );

        return res.data;
    },
};
