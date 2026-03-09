"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PriceRange() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const minParam = searchParams.get("minPrice");
    const maxParam = searchParams.get("maxPrice");

    const min = minParam ? Number(minParam) : 0;
    const max = maxParam ? Number(maxParam) : 500000;

    const [range, setRange] = useState<number[]>([min, max]);

    const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "₫";

    // sync khi URL thay đổi
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRange([min, max]);
    }, [minParam, maxParam]);

    function updatePrice(val: number[]) {
        const params = new URLSearchParams(searchParams.toString());

        params.set("minPrice", val[0].toString());
        params.set("maxPrice", val[1].toString());

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    return (
        <div>
            <p className="mb-3 text-sm font-medium">Khoảng giá</p>

            <div className="grid gap-3">
                <div className="flex items-center justify-between text-sm">
                    <span>{formatPrice(range[0])}</span>
                    <span className="text-muted-foreground">
                        {formatPrice(range[1])}
                    </span>
                </div>

                <Slider
                    value={range}
                    onValueChange={setRange} // update UI realtime
                    onValueCommit={updatePrice} // update URL khi thả
                    min={0}
                    max={1000000}
                    step={1000}
                    className="cursor-pointer"
                />
            </div>
        </div>
    );
}

export default PriceRange;
