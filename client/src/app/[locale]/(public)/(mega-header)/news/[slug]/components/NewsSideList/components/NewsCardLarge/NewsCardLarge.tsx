import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { formatDateVN } from "@/utils/formatDate";
import { Link } from "@/i18n/navigation";
type Props = {
    item: any;
};
function NewsCardLarge({ item }: Props) {
    if (!item) return null;

    return (
        <Link
            href={`/news/${item.category.slug}/${item.slug}`}
            className="block w-full"
        >
            <div className="group relative h-60 w-full overflow-hidden rounded-[5px] sm:h-80 md:h-112">
                <Image
                    src={resolveMediaSrc(item.thumbnail)}
                    fill
                    alt=""
                    className="object-cover transition-transform duration-700 group-hover:scale-125"
                />

                <div className="absolute right-4 bottom-4 left-4 text-white sm:right-6 sm:bottom-6 sm:left-6">
                    <p className="mb-1 text-[11px] sm:text-[12px] md:text-sm">
                        {formatDateVN(item.created_at)}
                    </p>

                    <div className="text-base leading-snug font-semibold sm:text-lg md:text-[22px]">
                        {item.title}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default NewsCardLarge;
