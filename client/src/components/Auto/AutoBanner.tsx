"use client";

import { images } from "@/assets/images";
import BreadcrumbBanner from "@/components/Auto/BreadcrumbBanner";
import Image from "next/image";

type Props = {
    breadcrumbData: {
        title: string;
        href: string;
    }[];
    hideBanner?: boolean;
};

function AutoBanner({ breadcrumbData = [], hideBanner = false }: Props) {
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

            <BreadcrumbBanner breadcrumbData={breadcrumbData} />
        </div>
    );
}

export default AutoBanner;
