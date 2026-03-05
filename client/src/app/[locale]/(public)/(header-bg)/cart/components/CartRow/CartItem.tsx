import { images } from "@/assets/images";
import { resolveMediaSrc } from "@/lib/image";
import { CartItem as CartItemType } from "@/services/cartService";
import { useCartStore } from "@/store/useCartStore";
import { Trash } from "lucide-react";
import Image from "next/image";

function CartItem({ item }: { item: CartItemType }) {
    const removeCart = useCartStore((state) => state.removeItem);

    async function handleRemove() {
        try {
            await removeCart(item.product_id, item?.id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center gap-6">
            <Image
                className="h-30 w-30 object-cover"
                width={200}
                height={200}
                alt="product"
                src={resolveMediaSrc(item.product.thumbnail)}
            />
            <div>
                <h2 className="mb-4">{item.product.title}</h2>
                <span
                    className="inline-flex cursor-pointer items-center gap-2 font-medium hover:text-red-500"
                    onClick={handleRemove}
                >
                    <Trash size={20} /> Xóa
                </span>
            </div>
        </div>
    );
}

export default CartItem;
