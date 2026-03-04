import { http } from "@/lib/http/http";

/* =========================
    TYPES
========================= */

export type ProductInCart = {
    id: string;
    price: string;
    sale_price: string | null;
    stock: number;
    thumbnail: string;
    title: string;
    slug: string;
};

export type CartItem = {
    id?: string;
    product_id: string;
    quantity: number;
    product: ProductInCart;
};

export type CartData = {
    items: CartItem[];
    totalAmount: number;
};

export type ApiResponse<T> = {
    status: string;
    message?: string;
    data: T;
};

/* =========================
    SERVICE
========================= */

export const cartService = {
    /**
     * Lấy giỏ hàng từ Database (Dành cho User đã login)
     */
    async getCart(lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<CartData>>(`/cart${query}`);
        return res.data;
    },

    /**
     * Lấy thông tin chi tiết giỏ hàng cho khách (Dành cho Guest)
     * Truyền vào mảng items từ Zustand Store (chỉ có id và quantity)
     */
    async syncCart(
        items: { product_id: string; quantity: number }[],
        lang?: string,
    ) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.post<ApiResponse<CartData>>(
            `/cart/sync${query}`,
            { items },
        );
        return res.data;
    },

    /**
     * Thêm sản phẩm vào giỏ hàng (Server-side)
     */
    async addToCart(payload: { product_id: string; quantity: number }) {
        const res = await http.post<ApiResponse<any>>("/cart/add", payload);
        return res.data;
    },

    /**
     * Gộp giỏ hàng Local vào Database sau khi Login
     */
    async mergeCart(
        items: { product_id: string; quantity: number }[],
        lang?: string,
    ) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.post<ApiResponse<CartData>>(
            `/cart/merge${query}`,
            { items },
        );
        return res.data;
    },

    /**
     * Cập nhật số lượng sản phẩm (Server-side)
     */
    async updateQuantity(cart_item_id: string, quantity: number) {
        const res = await http.patch<ApiResponse<any>>(
            "/cart/update-quantity",
            {
                cart_item_id,
                quantity,
            },
        );
        return res.data;
    },

    /**
     * Xóa 1 sản phẩm khỏi giỏ hàng (Server-side)
     */
    async removeItem(cart_item_id: string) {
        const res = await http.delete<ApiResponse<any>>(
            `/cart/${cart_item_id}`,
        );
        return res.data;
    },

    /**
     * Xóa sạch giỏ hàng (Server-side)
     */
    async clearCart() {
        const res = await http.delete<ApiResponse<any>>("/cart/clear");
        return res.data;
    },
};
