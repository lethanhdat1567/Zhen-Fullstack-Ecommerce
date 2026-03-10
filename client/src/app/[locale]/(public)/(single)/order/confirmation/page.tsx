"use client";

import ErrorBlock from "@/app/[locale]/(public)/(single)/order/confirmation/components/ErrorBlock/ErrorBlock";
import SuccessBlock from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/SuccessBlock";
import { orderService } from "@/services/orderService";
import { useCartStore } from "@/store/useCartStore";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type OrderConfirmItem = {
    id: string;
    title: string;
    thumbnail: string;
    quantity: number;
    price: number;
    total: number;
};

export type OrderConfirmationResult = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    note?: string;

    paymentMethod: string;
    paymentStatus: string;

    totalAmount: number;

    items: OrderConfirmItem[];
};

function Confirmation() {
    const locale = useLocale();
    const searchParams = useSearchParams();
    const clearCart = useCartStore((state) => state.clearCart);
    const [order, setOrder] = useState<OrderConfirmationResult>();

    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");
    const type = searchParams.get("type");

    const fetchOrder = async () => {
        if (!orderId) return;
        try {
            if (type === "product") {
                const res = await orderService.getOrderDetail(orderId, locale);
                const result: OrderConfirmationResult = {
                    id: res.id,
                    fullName: res.full_name,
                    email: res.email,
                    phone: res.phone_number,
                    address: res.shipping_address,
                    note: res.note,
                    paymentMethod: res.payment_method,
                    paymentStatus: res.payment_status,
                    totalAmount: Number(res.total_amount),

                    items: res.order_items.map((item: any) => ({
                        id: item.id,
                        title: item.product.title,
                        thumbnail: item.product.thumbnail,
                        quantity: item.quantity,
                        price: Number(item.price),
                        total: Number(item.price) * item.quantity,
                    })),
                };

                setOrder(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchOrder();
    }, [orderId]);

    useEffect(() => {
        if (status === "success" && type === "product" && orderId) {
            clearCart();
        }
    }, [status, clearCart]);

    if (!orderId) return <ErrorBlock />;

    if (!order) return null;

    return (
        <div>
            {status === "success" && <SuccessBlock order={order} />}
            {status === "error" && <ErrorBlock />}
        </div>
    );
}

export default Confirmation;
