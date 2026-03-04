"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/services/productService";
import { useCartStore } from "@/store/useCartStore";

type Props = {
    item: Product;
};

function AddToCartBtn({ item }: Props) {
    const [qty, setQty] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    // Hàm xử lý tăng/giảm số lượng tại chỗ
    const updateQty = (delta: number) => {
        const newQty = qty + delta;
        if (newQty >= 1 && newQty <= item.stock) {
            setQty(newQty);
        }
    };

    async function handleAddToCart() {
        await addItem(item.id, qty, item.stock);
    }

    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2.5 md:mb-7.5">
            {/* Bộ chọn số lượng (Quantity Selector) */}
            <div className="sm:ml-2.5">
                <div className="inline-flex items-center overflow-hidden rounded-tl-3xl rounded-br-3xl border border-[#999999]">
                    <button
                        type="button"
                        onClick={() => updateQty(-1)}
                        disabled={qty <= 1}
                        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center text-[#999999] transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <Minus size={15} />
                    </button>

                    <div className="flex h-[50px] w-[35px] items-center justify-center text-[15px] font-medium">
                        {qty}
                    </div>

                    <button
                        type="button"
                        onClick={() => updateQty(1)}
                        disabled={qty >= item.stock}
                        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center text-[#999999] transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <Plus size={15} />
                    </button>
                </div>
            </div>

            {/* Nút Add to Cart */}
            <button
                className="relative inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-tl-3xl rounded-br-3xl bg-(--primary-color) px-6 text-sm font-medium text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto md:h-12.5 md:px-6.75 md:text-base"
                onClick={handleAddToCart}
                disabled={item.stock <= 0}
            >
                {item.stock > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
            </button>
        </div>
    );
}

export default AddToCartBtn;
