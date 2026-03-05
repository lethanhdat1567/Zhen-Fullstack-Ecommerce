import CartInfoItem from "@/app/[locale]/(public)/(single)/checkout/components/CartInfo/components/CartInfoItem/CartInfoItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { CartItem } from "@/services/cartService";
import { cartUtils } from "@/utils/cartUtils";
import { ChevronLeft } from "lucide-react";

type Props = { carts: CartItem[]; total: number };

function CartInfo({ carts, total }: Props) {
    return (
        <div>
            <h2 className="mb-4 py-4 text-lg font-semibold">
                Đơn hàng ({carts.length} sản phẩm)
            </h2>
            <div className="flex flex-col gap-4">
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
            <div className="mt-10 flex flex-col gap-4 text-sm font-medium">
                <div className="flex items-center justify-between">
                    <p>Tạm tính:</p>
                    <p>{cartUtils.formatCurrency(total)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Phí vận chuyển:</p>
                    <p>Miễn phí</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <p className="text-lg">Tổng cộng</p>
                    <p className="text-lg font-semibold text-(--primary-color)">
                        {cartUtils.formatCurrency(total)}
                    </p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <Link
                    href={"/cart"}
                    className="flex items-center gap-1 text-sm font-medium hover:underline"
                >
                    <ChevronLeft size={16} /> Quay về giỏ hàng
                </Link>
                <Button
                    className="bg-(--primary-color)"
                    size={"lg"}
                    type="submit"
                >
                    Đặt hàng
                </Button>
            </div>
        </div>
    );
}

export default CartInfo;
