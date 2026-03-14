import { images } from "@/assets/images";
import Image from "next/image";
import { Service } from "@/services/service";
import { Product } from "@/services/productService";
import AddToCartBtn from "@/components/DetailItem/components/DetailSummary/components/AddToCartBtn/AddToCartBtn";
import { Link } from "@/i18n/navigation";
import LikeBtn from "@/components/DetailItem/components/DetailSummary/components/LikeBtn/LikeBtn";
import PriceBadge from "@/components/CardItem/PriceBadge";

type Props = {
    item: Service | Product;
    type: "service" | "product";
};
function DetailSummary({ item, type }: Props) {
    console.log(item);

    return (
        <div>
            {/* Title */}
            <div className="mb-3.25 flex w-full items-center gap-2">
                <h1 className="flex-1 text-xl font-medium md:text-2xl lg:text-[25px]">
                    {item.title}
                </h1>
                <LikeBtn item={item as any} type={type} />
            </div>

            <Image src={images.lotus} height={25} width={116} alt="" />

            <div className="my-4">
                <PriceBadge
                    price={item.price}
                    sale_price={item.sale_price as any}
                    className="text-4xl!"
                />
            </div>
            {type === "service" && (
                <p className="my-3">
                    <strong>Sức chứa: </strong> {(item as Service).capacity}
                </p>
            )}

            {/* Description */}
            <div className="mb-5">
                <p className="mb-5 text-sm md:mb-[22.5px] md:text-base">
                    <strong>Mô tả:</strong> <br /> {item.description}
                </p>
            </div>

            {/* Quantity + Button */}
            {type === "product" && <AddToCartBtn item={item as Product} />}
            {type === "service" && (
                <Link href={`/booking?id=${item.id}`}>
                    <button className="relative inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-tl-3xl rounded-br-3xl bg-(--primary-color) px-6 text-sm font-medium text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto md:h-12.5 md:px-6.75 md:text-base">
                        Đặt phòng
                    </button>
                </Link>
            )}

            {/* Meta */}
            <div className="mt-5 flex flex-col text-sm md:text-base">
                <span className="mr-1.5">
                    Danh mục:{" "}
                    <Link
                        href={`/${type}/${item.category.slug}`}
                        className="font-medium hover:underline"
                    >
                        {item.category.name || "Không có danh mục"}
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default DetailSummary;
