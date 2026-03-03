import { images } from "@/assets/images";
import { Trash } from "lucide-react";
import Image from "next/image";

function CartItem() {
    return (
        <div className="flex items-center gap-6">
            <Image
                className="h-30 w-30 object-cover"
                width={200}
                height={200}
                alt="product"
                src={images.fallback}
            />
            <div>
                <h2 className="mb-4">Bộ 2 dây trẻ em</h2>
                <span className="inline-flex cursor-pointer items-center gap-2 font-medium hover:text-red-500">
                    <Trash size={20} /> Xóa
                </span>
            </div>
        </div>
    );
}

export default CartItem;
