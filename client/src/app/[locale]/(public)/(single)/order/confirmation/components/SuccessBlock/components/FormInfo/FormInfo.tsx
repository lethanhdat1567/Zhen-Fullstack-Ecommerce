"use client";

import { useTranslations } from "next-intl";
import React from "react";

interface InfoItem {
    label: string;
    value: React.ReactNode;
}

interface ProductInfoProps {
    items: InfoItem[];
}

function ProductInfo({ items }: ProductInfoProps) {
    const t = useTranslations("OrderConfirmation.success");

    return (
        <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4 md:p-5">
            <h3 className="mb-4 text-base font-bold text-gray-900 md:text-lg">
                {t("personalInfoTitle")}
            </h3>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-1 border-b border-gray-200 pb-3 last:border-0 sm:border-0 sm:pb-0"
                    >
                        <h4 className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                            {item.label}
                        </h4>
                        <div className="text-sm font-semibold text-gray-800 md:text-base">
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductInfo;
