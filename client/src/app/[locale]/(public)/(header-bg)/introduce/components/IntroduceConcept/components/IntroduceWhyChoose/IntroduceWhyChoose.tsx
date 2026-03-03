"use client";

import Image from "next/image";
import { introductConceptData } from "./data";
import { images } from "@/assets/images";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { SwiperNavButtonLeft } from "@/components/SwiperNavButtons/SwiperNavButtonLeft/SwiperNavButtonLeft";
import { SwiperNavButtonRight } from "@/components/SwiperNavButtons/SwiperNavButtonRight/SwiperNavButtonRight";
import { useRef, useState } from "react";
import PaginationSwiper from "@/app/[locale]/(public)/(header-transparent)/(home)/components/PaginationSwiper/PaginationSwiper";
import { useTranslations } from "next-intl";

function IntroduceWhyChoose() {
    const t = useTranslations("Introduce.IntroduceConcept");

    const carousel = t.raw("carousel").map((item: any, index: number) => ({
        ...item,
        thumbnail: introductConceptData[index],
    }));

    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative px-7.5 py-15">
            <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                spaceBetween={40}
                className="w-full rounded-3xl shadow-[0_0_20px_rgba(159,57,154,0.15)] md:rounded-4xl"
                loop
            >
                {carousel.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative grid h-full w-full grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl bg-white md:gap-10 md:rounded-4xl lg:grid-cols-2">
                            {/* Image */}
                            <div className="relative h-64 w-full overflow-hidden sm:h-72 md:h-80 lg:h-full lg:rounded-tl-4xl lg:rounded-bl-4xl">
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    fill
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="h-full p-5 py-16! sm:p-6 md:p-10">
                                <div>
                                    <h2 className="mb-2 text-2xl font-semibold text-(--primary-color) sm:text-3xl md:text-4xl lg:text-[35px]">
                                        {item.title}
                                    </h2>

                                    <Image
                                        src={images.lotus}
                                        width={116}
                                        height={25}
                                        alt="lotus"
                                        className="mb-3 w-20 sm:w-24 md:w-auto"
                                    />
                                </div>

                                <p className="mb-4 text-base font-medium text-gray-700 sm:text-lg md:text-xl lg:text-[24px]">
                                    {item.subtitle}
                                </p>

                                <p className="text-sm leading-6 text-gray-500 sm:text-[15px] sm:leading-7">
                                    {item.description}
                                </p>
                            </div>

                            <Image
                                src={images.decorHis}
                                width={300}
                                height={300}
                                alt=""
                                className="absolute right-0 bottom-0 hidden translate-x-1/2 md:block"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <SwiperNavButtonLeft
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 border border-(--primary-color) bg-white transition-all duration-300 ease-out hover:-translate-x-1 hover:-translate-y-[calc(50%+2px)] hover:shadow-[1px_1px_0_#8D388A,2px_2px_0_#8D388A,3px_3px_0_#8D388A] md:-left-12.5 md:flex"
                iconClassName="text-(--primary-color)"
            />

            <SwiperNavButtonRight
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 border border-(--primary-color) bg-white transition-all duration-300 ease-out hover:translate-x-1 hover:-translate-y-[calc(50%+2px)] hover:shadow-[1px_1px_0_#8D388A,2px_2px_0_#8D388A,3px_3px_0_#8D388A] md:-right-12.5 md:flex"
                iconClassName="text-(--primary-color)"
            />
            <PaginationSwiper
                total={carousel.length}
                activeIndex={activeIndex}
                onClick={(index) => swiperRef.current?.slideTo(index)}
                className="mt-6 justify-center md:hidden"
                dot="bg-(--primary-color)"
                borderDot="border-(--primary-color)"
            />
        </div>
    );
}

export default IntroduceWhyChoose;
