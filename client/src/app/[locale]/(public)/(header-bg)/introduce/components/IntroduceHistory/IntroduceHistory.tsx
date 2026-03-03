"use client";
import { images } from "@/assets/images";
import Image from "next/image";
import IntroduceTimeline from "./components/IntroduceTimeline/IntroduceTimeline";
import IntroduceContent from "./components/IntroduceContent/IntroduceContent";
import { useState } from "react";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import { useTranslations } from "next-intl";

function IntroduceHistory() {
    const [activeIndex, setActiveIndex] = useState(0);
    const t = useTranslations("Introduce.IntroduceHistory");

    const thumbnails = [
        images.decor3,
        images.decor4,
        images.decor5,
        images.decor6,
        images.decor7,
        images.decor8,
        images.DSC5622,
    ];

    const historyItems = t.raw("items").map((item: any, index: number) => ({
        ...item,
        thumbnail: thumbnails[index] || images.fallback,
    }));

    return (
        <div className="relative mt-20 overflow-hidden sm:mt-16 lg:mt-20">
            <div className="container mb-14 sm:mb-16 lg:mb-20">
                {/* Title */}
                <div className="flex flex-col items-center justify-center text-center">
                    <SplitText
                        className="text-3xl font-medium text-(--primary-color) sm:text-4xl lg:text-[50px]"
                        text={t("title")}
                    />

                    <Image
                        src={images.lotus}
                        width={116}
                        height={25}
                        alt="lotus"
                        className="mt-3"
                    />
                </div>

                {/* Content */}
                <div className="mt-2">
                    <AnimatedContent>
                        <IntroduceTimeline
                            data={historyItems}
                            activeIndex={activeIndex}
                            onChange={setActiveIndex}
                        />
                    </AnimatedContent>

                    <AnimatedContent delay={0.5}>
                        <div className="mt-4">
                            <IntroduceContent
                                data={historyItems[activeIndex]}
                            />
                        </div>
                    </AnimatedContent>
                </div>
            </div>

            {/* Background decor */}
            <Image
                src={images.bg_decor_vertical}
                width={400}
                height={400}
                alt="decor"
                className="pointer-events-none absolute bottom-0 left-0 -z-10 w-full max-w-75 opacity-40 sm:max-w-87.5 lg:max-w-100"
            />
        </div>
    );
}

export default IntroduceHistory;
