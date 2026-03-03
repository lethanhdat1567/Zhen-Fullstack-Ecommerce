import { images } from "@/assets/images";
import Image from "next/image";
import { QuantitySelector } from "./components/QuantitySelector/QuantitySelector";
import { Service } from "@/services/service";
import { Product } from "@/services/productService";

type Props = {
    item: Service | Product;
};
function DetailSummary({ item }: Props) {
    return (
        <div>
            {/* Title */}
            <h1 className="mb-3.25 text-xl font-medium md:text-2xl lg:text-[25px]">
                {item.title}
            </h1>

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
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2.5 md:mb-7.5">
                <div className="sm:ml-2.5">
                    <QuantitySelector />
                </div>

                <button className="relative inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-tl-3xl rounded-br-3xl bg-(--primary-color) px-6 text-sm font-medium text-white sm:w-auto md:h-12.5 md:px-6.75 md:text-base">
                    Thêm vào giỏ hàng
                </button>
            </div>

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
