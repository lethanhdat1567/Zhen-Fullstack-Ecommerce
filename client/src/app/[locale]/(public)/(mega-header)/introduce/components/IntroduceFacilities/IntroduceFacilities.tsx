"use client";
import { images } from "@/assets/images";
import Image from "next/image";
import IntroduceFacilitiesOverlay from "./components/IntroduceFacilitiesOverlay/IntroduceFacilitiesOverlay";
import { Images } from "lucide-react";

import { useEffect, useState } from "react";
import { MediaAlbum, mediaAlbumService } from "@/services/mediaAlbumService";
import { useLocale, useTranslations } from "next-intl";

function IntroduceFacilities() {
    const locale = useLocale();
    const t = useTranslations("Introduce");
    const [albumsData, setAlbumsData] = useState<MediaAlbum[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const fetchAlbum = async () => {
        try {
            const res = await mediaAlbumService.list({
                lang: locale,
                limit: 7,
                isActive: true,
            });

            setAlbumsData(res.items);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAlbum();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
            {/* Left Intro */}
            <div className="col-span-1 w-full bg-(--primary-color) px-6 py-10 text-white sm:col-span-2 sm:px-10 lg:col-span-3 lg:px-16 lg:py-7.5">
                <div className="relative mb-6 lg:mb-10">
                    <h2 className="mb-2 text-center text-2xl leading-snug sm:text-3xl lg:text-[35px]">
                        {t("IntroduceFacilities.title")}
                    </h2>
                    <Image
                        src={images.lotus}
                        width={116}
                        height={25}
                        alt="lotus"
                        className="mx-auto w-20 brightness-0 invert sm:w-24 lg:w-auto"
                    />
                </div>

                <p className="text-center text-sm leading-relaxed sm:text-base">
                    {t("IntroduceFacilities.desc")}
                </p>
            </div>

            {/* Albums */}
            {albumsData.map((item) => (
                <div
                    key={item.id}
                    className="col-span-1 sm:col-span-1 lg:col-span-3"
                >
                    <div className="group relative h-64 w-full overflow-hidden sm:h-72 md:h-80 lg:h-90">
                        <IntroduceFacilitiesOverlay
                            setHoveredId={setHoveredId}
                            id={item.id}
                            item={item}
                            icon={<Images size={40} />}
                        />

                        <h3
                            className={`pointer-events-none absolute bottom-4 left-4 z-20 text-base font-bold text-white transition-opacity duration-300 sm:text-lg lg:text-[20px] ${
                                hoveredId === item.id
                                    ? "opacity-0"
                                    : "opacity-100"
                            }`}
                        >
                            {item.title}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default IntroduceFacilities;
