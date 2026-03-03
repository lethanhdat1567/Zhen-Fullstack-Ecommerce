"use client";

import FormInfo from "@/app/[locale]/(public)/(single)/checkout/components/FormInfo/FormInfo";
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
                    <div>Van Chuyen</div>
                </div>
            </div>
            <div className="col-span-4 h-full border-l bg-neutral-100">
                Don hang
            </div>
        </div>
    );
}

export default CheckoutPage;
