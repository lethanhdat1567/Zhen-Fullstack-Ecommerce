import { images } from "@/assets/images";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button/button";

import { Button as ShadUIBtn } from "@/components/ui/button";
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { Heart, ShoppingBag } from "lucide-react";

type Props = {
    item: any;
    slug: string;
    basePath: string;
};
function CardItem({ item, slug, basePath }: Props) {
    return (
        <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <div className="relative aspect-4/3 w-full sm:aspect-3/2">
                <Image
                    src={resolveMediaSrc(item.thumbnail)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <ShadUIBtn
                    variant={"outline"}
                    size={"icon-lg"}
                    className="invisible absolute top-4 right-4 rounded-full opacity-0 transition duration-1000 group-hover:visible group-hover:opacity-100"
                >
                    <Heart />
                </ShadUIBtn>
            </div>

            {/* Content */}
            <div className="px-4 py-5 text-center sm:px-6 sm:py-6">
                {/* Title */}
                <div className="min-h-12">
                    <h3 className="line-clamp-2 text-base font-semibold sm:text-lg lg:text-[20px]">
                        <Link href={`/${basePath}/${slug}/${item.slug}`}>
                            {item.title}
                        </Link>
                    </h3>
                </div>

                {/* Lotus */}
                <Image
                    src={images.lotus}
                    height={16}
                    width={73}
                    alt=""
                    className="mx-auto my-3"
                />

                {/* Price Section */}
                <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
                    {/* Giá hiện tại (Giá Sale hoặc Giá gốc) */}
                    <p className="text-base font-bold text-(--primary-color) sm:text-lg">
                        {item.sale_price && Number(item.sale_price) > 0
                            ? `${Number(item.sale_price).toLocaleString("vi-VN")} Đ`
                            : item.price > 0
                              ? `${Number(item.price).toLocaleString("vi-VN")} Đ`
                              : "Miễn phí"}
                    </p>

                    {/* Giá gốc bị gạch ngang (Chỉ hiện khi đang có Sale) */}
                    {item.sale_price &&
                        Number(item.sale_price) < Number(item.price) && (
                            <p className="text-sm text-gray-400 line-through decoration-gray-400">
                                {Number(item.price).toLocaleString("vi-VN")} Đ
                            </p>
                        )}

                    {/* Label Giảm % (Tùy chọn - Giúp User thấy hời hơn) */}
                    {item.sale_price &&
                        Number(item.sale_price) < Number(item.price) && (
                            <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-red-600 uppercase">
                                -
                                {Math.round(
                                    (1 - item.sale_price / item.price) * 100,
                                )}
                                %
                            </span>
                        )}
                </div>

                {/* Button */}
                <Link href={`/${basePath}/${slug}/${item.slug}`}>
                    <Button className="w-full border border-(--primary-color) text-(--primary-color) transition-all duration-300 hover:-translate-x-1 hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A,3px_3px_#8D388A] sm:w-auto sm:px-6">
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CardItem;
