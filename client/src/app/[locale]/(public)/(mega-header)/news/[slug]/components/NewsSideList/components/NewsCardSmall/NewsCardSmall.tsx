import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { formatDateVN } from "@/utils/formatDate";
import { Link } from "@/i18n/navigation";
import AnimatedContent from "@/components/AnimatedContent";
type Props = {
    item: any;
    index: number;
};
function NewsCardSmall({ item, index }: Props) {
    return (
        <Link
            href={`/news/${item.category.slug}/${item.slug}`}
            className="block h-60 w-full sm:h-80 md:h-full"
        >
            <AnimatedContent
                delay={index / 10}
                className="group relative h-full w-full overflow-hidden rounded-[5px]"
            >
                <Image
                    src={resolveMediaSrc(item.thumbnail)}
                    fill
                    alt=""
                    className="object-cover transition-transform duration-700 group-hover:scale-125"
                />

                <div className="absolute right-4 bottom-4 left-4 text-white">
                    <p className="mb-1 text-[11px] sm:text-[12px] md:text-xs">
                        {formatDateVN(item.created_at)}
                    </p>

                    <div className="text-sm leading-snug font-semibold sm:text-base md:text-lg">
                        {item.title}
                    </div>
                </div>
            </AnimatedContent>
        </Link>
    );
}

export default NewsCardSmall;
