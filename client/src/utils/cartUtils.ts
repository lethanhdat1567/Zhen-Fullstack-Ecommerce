export const cartUtils = {
    /**
     * Tính thành tiền cho 1 sản phẩm: (Giá x Số lượng)
     */
    getItemSubtotal: (item: {
        product: { price: string; sale_price?: string | null };
        quantity: number;
    }) => {
        const price = Number(
            item.product.sale_price || item.product.price || 0,
        );
        return price * item.quantity;
    },

    /**
     * Tính tổng số lượng item trong giỏ (Dùng cho Badge icon giỏ hàng)
     */
    getTotalQuantity: (items: { quantity: number }[]) => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getCartTotal: (items: any[]) => {
        return items.reduce(
            (sum, item) => sum + cartUtils.getItemSubtotal(item),
            0,
        );
    },

    /**
     * Định dạng tiền tệ VND chuyên nghiệp
     */
    formatCurrency: (amount: number | string) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(Number(amount));
    },
};
