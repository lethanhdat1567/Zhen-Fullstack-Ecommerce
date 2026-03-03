"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { SwiperNavButtonLeft } from "@/components/SwiperNavButtons/SwiperNavButtonLeft/SwiperNavButtonLeft";
import { SwiperNavButtonRight } from "@/components/SwiperNavButtons/SwiperNavButtonRight/SwiperNavButtonRight";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import { GalleriesType } from "@/app/admin/components/Galleries/Galleries";
import { resolveMediaSrc } from "@/lib/image";

interface Props {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    images: GalleriesType[];
}

export default function ModalImg({ isOpen, setIsOpen, images }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 transition-all"
            onClick={() => setIsOpen(false)}
        >
            {/* Close Button - Nổi bật hơn */}
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-[1001] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90 lg:top-8 lg:right-8"
            >
                <X size={28} />
            </button>

            <div
                className="relative flex h-full w-full flex-col justify-center lg:h-auto lg:max-w-6xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col gap-4 lg:gap-8">
                    {/* Main Slider Area */}
                    <div className="group relative overflow-hidden">
                        <Swiper
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            thumbs={{
                                swiper:
                                    thumbsSwiper && !thumbsSwiper.destroyed
                                        ? thumbsSwiper
                                        : null,
                            }}
                            modules={[Thumbs]}
                            loop={images.length > 1}
                            className="aspect-square w-full shadow-2xl md:aspect-video lg:rounded-2xl"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="flex items-center justify-center bg-black/20"
                                >
                                    {img.type === "image" ? (
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={resolveMediaSrc(
                                                    img.file_url,
                                                )}
                                                alt={`gallery-${index}`}
                                                fill
                                                priority
                                                className="object-contain"
                                                sizes="(max-width: 1024px) 100vw, 80vw"
                                            />
                                        </div>
                                    ) : (
                                        <video
                                            src={
                                                resolveMediaSrc(
                                                    img.file_url,
                                                ) as string
                                            }
                                            className="h-full w-full object-contain shadow-inner"
                                            controls
                                            playsInline
                                        />
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation - Ẩn trên mobile để đỡ chật, hiện khi hover trên desktop */}
                        {images.length > 1 && (
                            <div className="hidden lg:block">
                                <SwiperNavButtonLeft
                                    onClick={() =>
                                        swiperRef.current?.slidePrev()
                                    }
                                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 border-none bg-white/20 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/40"
                                    iconClassName="text-white w-6 h-6"
                                />
                                <SwiperNavButtonRight
                                    onClick={() =>
                                        swiperRef.current?.slideNext()
                                    }
                                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 border-none bg-white/20 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/40"
                                    iconClassName="text-white w-6 h-6"
                                />
                            </div>
                        )}
                    </div>

                    {/* Thumbnails Area */}
                    <div className="w-full px-4 lg:px-0">
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={8}
                            slidesPerView={4}
                            breakpoints={{
                                640: { slidesPerView: 5, spaceBetween: 12 },
                                1024: { slidesPerView: 6, spaceBetween: 16 },
                            }}
                            watchSlidesProgress
                            modules={[Thumbs]}
                            className="thumb-swiper mx-auto max-w-3xl"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="aspect-video cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-all hover:opacity-80 [&.swiper-slide-thumb-active]:scale-105 [&.swiper-slide-thumb-active]:border-(--primary-color)"
                                >
                                    {img.type === "image" ? (
                                        <div className="relative h-full w-full bg-gray-800">
                                            <Image
                                                src={resolveMediaSrc(
                                                    img.file_url,
                                                )}
                                                alt={`thumb-${index}`}
                                                fill
                                                className="object-cover"
                                                sizes="150px"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center border border-white/10 bg-gray-900">
                                            <Play
                                                size={18}
                                                fill="white"
                                                className="text-white"
                                            />
                                        </div>
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}
