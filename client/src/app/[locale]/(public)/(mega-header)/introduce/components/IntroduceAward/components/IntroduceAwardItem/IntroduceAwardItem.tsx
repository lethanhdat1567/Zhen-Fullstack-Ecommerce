"use client";

import "swiper/css";
import Image from "next/image";
import { awardsData } from "../../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavButtonLeft } from "@/components/SwiperNavButtons/SwiperNavButtonLeft/SwiperNavButtonLeft";
import { SwiperNavButtonRight } from "@/components/SwiperNavButtons/SwiperNavButtonRight/SwiperNavButtonRight";
import { useRef, useState } from "react";
import PaginationSwiper from "@/app/[locale]/(public)/(mega-header)/(home)/components/PaginationSwiper/PaginationSwiper";
import { useTranslations } from "next-intl";
import { images } from "@/assets/images";

function IntroduceAwardItem() {
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const t = useTranslations("Introduce.IntroduceAward");

    const items = t.raw("items").map((item: any) => ({
        ...item,
        image: images.fallback,
    }));
    return (
        <div className="relative">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                    1280: { slidesPerView: 3 },
                }}
            >
                {items.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="flex flex-col items-center">
                            {/* Image */}
                            <div className="relative mb-6 aspect-[3/4] w-[140px] sm:w-[150px] md:w-[160px]">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Title Box */}
                            <div className="w-full max-w-[220px] rounded-tl-[40px] rounded-br-[40px] bg-(--primary-color) px-6 py-4 text-center text-white md:px-8 md:py-5">
                                <h3 className="text-sm leading-relaxed md:text-base">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Desktop */}
            <SwiperNavButtonLeft
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 -left-6 z-10 hidden -translate-y-1/2 border border-(--primary-color) bg-white transition-all duration-300 hover:-translate-x-1 hover:shadow-[1px_1px_0_#8D388A,2px_2px_0_#8D388A,3px_3px_0_#8D388A] xl:flex"
                iconClassName="text-(--primary-color)"
            />

            <SwiperNavButtonRight
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 -right-6 z-10 hidden -translate-y-1/2 border border-(--primary-color) bg-white transition-all duration-300 hover:translate-x-1 hover:shadow-[1px_1px_0_#8D388A,2px_2px_0_#8D388A,3px_3px_0_#8D388A] xl:flex"
                iconClassName="text-(--primary-color)"
            />

            {/* Pagination Mobile */}
            <div className="mt-6 flex justify-center xl:hidden">
                <PaginationSwiper
                    total={awardsData.length}
                    activeIndex={activeIndex}
                    onClick={(index) => swiperRef.current?.slideToLoop(index)}
                    dot="bg-(--primary-color)"
                    borderDot="border-(--primary-color)"
                />
            </div>
        </div>
    );
}

export default IntroduceAwardItem;
