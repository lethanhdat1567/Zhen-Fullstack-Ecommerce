import { images } from "@/assets/images";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button/button";

import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import LikeBtn from "@/components/CardItem/LikeBtn";
import PriceBadge from "@/components/CardItem/PriceBadge";

type Props = {
    item: any;
    basePath: string;
};
function CardItem({ item, basePath }: Props) {
    return (
        <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <div className="relative aspect-4/3 w-full sm:aspect-3/2">
                <Link href={`/${basePath}/${item.category.slug}/${item.slug}`}>
                    <Image
                        src={resolveMediaSrc(item.thumbnail)}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                <LikeBtn type={basePath} item={item as any} />
            </div>

            {/* Content */}
            <div className="px-4 py-5 text-center sm:px-6 sm:py-6">
                {/* Title */}
                <div className="min-h-12">
                    <h3 className="line-clamp-2 text-base font-semibold sm:text-lg lg:text-[20px]">
                        <Link
                            href={`/${basePath}/${item.category.slug}/${item.slug}`}
                        >
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
                    <PriceBadge
                        price={item.price}
                        sale_price={item.sale_price}
                    />
                </div>

                {/* Button */}
                <Link href={`/${basePath}/${item.category.slug}/${item.slug}`}>
                    <Button className="w-full border border-(--primary-color) text-(--primary-color) transition-all duration-300 hover:-translate-x-1 hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A,3px_3px_#8D388A] sm:w-auto sm:px-6">
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CardItem;
