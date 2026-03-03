"use client";

import Image from "next/image";
import { GalleriesType } from "@/app/admin/components/Galleries/Galleries";
import { images } from "@/assets/images";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import MediaItem from "@/app/[locale]/(public)/(header-bg)/media/[slug]/components/MediaGallery/components/MediaOverlay/components/MediaCarousel/MediaItem";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import MediaNavigation from "@/app/[locale]/(public)/(header-bg)/media/[slug]/components/MediaGallery/components/MediaOverlay/components/MediaCarousel/MediaNavigation";
import { resolveMediaSrc } from "@/lib/image";
import MediaThumbnail from "@/app/[locale]/(public)/(header-bg)/media/[slug]/components/MediaGallery/components/MediaOverlay/components/MediaCarousel/MediaThumbnail";

type Props = {
    galleries: GalleriesType[];
};

function MediaCarousel({ galleries }: Props) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        // Lấy index ban đầu
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrent(api.selectedScrollSnap());

        // Lắng nghe khi slide thay đổi
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div>
            {/* Active thumbnail */}
            <MediaThumbnail gallery={galleries[current]} />
            {/* Carousel */}
            <Carousel
                setApi={setApi}
                opts={{
                    loop: true,
                    align: "start",
                }}
            >
                <CarouselContent>
                    {galleries.map((gallery, index) => (
                        <CarouselItem
                            key={gallery.id}
                            className={`basis-1/4 ${current === index ? "-translate-y-1 border border-(--primary-color) transition" : ""}`}
                            onClick={() => api?.scrollTo(index)}
                        >
                            <MediaItem gallery={gallery} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <MediaNavigation api={api} />
            </Carousel>
        </div>
    );
}

export default MediaCarousel;
