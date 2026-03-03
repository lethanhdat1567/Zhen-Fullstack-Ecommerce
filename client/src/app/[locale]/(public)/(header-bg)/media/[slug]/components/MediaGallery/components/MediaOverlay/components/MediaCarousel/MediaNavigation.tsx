"use client";

import { SwiperNavButtonLeft } from "@/components/SwiperNavButtons/SwiperNavButtonLeft/SwiperNavButtonLeft";
import { SwiperNavButtonRight } from "@/components/SwiperNavButtons/SwiperNavButtonRight/SwiperNavButtonRight";
import { CarouselApi } from "@/components/ui/carousel";

type Props = {
    api: CarouselApi;
};

function MediaNavigation({ api }: Props) {
    return (
        <>
            <SwiperNavButtonLeft
                className="absolute top-1/2 left-0 z-20 -translate-x-1/2 -translate-y-1/2 bg-(--primary-color)"
                iconClassName="text-white"
                iconSize={18}
                size={42}
                onClick={() => api?.scrollPrev()}
            />

            {/* RIGHT */}
            <SwiperNavButtonRight
                className="absolute top-1/2 right-0 z-20 translate-x-1/2 -translate-y-1/2 bg-(--primary-color)"
                iconClassName="text-white"
                iconSize={18}
                size={42}
                onClick={() => api?.scrollNext()}
            />
        </>
    );
}

export default MediaNavigation;
