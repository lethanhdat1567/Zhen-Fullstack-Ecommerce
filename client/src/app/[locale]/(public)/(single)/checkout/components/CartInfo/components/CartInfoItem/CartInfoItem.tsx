import { images } from "@/assets/images";
import Image from "next/image";

function CartInfoItem() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative h-14 w-14">
                    <Image
                        alt="pr"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                        src={images.fallback}
                    />
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-(--primary-color) text-xs text-white">
                        3
                    </div>
                </div>
                <h3 className="text-sm font-semibold">Bộ 2 dây trẻ em</h3>
            </div>
            <p className="text-md font-medium">80.000₫</p>
        </div>
    );
}

export default CartInfoItem;
