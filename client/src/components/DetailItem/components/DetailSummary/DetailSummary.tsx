import { images } from "@/assets/images";
import Image from "next/image";
import { QuantitySelector } from "./components/QuantitySelector/QuantitySelector";
import { Service } from "@/services/service";
import { Product } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import AddToCartBtn from "@/components/DetailItem/components/DetailSummary/components/AddToCartBtn/AddToCartBtn";

type Props = {
    item: Service | Product;
    type: "service" | "product";
};
function DetailSummary({ item, type }: Props) {
    return (
        <div>
            {/* Title */}
            <div className="mb-3.25 flex w-full items-center gap-2">
                <h1 className="flex-1 text-xl font-medium md:text-2xl lg:text-[25px]">
                    {item.title}
                </h1>
                <Button
                    variant={"outline"}
                    size={"icon-lg"}
                    className="rounded-full"
                >
                    <Heart />
                </Button>
            </div>

            <Image src={images.lotus} height={25} width={116} alt="" />

            {/* Price */}
            <p className="mt-3 mb-8 text-lg font-medium text-(--primary-color) md:mb-10 md:text-xl lg:text-[23px]">
                {Number(item.price) > 0
                    ? `${Number(item.price).toLocaleString("vi-VN")}  Đ++`
                    : "Miễn phí"}
            </p>

            {/* Description */}
            <div className="mb-5">
                <p className="mb-5 text-sm md:mb-[22.5px] md:text-base">
                    <strong>Mô tả:</strong> <br /> {item.description}
                </p>
            </div>

            {/* Quantity + Button */}
            <AddToCartBtn item={item as Product} />

            {/* Meta */}
            <div className="flex flex-col text-sm md:text-base">
                {item.sku && <span className="mr-1.5">Mã: {item.sku}</span>}
                <span className="mr-1.5">
                    Danh mục: {item.category.name || "Không có danh mục"}
                </span>
            </div>
        </div>
    );
}

export default DetailSummary;
