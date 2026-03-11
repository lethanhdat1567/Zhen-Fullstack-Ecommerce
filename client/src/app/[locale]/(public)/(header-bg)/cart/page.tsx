"use client";

import CartRow from "@/app/[locale]/(public)/(header-bg)/cart/components/CartRow/CartRow";
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
        <div className="mb-20 pt-4">
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
                <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
                    {/* Icon lớn và mờ để tạo điểm nhấn thị giác */}
                    <div className="mb-6 rounded-full bg-neutral-100 p-8 text-neutral-400">
                        <ShoppingBag size={64} strokeWidth={1} />
                    </div>

                    {/* Thông báo chính */}
                    <h3 className="mb-2 text-xl font-semibold text-neutral-800">
                        {t("emptyTitle")}
                    </h3>

                    {/* Gợi ý */}
                    <p className="mb-8 max-w-md text-sm text-neutral-500 italic">
                        {t("emptyDesc")}
                    </p>
                </div>
            ) : (
                <div className="container">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("table.info")}</TableHead>
                                <TableHead>{t("table.price")}</TableHead>
                                <TableHead>{t("table.quantity")}</TableHead>
                                <TableHead className="text-right">
                                    {t("table.total")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {carts.map((cart) => (
                                <CartRow key={cart.product_id} cart={cart} />
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-10 ml-auto flex w-sm flex-col items-end">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-lg">{t("total")}</p>
                            <p className="text-xl font-semibold text-(--primary-color)">
                                {cartUtils.formatCurrency(total)}
                            </p>
                        </div>
                        <Link href="/checkout" className="mt-4 w-full">
                            <Button className="w-full rounded-sm bg-(--primary-color) py-6!">
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
