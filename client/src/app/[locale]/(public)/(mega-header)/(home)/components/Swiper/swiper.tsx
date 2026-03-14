"use client";

import { Swiper as SwiperCore, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import SwiperItem from "./components/SwiperItem/SwiperItem";
import { images } from "@/assets/images";
import Image from "next/image";
import { HeroBanner, heroBannerService } from "@/services/heroBannerService";
import SwiperNavigate from "@/app/[locale]/(public)/(mega-header)/(home)/components/Swiper/components/SwiperNavigate/SwiperNavigate";
import { Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";

export default function Swiper() {
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [banners, setBanners] = useState<HeroBanner[]>([]);
    const t = useTranslations("Home");
    const [loading, setLoading] = useState(true);

    const fetchBanner = async () => {
        try {
            const res = await heroBannerService.list();

            const sorted = [...res.items].sort(
                (a, b) => a.sort_order - b.sort_order,
            );

            setBanners(sorted);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBanner();
    }, []);

    if (banners.length === 0 || loading)
        return <div className="h-screen bg-neutral-400" />;

    return (
        <div className="relative h-[70vh] w-full sm:h-[60vh] lg:h-[calc(100vh-136px)]">
            {/* Swiper */}
            <SwiperCore
                modules={[Autoplay]}
                slidesPerView={1}
                loop={true}
                speed={1200}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full"
            >
                {banners.map((item, index) => (
                    <SwiperSlide key={index}>
                        <SwiperItem
                            src={item.thumbnail}
                            isActive={activeIndex === index}
                        />
                    </SwiperSlide>
                ))}
            </SwiperCore>

            {/* Navigate */}
            <SwiperNavigate swiperRef={swiperRef} />

            {/* ScrollDown */}
            <div className="absolute right-20 bottom-10 z-30 hidden w-20 cursor-pointer text-white md:block">
                <button
                    onClick={() => {
                        const el = document.getElementById("about");
                        el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="cursor-pointer"
                >
                    <span className="absolute top-7 -left-14 w-auto -rotate-90 text-left text-[12px] opacity-70">
                        {t("Hero.scrollText")}
                    </span>

                    <Image src={images.scroll} alt="scroll" />
                </button>
            </div>
        </div>
    );
}
