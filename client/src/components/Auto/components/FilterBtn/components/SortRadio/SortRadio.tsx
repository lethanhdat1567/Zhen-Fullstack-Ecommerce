"use client";

import { SortType } from "@/components/Auto/AutoBanner";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";

function SortFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sort = (searchParams.get("sort") as SortType) || "latest";

    function updateSort(value: SortType) {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "latest") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    return (
        <div>
            <p className="mb-3 text-sm font-medium">Sắp xếp theo</p>

            <RadioGroup
                value={sort}
                onValueChange={(value) => updateSort(value as SortType)}
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="latest" id="latest" />
                    <Label htmlFor="latest">Mới nhất</Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem value="oldest" id="oldest" />
                    <Label htmlFor="oldest">Cũ nhất</Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem value="price_asc" id="price_asc" />
                    <Label htmlFor="price_asc">Giá: Thấp → Cao</Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem value="price_desc" id="price_desc" />
                    <Label htmlFor="price_desc">Giá: Cao → Thấp</Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem value="best_seller" id="best_seller" />
                    <Label htmlFor="best_seller">Bán chạy</Label>
                </div>
            </RadioGroup>
        </div>
    );
}

export default SortFilter;
