"use client";
import { Link } from "@/i18n/navigation";
import { resolveMediaSrc } from "@/lib/image";
import { formatDateVN } from "@/utils/formatDate";
import Image from "next/image";

interface IProp {
    item: any;
}
function PostCard({ item }: IProp) {
    return (
        <div className="rounded-xs bg-linear-to-t from-gray-200 to-white p-1 sm:p-1.5">
            <div className="group overflow-hidden rounded-xs bg-white">
                <Link href={`/news/${item.category.slug}/${item.slug}`}>
                    {/* IMAGE */}
                    <div className="relative h-44 w-full overflow-hidden sm:h-52 lg:h-60">
                        <Image
                            src={resolveMediaSrc(item.thumbnail)}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-125"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 sm:p-5 lg:p-6">
                        <p className="mb-3 text-[11px] text-[#666666] sm:text-[12px]">
                            {formatDateVN(item.created_at)}
                        </p>

                        <h3 className="mb-6 line-clamp-3 text-base text-[#333333] sm:text-lg lg:mb-10">
                            {item.title}
                        </h3>

                        <div className="flex flex-col items-center gap-2">
                            <div className="h-4 w-px bg-(--primary-color)" />
                            <span className="text-[13px] text-(--primary-color) sm:text-[14px]">
                                View details
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default PostCard;
