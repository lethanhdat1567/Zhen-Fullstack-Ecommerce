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
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative h-14 w-14">
                    <Image
                        alt="pr"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                        src={resolveMediaSrc(thumbnail)}
                    />
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-(--primary-color) text-xs text-white">
                        {quantity}
                    </div>
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
            </div>
            <p className="text-md font-medium">
                {cartUtils.formatCurrency(Number(price))}
            </p>
        </div>
    );
}

export default CartInfoItem;
