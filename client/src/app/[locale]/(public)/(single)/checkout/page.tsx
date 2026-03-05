"use client";

import CartInfo from "@/app/[locale]/(public)/(single)/checkout/components/CartInfo/CartInfo";
import FormInfo from "@/app/[locale]/(public)/(single)/checkout/components/FormInfo/FormInfo";
import PayMethod from "@/app/[locale]/(public)/(single)/checkout/components/PayMethod/PayMethod";
import { checkoutSchema } from "@/app/[locale]/(public)/(single)/checkout/schema";
import { useRouter } from "@/i18n/navigation";
import { useRouter as useRouterOriginal } from "next/navigation";
import { CartItem, cartService } from "@/services/cartService";
import { orderService } from "@/services/orderService";
import { useCartStore } from "@/store/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

function CheckoutPage() {
    const [products, setProducts] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const locale = useLocale();
    const router = useRouter();
    const routerOriginal = useRouterOriginal();

    const carts = useCartStore((state) => state.items);
    const form = useForm<z.infer<typeof checkoutSchema>>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            full_name: "Lê Thành Đạt",
            email: "dat.dev@gmail.com",
            phone_number: "0901234567",
            shipping_address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
            payment_method: "cod",
            note: "Giao giờ hành chính",
            items: [
                {
                    product_id: "1",
                    quantity: 1,
                },
            ],
        },
    });

    const syncProduct = async () => {
        try {
            const res = await cartService.syncCart(carts, locale);
            const itemsData = res.items.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                cart_item_id: item.id,
            }));

            form.setValue("items", itemsData);
            setTotal(res.totalAmount);
            setProducts(res.items);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
        try {
            const res = await orderService.checkout(data as any);
            if (res.paymentUrl) {
                routerOriginal.push(res.paymentUrl);
            } else {
                router.push("/order/confirmation");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        syncProduct();
    }, [carts]);

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid h-screen grid-cols-12 gap-6"
        >
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
                    <PayMethod form={form} />
                </div>
            </div>
            <div className="col-span-4 h-full border-l bg-neutral-100 pr-20 pl-10">
                <CartInfo carts={products} total={total} />
            </div>
        </form>
    );
}

export default CheckoutPage;
