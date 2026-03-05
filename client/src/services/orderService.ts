import { http } from "@/lib/http/http";
import { ApiResponse } from "@/services/mediaAlbumService";

/* =========================
    TYPES
========================= */

export type CheckoutItem = {
    product_id: string;
    quantity: number;
    cart_item_id?: string | null;
};

export type CheckoutPayload = {
    items: CheckoutItem[];
    paymentMethod: "cod" | "vnpay";
    fullName: string;
    phone: string;
    address: string;
    note?: string;
};

export type OrderItem = {
    id: string;
    product_id: string;
    quantity: number;
    price: string;
    product: {
        title: string;
        slug: string;
        thumbnail: string;
    };
};

export type Order = {
    id: string;
    orderCode: string;
    status: "pending" | "paid" | "failed" | "cancelled";
    paymentMethod: "cod" | "vnpay";
    totalAmount: number;
    createdAt: string;
    items: OrderItem[];
};

export type CheckoutResponse = {
    order: Order;
    paymentUrl?: string;
};

/* =========================
    SERVICE
========================= */

export const orderService = {
    /**
     * Checkout
     * - COD → tạo order
     * - VNPAY → trả về paymentUrl
     */
    async checkout(payload: CheckoutPayload) {
        const res = await http.post<ApiResponse<CheckoutResponse>>(
            "/orders/checkout",
            payload,
        );

        return res.data;
    },

    /**
     * Lấy chi tiết đơn hàng
     */
    async getOrderDetail(orderId: string) {
        const res = await http.get<ApiResponse<Order>>(`/orders/${orderId}`);
        return res.data;
    },

    /**
     * Lấy danh sách đơn hàng của user
     */
    async getMyOrders(page = 1) {
        const res = await http.get<ApiResponse<Order[]>>(
            `/orders?page=${page}`,
        );

        return res.data;
    },

    /**
     * Verify thanh toán VNPAY
     * (dùng cho page confirmation)
     */
    async verifyVnpay(query: string) {
        const res = await http.get<ApiResponse<Order>>(
            `/payments/vnpay/verify${query}`,
        );

        return res.data;
    },

    /**
     * Hủy đơn hàng
     */
    async cancelOrder(orderId: string) {
        const res = await http.post<ApiResponse<any>>(
            `/orders/${orderId}/cancel`,
        );

        return res.data;
    },
};
