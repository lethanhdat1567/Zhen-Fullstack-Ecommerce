"use client";

import CartInfo from "@/app/[locale]/(public)/(single)/checkout/components/CartInfo/CartInfo";
import FormInfo from "@/app/[locale]/(public)/(single)/checkout/components/FormInfo/FormInfo";
import PayMethod from "@/app/[locale]/(public)/(single)/checkout/components/PayMethod/PayMethod";
import { checkoutSchema } from "@/app/[locale]/(public)/(single)/checkout/schema";
import { useRouter } from "@/i18n/navigation";
import {
    useRouter as useRouterOriginal,
    useSearchParams,
} from "next/navigation";
import { CartItem, cartService } from "@/services/cartService";
import { orderService } from "@/services/orderService";
import { useCartStore } from "@/store/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { productService } from "@/services/productService";

function CheckoutPage() {
    const [products, setProducts] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const t = useTranslations("Checkout");
    const locale = useLocale();
    const router = useRouter();
    const routerOriginal = useRouterOriginal();
    const clearCart = useCartStore((state) => state.clearCart);
    const params = useSearchParams();
    const productId = params.get("productId");
    const quantity = params.get("quantity");

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
            items: [],
        },
    });

    const syncProduct = async () => {
        try {
            if (productId && quantity) {
                const qty = Math.max(1, Number(quantity) || 1);

                const product = await productService.getById(productId, locale);

                const price = product.sale_price || product.price;

                const item = {
                    id: product.id,
                    quantity: qty,
                    price,
                    product: {
                        id: product.id,
                        title: product.title,
                        thumbnail: product.thumbnail,
                        slug: product.slug,
                        price: product.price,
                        sale_price: product.sale_price,
                        stock: product.stock,
                    },
                };

                const itemsData = [
                    {
                        product_id: product.id,
                        quantity: qty,
                    },
                ];

                form.setValue("items", itemsData);

                setProducts([item as any]);
                setTotal(Number(price) * qty);
            } else {
                const res = await cartService.syncCart(carts, locale);

                const itemsData = res.items.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    cart_item_id: item.id,
                }));

                form.setValue("items", itemsData);
                setProducts(res.items);
                setTotal(res.totalAmount);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
        try {
            const res = await orderService.checkout(
                data as any,
                productId && quantity ? "single" : "cart",
            );
            if (res.paymentUrl) {
                routerOriginal.push(res.paymentUrl);
            } else {
                router.push(
                    `/order/confirmation?type=product&orderId=${res.order.id}&status=success`,
                );
            }

            if (!productId && !quantity) {
                clearCart();
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
                            {t("shippingInfo")}
                        </h2>
                        <FormInfo form={form} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <PayMethod form={form} />
                    </div>
                </div>
            </div>
            <div className="col-span-4 h-full border-l bg-neutral-100 pr-20 pl-10">
                <CartInfo carts={products} total={total} />
            </div>
        </form>
    );
}

export default CheckoutPage;
