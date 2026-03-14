import { resolveMediaSrc } from "@/lib/image";
import { cartUtils } from "@/utils/cartUtils";
import Image from "next/image";

type Props = {
    thumbnail: string;
    quantity: number;
    title: string;
    price: string;
};

function CartInfoItem({ thumbnail, quantity, title, price }: Props) {
    return (
        <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex flex-1 items-center gap-3 md:gap-4">
                <div className="relative h-12 w-12 shrink-0 md:h-16 md:w-16">
                    <Image
                        alt={title}
                        width={64}
                        height={64}
                        className="h-full w-full rounded-md border border-neutral-200 object-cover"
                        src={resolveMediaSrc(thumbnail)}
                    />
                    {/* Badge số lượng */}
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-500 text-[10px] text-white shadow-sm md:h-6 md:w-6 md:text-xs">
                        {quantity}
                    </div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <h3 className="line-clamp-2 text-xs leading-snug font-medium text-neutral-800 md:text-sm">
                        {title}
                    </h3>
                    {/* Hiển thị giá nhỏ dưới title trên mobile nếu cần, hoặc ẩn đi */}
                    <p className="text-[10px] text-neutral-500 md:hidden">
                        Số lượng: {quantity}
                    </p>
                </div>
            </div>

            <div className="flex-shrink-0 text-right">
                <p className="text-sm font-semibold text-neutral-900 md:text-base">
                    {cartUtils.formatCurrency(Number(price))}
                </p>
                {/* Nếu có logic giảm giá, có thể render giá gốc gạch ngang ở đây */}
            </div>
        </div>
    );
}

export default CartInfoItem;
