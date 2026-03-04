"use client";

import CartInfo from "@/app/[locale]/(public)/(single)/checkout/components/CartInfo/CartInfo";
import FormInfo from "@/app/[locale]/(public)/(single)/checkout/components/FormInfo/FormInfo";
import PayMethod from "@/app/[locale]/(public)/(single)/checkout/components/PayMethod/PayMethod";
import { checkoutSchema } from "@/app/[locale]/(public)/(single)/checkout/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

function CheckoutPage() {
    const form = useForm<z.infer<typeof checkoutSchema>>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            full_name: "",
            email: "",
            phone_number: "",
            shipping_address: "",
            payment_method: "vnpay",
            note: "",
            items: [],
        },
    });

    return (
        <div className="grid h-screen grid-cols-12 gap-6">
            <div className="col-span-8">
                <div className="py-4 pl-36 text-2xl font-semibold text-(--primary-color)">
                    ZHEN TEMPLATE
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="pl-36">
                        <h2 className="mb-4 text-lg font-semibold">
                            Thông tin nhận hàng
                        </h2>
                        <FormInfo form={form} />
                    </div>
                    <PayMethod />
                </div>
            </div>
            <div className="col-span-4 h-full border-l bg-neutral-100 pr-20 pl-10">
                <CartInfo />
            </div>
        </div>
    );
}

export default CheckoutPage;
