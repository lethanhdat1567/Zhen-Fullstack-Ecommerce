"use client";

import CartInfoItem from "@/app/[locale]/(public)/(single)/checkout/components/CartInfo/components/CartInfoItem/CartInfoItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { CartItem } from "@/services/cartService";
import { cartUtils } from "@/utils/cartUtils";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = { carts: CartItem[]; total: number };

function CartInfo({ carts, total }: Props) {
    const t = useTranslations("Checkout");

    return (
        <div className="flex h-full flex-col">
            <h2 className="mb-2 border-b py-2 text-lg font-semibold md:mb-4 md:py-4 lg:border-none">
                {t("orderSummary", { count: carts.length })}
            </h2>

            {/* Scrollable area for items on desktop, auto on mobile */}
            <div className="custom-scrollbar flex max-h-[40vh] flex-col gap-4 overflow-y-auto pr-2 lg:max-h-[50vh]">
                {carts.map((item) => (
                    <CartInfoItem
                        price={item.product.sale_price || item.product.price}
                        quantity={item.quantity}
                        thumbnail={item.product.thumbnail}
                        title={item.product.title}
                        key={item.id}
                    />
                ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm font-medium md:mt-10 md:gap-4">
                <div className="flex items-center justify-between">
                    <p className="text-neutral-600">{t("subtotal")}</p>
                    <p>{cartUtils.formatCurrency(total)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-neutral-600">{t("shippingFee")}</p>
                    <p className="font-normal text-green-600">
                        {t("shippingFree")}
                    </p>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                    <p className="text-lg">{t("total")}</p>
                    <p className="text-xl font-bold text-(--primary-color)">
                        {cartUtils.formatCurrency(total)}
                    </p>
                </div>
            </div>

            {/* Action buttons - Fixed at bottom on mobile might be better, but keeping flow for now */}
            <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 md:flex-row md:gap-0">
                <Link
                    href={"/cart"}
                    className="flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors hover:text-black hover:underline"
                >
                    <ChevronLeft size={16} /> {t("backToCart")}
                </Link>
                <Button
                    className="w-full bg-(--primary-color) px-8 py-6 text-base hover:opacity-90 md:w-auto md:py-2 md:text-sm"
                    size={"lg"}
                    type="submit"
                >
                    {t("orderButton")}
                </Button>
            </div>
        </div>
    );
}

export default CartInfo;
