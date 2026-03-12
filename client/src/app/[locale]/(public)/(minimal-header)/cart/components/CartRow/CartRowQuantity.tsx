"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/services/cartService";
import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

function CartRowQuantity({ item }: { item: CartItem }) {
    const updateCartItem = useCartStore((state) => state.updateQuantity);

    if (!item) return;

    async function handleIncrement() {
        if (item.quantity >= item.product.stock) {
            toast.error(
                `Rất tiếc, chỉ còn ${item.product.stock} sản phẩm trong kho`,
            );
            return;
        }

        try {
            await updateCartItem(item.product_id, item?.id, item.quantity + 1);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Không thể tăng số lượng",
            );
        }
    }

    async function handleMinus() {
        if (item.quantity > 1) {
            await updateCartItem(item.product_id, item?.id, item.quantity - 1);
        }
    }

    return (
        <div className="flex items-center">
            <Button variant={"outline"} onClick={handleIncrement}>
                <Plus />
            </Button>
            <span className="flex h-9 w-10 items-center justify-center border-t border-b">
                {item.quantity}
            </span>
            <Button variant={"outline"} onClick={handleMinus}>
                <Minus />
            </Button>
        </div>
    );
}

export default CartRowQuantity;
