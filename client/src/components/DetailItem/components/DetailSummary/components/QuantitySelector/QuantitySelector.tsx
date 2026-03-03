"use client";
import { useState } from "react";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
export function QuantitySelector() {
    const [qty, setQty] = useState(1);
    return (
        <div className="inline-flex items-center overflow-hidden rounded-tl-3xl rounded-br-3xl border border-[#999999]">
            {/* minus */}
            <button
                onClick={() => setQty(qty + 1)}
                className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center text-[#999999]"
            >
                <Plus size={15} />
            </button>

            {/* number */}
            <div className="flex h-[50px] w-[35px] items-center justify-center text-[15px] font-medium">
                {qty}
            </div>

            {/* plus */}
            <button
                onClick={() => {
                    if (qty > 1) setQty(qty - 1);
                }}
                className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center text-[#999999]"
            >
                <Minus size={15} />
            </button>
        </div>
    );
}
