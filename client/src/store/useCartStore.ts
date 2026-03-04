import { cartService } from "@/services/cartService";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartType = {
    product_id: string;
    quantity: number;
    id?: string;
};

interface CartState {
    items: CartType[];
    totalAmount: number;
    setCart: (items: any[], totalAmount: number) => void;
    addItem: (
        productId: string,
        quantity: number,
        stock: number,
    ) => Promise<void>;
    updateQuantity: (
        productId: string,
        cartItemId: string | undefined,
        newQuantity: number,
    ) => Promise<void>;
    removeItem: (
        productId: string,
        cartItemId: string | undefined,
    ) => Promise<void>;
    clearCart: () => void;
}

// Helper xử lý map data thống nhất từ Server trả về
const mapCartData = (apiItems: any[]) =>
    apiItems.map((item) => ({
        id: item?.id,
        product_id: item.product_id,
        quantity: Number(item.quantity),
    }));

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => {
            // Helper để fetch và update store cho trường hợp đã Login
            const refreshServerCart = async () => {
                const res = await cartService.getCart();
                set({
                    items: mapCartData(res?.items),
                    totalAmount: res?.totalAmount,
                });
            };

            return {
                items: [],
                totalAmount: 0,

                setCart: (items, totalAmount) =>
                    set({
                        items: mapCartData(items),
                        totalAmount,
                    }),

                addItem: async (
                    productId: string,
                    quantity: number,
                    stock: number,
                ) => {
                    const { user } = useAuthStore.getState();
                    const { items } = get();

                    // 1. Tìm sản phẩm hiện tại trong giỏ (nếu có)
                    const existing = items.find(
                        (i) => i.product_id === productId,
                    );
                    const currentQty = existing ? existing.quantity : 0;

                    // 2. CHECK STOCK (Dùng chung cho cả User và Guest)
                    if (currentQty + quantity > stock) {
                        toast.error(
                            `Rất tiếc, chỉ còn ${stock} sản phẩm trong kho`,
                        );
                        return; // Dừng lại ở đây, không làm gì thêm nữa
                    }

                    // 3. Xử lý Logic sau khi đã vượt qua bước Check Stock
                    if (user) {
                        // USER: Gọi API và đồng bộ
                        try {
                            await cartService.addToCart({
                                product_id: productId,
                                quantity,
                            });
                            await refreshServerCart(); // Hàm helper refresh mà chúng ta đã thống nhất
                            toast.success("Đã thêm vào giỏ hàng");
                        } catch (error: any) {
                            toast.error(
                                error.response?.data?.message || "Lỗi hệ thống",
                            );
                        }
                    } else {
                        // GUEST: Cập nhật local
                        const newItems = existing
                            ? items.map((i) =>
                                  i.product_id === productId
                                      ? {
                                            ...i,
                                            quantity: i.quantity + quantity,
                                        }
                                      : i,
                              )
                            : [...items, { product_id: productId, quantity }];

                        set({ items: newItems });
                        toast.success("Đã thêm vào giỏ hàng");
                    }
                },

                updateQuantity: async (productId, cartItemId, newQuantity) => {
                    const { user } = useAuthStore.getState();
                    if (user && cartItemId) {
                        await cartService.updateQuantity(
                            cartItemId,
                            newQuantity,
                        );

                        const res = await cartService.getCart();

                        if (res) {
                            set({
                                items: mapCartData(res.items),
                                totalAmount: res.totalAmount,
                            });
                        }
                    } else {
                        set({
                            items: get().items.map((i) =>
                                i.product_id === productId
                                    ? { ...i, quantity: newQuantity }
                                    : i,
                            ),
                        });
                    }
                },

                removeItem: async (productId, cartItemId) => {
                    const { user } = useAuthStore.getState();

                    if (user && cartItemId) {
                        await cartService.removeItem(cartItemId);
                        await refreshServerCart();
                    } else {
                        set({
                            items: get().items.filter(
                                (i) => i.product_id !== productId,
                            ),
                        });
                    }
                },

                clearCart: () => set({ items: [], totalAmount: 0 }),
            };
        },
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
