// src/services/order-history.service.ts

import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type OrderStatus =
    | "pending"
    | "confirmed"
    | "cancelled"
    | "completed"
    | "all";

export type OrderHistoryParams = {
    status?: OrderStatus;
    lang?: string;
};

export type BookingHistory = {
    id: string;
    status: OrderStatus;
    payment_status: string;

    check_in: string;
    check_out: string;

    total_price: number;
    created_at: string;

    service: {
        id: string;
        thumbnail: string;
        title: string;
        slug: string;
    };
};

export type OrderItem = {
    quantity: number;
    price: number;

    product: {
        id: string;
        thumbnail: string;
        title: string;
        slug: string;
    };
};

export type OrderHistory = {
    id: string;
    status: OrderStatus;
    payment_status: string;

    total_amount: number;
    created_at: string;

    order_items: OrderItem[];
};

export type OrderHistoryResponse = {
    bookings: BookingHistory[];
    orders: OrderHistory[];
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const orderHistoryService = {
    async getOrderHistory(params?: OrderHistoryParams) {
        const query = new URLSearchParams();

        if (params?.status) query.append("status", params.status);
        if (params?.lang) query.append("lang", params.lang);

        const res = await http.get<ApiResponse<OrderHistoryResponse>>(
            `/order-history?${query.toString()}`,
        );

        return res.data;
    },
};
