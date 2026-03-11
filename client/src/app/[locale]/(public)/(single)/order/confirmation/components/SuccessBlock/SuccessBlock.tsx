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
        <div className="container pt-10">
            {/* Header */}
            <div className="mx-auto flex w-2xl flex-col items-center gap-4">
                <Logo />
                <h1 className="text-center text-4xl font-semibold text-green-700">
                    {labels.title}
                </h1>
            </div>

            <div className="mt-10 grid grid-cols-12 gap-10">
                {/* Order info */}
                <Card className="col-span-8">
                    <CardHeader>
                        <CardTitle>{labels.description}</CardTitle>
                        <CardDescription>
                            {t("emailConfirmation")}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <OrderInfo items={infoItems} />

                        <Separator className="my-4" />

                        <ItemSection items={order.items} />
                    </CardContent>
                </Card>

                {/* Total */}
                <div className="col-span-4">
                    <TotalSection total={order.totalAmount} />
                </div>
            </div>
        </div>
    );
}

export default SuccessBlock;
