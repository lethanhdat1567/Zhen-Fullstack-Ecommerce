"use client";

import CartRow from "@/app/[locale]/(public)/(header-bg)/cart/components/CartRow/CartRow";
import AutoBanner from "@/components/Auto/AutoBanner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

function CartPage() {
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
        <div className="mb-20">
            <AutoBanner
                breadcrumbData={[
                    {
                        title: "Giỏ hàng",
                        href: "/cart",
                    },
                ]}
            />
            {cartItems.length <= 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
                    {/* Icon lớn và mờ để tạo điểm nhấn thị giác */}
                    <div className="mb-6 rounded-full bg-neutral-100 p-8 text-neutral-400">
                        <ShoppingBag size={64} strokeWidth={1} />
                    </div>

                    {/* Thông báo chính */}
                    <h3 className="mb-2 text-xl font-semibold text-neutral-800">
                        Giỏ hàng của bạn đang rỗng
                    </h3>

                    {/* Gợi ý */}
                    <p className="mb-8 max-w-md text-sm text-neutral-500 italic">
                        Có vẻ như bạn chưa chọn được sản phẩm ưng ý. Hãy khám
                        phá thêm hàng ngàn sản phẩm thú vị nhé!
                    </p>

                    {/* Nút hành động quan trọng */}
                    <Link
                        href="/products"
                        className="rounded-tl-3xl rounded-br-3xl bg-(--primary-color) px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                        TIẾP TỤC MUA SẮM
                    </Link>
                </div>
            ) : (
                <div className="container">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12.5">
                                    <Checkbox />
                                </TableHead>
                                <TableHead>Thông tin sản phẩm</TableHead>
                                <TableHead>Đơn giá</TableHead>
                                <TableHead>Số lượng</TableHead>
                                <TableHead className="text-right">
                                    Thành tiền
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {carts.map((cart) => (
                                <CartRow key={cart.id} cart={cart} />
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-10 ml-auto flex w-sm flex-col items-end">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-lg">Tổng tiền:</p>
                            <p className="text-xl font-semibold text-(--primary-color)">
                                {cartUtils.formatCurrency(total)}
                            </p>
                        </div>
                        <Button className="mt-4 w-full rounded-sm bg-(--primary-color) py-6!">
                            Thanh toán
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
