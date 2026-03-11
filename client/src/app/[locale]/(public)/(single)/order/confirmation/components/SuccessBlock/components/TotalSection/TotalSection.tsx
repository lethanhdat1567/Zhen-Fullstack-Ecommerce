"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface TotalSectionProps {
    total: number;
}

function TotalSection({ total }: TotalSectionProps) {
    const t = useTranslations("OrderConfirmation.success");

    const shipping = 0;
    const subtotal = total - shipping;

    // Giữ nguyên format theo yêu cầu UI của bạn
    const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("summaryTitle")}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex justify-between text-base">
                    <span className="text-gray-500">
                        {t("summarySubtotal")}
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-base">
                    <span className="text-gray-500">
                        {t("summaryShipping")}
                    </span>
                    <span className="font-medium text-green-600">
                        {t("summaryShippingFree")}
                    </span>
                </div>

                <div className="flex justify-between border-t pt-3 text-lg font-semibold">
                    <span>{t("summaryTotal")}</span>
                    <span className="text-green-600">{formatPrice(total)}</span>
                </div>

                <Button className="mt-2 w-full">
                    {t("historyButton")} <ChevronRight />
                </Button>
            </CardContent>
        </Card>
    );
}

export default TotalSection;
