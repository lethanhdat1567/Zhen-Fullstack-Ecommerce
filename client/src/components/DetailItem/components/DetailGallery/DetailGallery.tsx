"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { SwiperNavButtonLeft } from "@/components/SwiperNavButtons/SwiperNavButtonLeft/SwiperNavButtonLeft";
import { SwiperNavButtonRight } from "@/components/SwiperNavButtons/SwiperNavButtonRight/SwiperNavButtonRight";
import { resolveMediaSrc } from "@/lib/image";

type Props = {
    item: any;
};

function DetailGallery({ item }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const swiperRef = useRef<any>(null);

    const galleriesSorted = [...item.galleries].sort(
        (a, b) => a.sort_order - b.sort_order,
    );

    // Nếu không có ảnh → giữ chiều cao tránh layout shift
    if (galleriesSorted.length === 0)
        return <div className="h-60 w-full md:h-72 lg:h-87.5" />;

    return (
        <div className="w-full">
            {/* ================= MAIN SLIDER ================= */}
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Thumbs]}
                loop
                className="mb-4"
            >
                {galleriesSorted.map((gallery: any) => (
                    <SwiperSlide key={gallery.id}>
                        <Image
                            src={resolveMediaSrc(gallery.image)}
                            alt={`item-${gallery.id}`}
                            width={500}
                            height={350}
                            /* 
                               Desktop giữ h-87.5 như bạn
                               Mobile giảm chiều cao để không quá dài
                            */
                            className="h-60 w-full object-cover md:h-72 lg:h-87.5"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* ================= THUMB SLIDER ================= */}
            <div className="relative">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={12}
                    slidesPerView={3}
                    breakpoints={{
                        640: { slidesPerView: 4 },
                        1024: { slidesPerView: 3 },
                    }}
                    watchSlidesProgress
                    modules={[Thumbs]}
                    loop
                    className="cursor-pointer"
                >
                    {galleriesSorted.map((gallery: any) => (
                        <SwiperSlide
                            key={gallery.id}
                            className="border-2 border-transparent transition-all duration-200 [&.swiper-slide-thumb-active]:border-(--primary-color)"
                        >
                            <Image
                                src={resolveMediaSrc(gallery.image)}
                                alt={`thumb-${gallery.id}`}
                                width={500}
                                height={350}
                                /*
                                   Giữ desktop h-22.5
                                   Mobile nhỏ lại cho cân layout
                                */
                                className="h-16 w-full object-cover md:h-20 lg:h-22.5"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* ================= NAV BUTTONS ================= */}
                {/* 
                   Giữ vị trí absolute như bạn
                   Chỉ scale nhẹ cho mobile để không quá to
                */}

                <SwiperNavButtonLeft
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute top-1/2 left-2 z-20 -translate-x-1/2 -translate-y-1/2 scale-75 bg-(--primary-color) transition-all duration-200 ease-in-out hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A,3px_3px_#8D388A] md:left-0 md:scale-90 lg:scale-100"
                    iconClassName="text-[#fff]"
                />

                <SwiperNavButtonRight
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute top-1/2 right-2 z-20 translate-x-1/2 -translate-y-1/2 scale-75 bg-(--primary-color) transition-all duration-200 ease-in-out hover:shadow-[-1px_1px_#8D388A,-2px_2px_#8D388A,-3px_3px_#8D388A] md:right-0 md:scale-90 lg:scale-100"
                    iconClassName="text-[#fff]"
                />
            </div>
        </div>
    );
}

export default DetailGallery;
