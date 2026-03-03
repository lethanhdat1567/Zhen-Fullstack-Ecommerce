"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { IIntroduceHistoryItem } from "../../data";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    data: IIntroduceHistoryItem[];
    activeIndex: number;
    onChange: (index: number) => void;
};

export default function IntroduceTimeline({
    data,
    activeIndex,
    onChange,
}: Props) {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="relative py-8 sm:py-10">
            <Swiper
                loop
                centeredSlides
                spaceBetween={16}
                breakpoints={{
                    0: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    swiper.slideToLoop(activeIndex, 0);
                }}
                onSlideChange={(swiper) => onChange(swiper.realIndex)}
                className="relative px-6 sm:px-10 lg:px-0"
            >
                {/* Line */}
                <div className="pointer-events-none absolute bottom-3 left-0 h-0.5 w-full bg-(--primary-color)/50" />

                {data.map((item, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <SwiperSlide key={index}>
                            <button
                                onClick={() => {
                                    swiperRef.current?.slideToLoop(index);
                                    onChange(index);
                                }}
                                className="flex w-full flex-col items-center"
                            >
                                {/* Year */}
                                <div
                                    className={`mb-4 rounded-tl-2xl rounded-br-2xl border border-(--primary-color) px-4 py-2 text-sm font-medium transition-all duration-300 sm:px-6 sm:text-base lg:text-[18px] ${
                                        isActive
                                            ? "bg-(--primary-color) text-white"
                                            : "hover:bg-(--primary-color) hover:text-white"
                                    }`}
                                >
                                    {item.year}
                                </div>

                                {/* Dot */}
                                <div className="relative">
                                    <div className="relative h-5 w-5 rounded-full border border-(--primary-color) bg-white sm:h-6 sm:w-6">
                                        <div
                                            className={`absolute inset-1 rounded-full transition-all duration-300 ${
                                                isActive
                                                    ? "scale-90 bg-(--primary-color)"
                                                    : "scale-100 bg-white"
                                            }`}
                                        />
                                    </div>
                                </div>
                            </button>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Navigation */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 left-0 z-10 -translate-y-1/2 text-(--primary-color) sm:-left-6 lg:-left-10"
            >
                <ChevronLeft size={28} className="sm:size-8 lg:size-10" />
            </button>

            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 right-0 z-10 -translate-y-1/2 text-(--primary-color) sm:-right-6 lg:-right-10"
            >
                <ChevronRight size={28} className="sm:size-8 lg:size-10" />
            </button>
        </div>
    );
}
