import { images } from "@/assets/images";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

function CartHeaderItem() {
    return (
        <div className="flex items-start justify-between gap-4 border-b p-2 text-black">
            <div className="flex items-center gap-4">
                <Image
                    className="h-20 w-20 object-cover"
                    width={200}
                    height={200}
                    alt="product"
                    src={images.fallback}
                />
                <div>
                    <h3 className="mb-1 text-sm font-medium">Product</h3>
                    <p className="mb-0.5 text-sm">Số lượng</p>
                    <div className="flex items-center justify-start border">
                        <span className="flex-1 border-r p-2">
                            <Plus size={12} />
                        </span>
                        <span className="flex-1 border-r px-2 text-sm">2</span>
                        <span className="flex-1 p-2">
                            <Minus size={12} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="pr-1 text-right">
                <span className="mb-1.5 flex cursor-pointer items-center justify-end gap-1 text-sm font-medium hover:text-red-500">
                    <Trash size={16} /> Xóa
                </span>
                <p className="text-md font-semibold text-(--primary-color)">
                    1.000.000 VND
                </p>
            </div>
        </div>
    );
}

export default CartHeaderItem;
