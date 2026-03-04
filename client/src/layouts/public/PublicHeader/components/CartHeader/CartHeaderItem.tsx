import { Button } from "@/components/ui/button";
import { resolveMediaSrc } from "@/lib/image";
import { CartItem } from "@/services/cartService";
import { useCartStore } from "@/store/useCartStore";
import { cartUtils } from "@/utils/cartUtils";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
    item: CartItem;
};

function CartHeaderItem({ item }: Props) {
    const updateCartItem = useCartStore((state) => state.updateQuantity);
    const removeCartItem = useCartStore((state) => state.removeItem);

    if (!item) return;

    async function handleIncrement() {
        // 1. Check ngay lập tức tại Frontend
        if (item.quantity >= item.product.stock) {
            toast.error(
                `Rất tiếc, chỉ còn ${item.product.stock} sản phẩm trong kho`,
            );
            return;
        }

        try {
            await updateCartItem(item.product_id, item?.id, item.quantity + 1);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Không thể tăng số lượng",
            );
        }
    }

    async function handleMinus() {
        if (item.quantity > 1) {
            await updateCartItem(item.product_id, item?.id, item.quantity - 1);
        }
    }

    async function handleRemove() {
        try {
            await removeCartItem(item.product_id, item?.id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-start justify-between gap-4 border-b p-2 text-black">
            <div className="flex items-center gap-4">
                <Image
                    className="h-20 w-20 object-cover"
                    width={200}
                    height={200}
                    alt="product"
                    src={resolveMediaSrc(item.product.thumbnail)}
                />
                <div>
                    <h3 className="mb-1 text-sm font-medium">
                        {item.product.title}
                    </h3>
                    <p className="mb-0.5 text-sm">Số lượng</p>
                    <div className="flex items-center justify-start border">
                        <Button
                            variant={"outline"}
                            className="flex-1 cursor-pointer border-r p-2"
                            onClick={handleIncrement}
                        >
                            <Plus size={12} />
                        </Button>
                        <Button
                            variant={"outline"}
                            className="cursor-default text-black! select-none hover:bg-white"
                        >
                            {item.quantity}
                        </Button>
                        <Button
                            variant={"outline"}
                            className="flex-1 cursor-pointer p-2"
                            onClick={handleMinus}
                        >
                            <Minus size={12} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="pr-1 text-right">
                <span
                    className="mb-1.5 flex cursor-pointer items-center justify-end gap-1 text-sm font-medium hover:text-red-500"
                    onClick={handleRemove}
                >
                    <Trash size={16} /> Xóa
                </span>
                <p className="text-md font-semibold text-(--primary-color)">
                    {cartUtils.formatCurrency(cartUtils.getItemSubtotal(item))}
                </p>
            </div>
        </div>
    );
}

export default CartHeaderItem;
