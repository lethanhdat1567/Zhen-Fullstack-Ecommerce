"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import PaginationSwiper from "../../../PaginationSwiper/PaginationSwiper";
import { postService } from "@/services/postService";
import { useLocale } from "next-intl";
import { resolveMediaSrc } from "@/lib/image";

function NewsItem() {
    const locale = useLocale();
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [news, setNews] = useState<any[]>([]);

    const fetchNews = async () => {
        try {
            const res = await postService.getRelated({
                lang: locale,
                limit: 6,
            });

            setNews(res as any);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNews();
    }, []);

    if (news.length === 0) return null;

    return (
        <>
            <div className="bg-linear-to-t from-gray-200 to-white p-1 sm:p-1.5">
                <Swiper
                    className="h-full"
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) =>
                        setActiveIndex(swiper.activeIndex)
                    }
                >
                    {news.map((item, index) => (
                        <SwiperSlide key={index} className="h-full">
                            <div className="group flex h-full flex-col overflow-hidden rounded-xs bg-white">
                                <Link href="/" className="flex h-full flex-col">
                                    {/* IMAGE */}
                                    <div className="relative h-44 w-full overflow-hidden sm:h-52">
                                        <Image
                                            src={resolveMediaSrc(
                                                item.thumbnail,
                                            )}
                                            alt=""
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="flex flex-1 flex-col p-4 sm:p-6">
                                        <p className="mb-3 text-[11px] text-[#666666] sm:text-[12px]">
                                            {item.created_at}
                                        </p>

                                        <h3 className="line-clamp-2 min-h-[3.5rem] text-base text-[#333333] sm:text-lg">
                                            {item.title}
                                        </h3>

                                        {/* BUTTON */}
                                        <div className="mt-auto flex flex-col items-center gap-2 pt-6">
                                            <div className="h-4 w-px bg-(--primary-color)" />
                                            <span className="text-[13px] text-(--primary-color) sm:text-[14px]">
                                                View details
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* PAGINATION */}
            <div className="mt-6 flex justify-center sm:hidden">
                <PaginationSwiper
                    total={news.length}
                    activeIndex={activeIndex}
                    onClick={(index) => swiperRef.current?.slideTo(index)}
                    dot="bg-(--primary-color)"
                    borderDot="border-(--primary-color)"
                />
            </div>
        </>
    );
}

export default NewsItem;
