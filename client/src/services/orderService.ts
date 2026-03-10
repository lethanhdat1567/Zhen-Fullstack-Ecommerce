import { http } from "@/lib/http/http";
import { ApiResponse } from "@/services/cartService";

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

export type GetAllOrdersParams = {
    page?: number;
    limit?: number;
    status?: string | null;
    search?: string;
};

interface OrderParams {
    status?: string;
    search?: string;
    lang?: string;
}

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
    async getOrderDetail(orderId: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<any>>(
            `/orders/${orderId}${query}`,
        );
        return res.data;
    },

    /**
     * Lấy danh sách đơn hàng của user
     */

    async getAllOrders(params?: GetAllOrdersParams) {
        const query = new URLSearchParams();

        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.status) query.append("status", params.status);
        if (params?.search) query.append("search", params.search);

        const res = await http.get<
            ApiResponse<{
                items: Order[];
                pagination: {
                    page: number;
                    limit: number;
                    total: number;
                    totalPages: number;
                };
            }>
        >(`/orders/admin/all?${query.toString()}`);

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
    async getMyOrders(params: OrderParams) {
        // 1. Tạo đối tượng URLSearchParams
        const query = new URLSearchParams();

        // 2. Thêm các field nếu chúng có giá trị
        if (params.status && params.status !== "all") {
            query.append("status", params.status);
        }

        if (params.search) {
            query.append("search", params.search);
        }

        if (params.lang) {
            query.append("lang", params.lang);
        }

        // 3. Chuyển thành chuỗi: "status=pending&search=iphone..."
        const queryString = query.toString();

        // 4. Gọi API với chuỗi đã build (đảm bảo xử lý dấu ?)
        const url = `/orders/history${queryString ? `?${queryString}` : ""}`;

        const res = await http.get<ApiResponse<Order[]>>(url);

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

    /**
     * ADMIN - Xóa 1 order
     */
    async destroy(orderId: string) {
        const res = await http.delete<ApiResponse<{ id: string }>>(
            `/orders/admin/${orderId}`,
        );

        return res.data;
    },

    /**
     * ADMIN - Xóa nhiều order
     */
    async bulkDestroy(ids: string[]) {
        const res = await http.delete<ApiResponse<{ count: number }>>(
            `/orders/admin/bulk`,
            {
                data: { ids },
            },
        );

        return res.data;
    },
    async updateStatus(orderId: string, status: string) {
        const res = await http.patch<ApiResponse<any>>(
            `/orders/admin/status/${orderId}`,
            { status },
        );

        return res.data;
    },
};
