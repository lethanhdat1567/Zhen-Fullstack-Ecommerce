"use client";

import CartRow from "@/app/[locale]/(public)/(minimal-header)/cart/components/CartRow/CartRow";
import AutoBanner from "@/components/Auto/AutoBanner";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import { CartItem, cartService } from "@/services/cartService";
import { useCartStore } from "@/store/useCartStore";
import { cartUtils } from "@/utils/cartUtils";
import { ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function CartPage() {
    const t = useTranslations("Cart");
    const locale = useLocale();
    const cartItems = useCartStore((state) => state.items);
    const [carts, setCarts] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const fetchCarts = async () => {
        try {
            const res = await cartService.syncCart(cartItems, locale);

            setCarts(res.items);
            setTotal(res.totalAmount);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCarts();
    }, [cartItems]);

    return (
        <div className="mb-10 min-h-[76vh] md:mb-20">
            <AutoBanner
                breadcrumbData={[
                    {
                        title: t("breadcrumb"),
                        href: "/cart",
                    },
                ]}
                hideBanner
            />
            {cartItems.length <= 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-12 text-center md:py-20">
                    <div className="mb-4 rounded-full bg-neutral-100 p-6 text-neutral-400 md:mb-6 md:p-8">
                        <ShoppingBag
                            className="h-10 w-10 md:h-16 md:w-16"
                            strokeWidth={1}
                        />
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-neutral-800 md:text-xl">
                        {t("emptyTitle")}
                    </h3>

                    <p className="mb-8 max-w-md text-xs text-neutral-500 italic md:text-sm">
                        {t("emptyDesc")}
                    </p>
                </div>
            ) : (
                <div className="container px-4">
                    <div className="overflow-x-auto">
                        <Table className="min-w-[600px] md:min-w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-sm md:text-base">
                                        {t("table.info")}
                                    </TableHead>
                                    <TableHead className="text-sm md:text-base">
                                        {t("table.price")}
                                    </TableHead>
                                    <TableHead className="text-sm md:text-base">
                                        {t("table.quantity")}
                                    </TableHead>
                                    <TableHead className="text-right text-sm md:text-base">
                                        {t("table.total")}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {carts.map((cart) => (
                                    <CartRow
                                        key={cart.product_id}
                                        cart={cart}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-8 ml-auto flex w-full flex-col items-end md:mt-10 md:w-sm">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-base md:text-lg">{t("total")}</p>
                            <p className="text-lg font-semibold text-(--primary-color) md:text-xl">
                                {cartUtils.formatCurrency(total)}
                            </p>
                        </div>
                        <Link href="/checkout" className="mt-4 w-full">
                            <Button className="w-full rounded-sm bg-(--primary-color) py-5! text-sm md:py-6! md:text-base">
                                {t("textBtn")}
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
