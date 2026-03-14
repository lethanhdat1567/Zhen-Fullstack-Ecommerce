"use client";

import Logo from "@/components/Logo/Logo";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import OrderInfo from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/components/FormInfo/FormInfo";
import { Separator } from "@/components/ui/separator";
import ItemSection from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/components/ProductSection/ProductSection";
import TotalSection from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/components/TotalSection/TotalSection";
import { OrderConfirmationResult } from "@/app/[locale]/(public)/(single)/order/confirmation/page";
import { useTranslations } from "next-intl";

interface SuccessBlockProps {
    order: OrderConfirmationResult;
}

function SuccessBlock({ order }: SuccessBlockProps) {
    const t = useTranslations("OrderConfirmation.success");

    const paymentMethodMap: Record<string, string> = {
        cod: t("methodCod"),
        vnpay: t("methodVnpay"),
        momo: t("methodMomo"),
    };

    const paymentStatusMap: Record<string, string> = {
        paid: t("statusPaid"),
        unpaid: t("statusUnpaid"),
        failed: t("statusFailed"),
    };

    const orderLabelMap = {
        product: {
            title: t("productTitle"),
            description: t("productDescription"),
        },
        service: {
            title: t("serviceTitle"),
            description: t("serviceDescription"),
        },
    };

    const labels = orderLabelMap[order.type as keyof typeof orderLabelMap];

    const infoItems = [
        { label: t("labelEmail"), value: order.email },
        { label: t("labelPhone"), value: order.phone },

        ...(order.type === "product" && order.address
            ? [{ label: t("labelAddress"), value: order.address }]
            : []),

        {
            label: t("labelPaymentMethod"),
            value: paymentMethodMap[order.paymentMethod] || order.paymentMethod,
        },
        {
            label: t("labelStatus"),
            value: paymentStatusMap[order.paymentStatus] || order.paymentStatus,
        },
    ];

    return (
        <div className="container px-4 py-6 md:py-10">
            {/* Header */}
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4">
                <Logo />
                <h1 className="text-center text-2xl font-semibold text-green-700 md:text-4xl">
                    {labels.title}
                </h1>
            </div>

            <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-6">
                {/* Order info */}
                <Card className="w-full">
                    <CardHeader className="px-4 py-5 md:px-6">
                        <CardTitle className="text-lg md:text-xl">
                            {labels.description}
                        </CardTitle>
                        <CardDescription>
                            {t("emailConfirmation")}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4 pb-6 md:px-6">
                        <OrderInfo items={infoItems} />

                        <Separator className="my-6" />

                        <ItemSection items={order.items} />
                    </CardContent>
                </Card>

                {/* Total Section - Hiện 1 cột bên dưới Card chính */}
                <div className="w-full">
                    <TotalSection total={order.totalAmount} />
                </div>
            </div>
        </div>
    );
}

export default SuccessBlock;
