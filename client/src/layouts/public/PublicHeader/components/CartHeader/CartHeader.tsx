import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import CartHeaderItem from "@/layouts/public/PublicHeader/components/CartHeader/CartHeaderItem";
import { CartItem, cartService } from "@/services/cartService";
import { useCartStore } from "@/store/useCartStore";
import { cartUtils } from "@/utils/cartUtils";
import { ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function CartHeader() {
    const t = useTranslations("Header.cart");
    const locale = useLocale();
    const cartItems = useCartStore((state) => state.items);
    const [carts, setCarts] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const fetchCarts = async () => {
        try {
            const res = await cartService.syncCart(cartItems, locale);

            setTotalAmount(res.totalAmount);
            setCarts(res.items);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCarts();
    }, [cartItems]);

    return (
        <div className="group/cart relative block">
            <Link href="/cart" className="relative">
                <Button
                    variant="ghost"
                    size={"icon-lg"}
                    className="rounded-full"
                >
                    <ShoppingBag size={30} />
                </Button>

                {cartItems.length > 0 && (
                    <div className="absolute -top-3 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px]">
                        {cartItems.length}
                    </div>
                )}
            </Link>

            <div className="invisible absolute right-0 bottom-0 z-999 w-100 translate-y-[96%] scale-95 border bg-white text-black opacity-0 shadow transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cart:visible group-hover/cart:translate-y-full group-hover/cart:scale-100 group-hover/cart:opacity-100">
                {carts.length === 0 ? (
                    <div className="p-4 text-sm italic">{t("emptyCart")}</div>
                ) : (
                    <>
                        <div
                            className="max-h-97.5 overflow-y-auto"
                            data-lenis-prevent
                        >
                            {carts.map((item) => (
                                <CartHeaderItem
                                    key={item.product_id}
                                    item={item}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-between px-2 py-5">
                            <span className="flex text-lg font-medium">
                                {t("total")}:
                            </span>
                            <p className="text-lg font-semibold text-(--primary-color)">
                                {cartUtils.formatCurrency(totalAmount)}
                            </p>
                        </div>
                        <div className="w-full p-2">
                            <Button className="w-full rounded-full bg-(--primary-color) py-5!">
                                {t("checkoutBtn")}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CartHeader;
