"use client";
import { Minus, Plus } from "lucide-react";

type QtyProps = {
    qty: number;
    setQty: (val: number) => void;
    stock: number;
};

export function QuantitySelector({ qty, setQty, stock }: QtyProps) {
    return (
        <div className="inline-flex items-center overflow-hidden rounded-tl-3xl rounded-br-3xl border border-[#999999]">
            <button
                onClick={() => {
                    if (qty > 1) setQty(qty - 1);
                }}
                className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center text-[#999999] disabled:opacity-30"
                disabled={qty <= 1}
            >
                <Minus size={15} />
            </button>

            <div className="flex h-[50px] w-[35px] items-center justify-center text-[15px] font-medium">
                {qty}
            </div>

            <button
                onClick={() => {
                    if (qty < stock) setQty(qty + 1);
                }}
                className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center text-[#999999] disabled:opacity-30"
                disabled={qty >= stock}
            >
                <Plus size={15} />
            </button>
        </div>
    );
}
