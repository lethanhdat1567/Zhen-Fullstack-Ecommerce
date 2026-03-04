"use client";

import { cartService } from "@/services/cartService";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { items, setCart } = useCartStore();
    const { user, isInitialized } = useAuthStore();
    const hasFetched = useRef(false);
    const locale = useLocale();

    useEffect(() => {
        if (!isInitialized) return;

        const initializeCart = async () => {
            try {
                // *Is Login
                if (user) {
                    const res = await cartService.getCart(locale);

                    const cartData = res.items.map((item) => ({
                        id: item.id,
                        product_id: item.product_id,
                        quantity: Number(item.quantity),
                    }));

                    setCart(cartData, res.totalAmount);
                }
                // * Is Guest
                else {
                    if (items.length > 0 && !hasFetched.current) {
                        const res = await cartService.syncCart(items, locale);

                        const cartData = res.items.map((item) => ({
                            product_id: item.product_id,
                            quantity: Number(item.quantity),
                        }));

                        setCart(cartData, res.totalAmount);
                        hasFetched.current = true;
                    }
                }
            } catch (error) {
                console.error("Lỗi khởi tạo giỏ hàng:", error);
            }
        };

        initializeCart();
    }, [user, isInitialized]);

    return <>{children}</>;
};
