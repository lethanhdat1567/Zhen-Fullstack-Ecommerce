"use client";

import { images } from "@/assets/images";
import BreadcrumbBanner from "@/components/Auto/BreadcrumbBanner";
import FilterBtn from "@/components/Auto/components/FilterBtn/FilterBtn";
import Image from "next/image";

export type SortType =
    | "latest"
    | "oldest"
    | "price_asc"
    | "price_desc"
    | "best_seller";

export type FilterValues = {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: SortType;
};
type Props = {
    breadcrumbData: {
        title: string;
        href: string;
    }[];
    hideBanner?: boolean;
    isFilter?: boolean;
};

function AutoBanner({
    breadcrumbData = [],
    hideBanner = false,
    isFilter = false,
}: Props) {
    return (
        <div className="mb-10 w-full">
            {!hideBanner && (
                <div className="relative h-100 w-screen">
                    <Image
                        src={images.DSC5622}
                        alt="ZHEN"
                        height={420}
                        priority
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            <div className="container mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <BreadcrumbBanner breadcrumbData={breadcrumbData} />
                {isFilter && <FilterBtn />}
            </div>
        </div>
    );
}

export default AutoBanner;
