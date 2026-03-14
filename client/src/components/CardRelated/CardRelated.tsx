"use client";

import { images } from "@/assets/images";
import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../CardItem/CardItem";
import { SwiperNavButtonLeft } from "../SwiperNavButtons/SwiperNavButtonLeft/SwiperNavButtonLeft";
import { SwiperNavButtonRight } from "../SwiperNavButtons/SwiperNavButtonRight/SwiperNavButtonRight";
import { Service } from "@/services/service";
import { Product } from "@/services/productService";
import { useTranslations } from "next-intl";
import "swiper/css";

type Props = {
    item: Service[] | Product[];
    hideTitle?: boolean;
    type: "product" | "service";
};

function CardRelated({ item, hideTitle = false, type }: Props) {
    const swiperRef = useRef<any>(null);
    const t = useTranslations("CardRelated");

    if (!item || item.length === 0) return null;

    return (
        <div className="container">
            {/* ================= HEADER ================= */}
            {!hideTitle && (
                <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-2xl font-light text-(--primary-color) md:text-4xl lg:text-[50px]">
                        {t("title")}
                    </h2>

                    <Image
                        src={images.lotus}
                        width={116}
                        height={25}
                        alt=""
                        className="mt-4 mb-8 md:mb-10"
                    />
                </div>
            )}

            {/* ================= SWIPER ================= */}
            <div className="relative">
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={24}
                    slidesPerView={1}
                    speed={800}
                    loop={item.length > 3}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10!"
                >
                    {item.map((service) => (
                        <SwiperSlide key={service.id}>
                            <CardItem basePath={type} item={service} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* LEFT BUTTON */}
                <SwiperNavButtonLeft
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute top-1/2 left-0 -translate-y-1/2 scale-75 border border-(--primary-color) bg-white transition-all duration-300 ease-out hover:-translate-x-1 hover:-translate-y-[calc(50%+2px)] hover:shadow-[1px_1px_0_#8D388A,2px_2px_0_#8D388A,3px_3px_0_#8D388A] md:scale-90 lg:-left-15.5 lg:scale-100"
                    iconClassName="text-(--primary-color)"
                />

                {/* RIGHT BUTTON */}
                <SwiperNavButtonRight
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute top-1/2 right-0 -translate-y-1/2 scale-75 border border-(--primary-color) bg-white transition-all duration-300 ease-out hover:translate-x-1 hover:-translate-y-[calc(50%+2px)] hover:shadow-[1px_1px_0_#8D388A,2px_2px_0_#8D388A,3px_3px_0_#8D388A] md:scale-90 lg:-right-15.5 lg:scale-100"
                    iconClassName="text-(--primary-color)"
                />
            </div>
        </div>
    );
}

export default CardRelated;
