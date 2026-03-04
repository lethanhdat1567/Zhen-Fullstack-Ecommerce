"use client";

import Image from "next/image";
import { contentFeatures } from "./data";
import { images } from "@/assets/images";
import PaginationSwiper from "@/app/[locale]/(public)/(header-transparent)/(home)/components/PaginationSwiper/PaginationSwiper";
import { useState } from "react";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import { useTranslations } from "next-intl";

function Features() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const t = useTranslations("Home.Features");
    const rawFeatures = t.raw("contentFeatures");

    const features = rawFeatures.map((f: any, index: number) => ({
        ...f,
        thumbnail: contentFeatures[index],
    }));

    const item = features[activeIndex];

    const handleChange = (index: number) => {
        if (index === activeIndex) return;

        setIsVisible(false);

        setTimeout(() => {
            setActiveIndex(index);
            setIsVisible(true);
        }, 250);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT IMAGE */}
            <div className="relative h-70 lg:h-full">
                {features.map((feature: any, index: number) => (
                    <div
                        key={index}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                            index === activeIndex
                                ? "z-10 opacity-100"
                                : "z-0 opacity-0"
                        }`}
                    >
                        <Image
                            src={feature.thumbnail}
                            alt={feature.subTitle}
                            fill
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="bg-(--primary-color) text-white">
                <div className="mx-auto flex h-full max-w-2xl flex-col justify-center px-6 py-12 md:px-10 md:py-6 lg:px-20 lg:py-24">
                    <div
                        className={`transition-opacity duration-300 ease-in-out ${
                            isVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <div className="mb-6 md:mb-8">
                            <SplitText
                                text={item.title}
                                textAlign="left"
                                className="text-2xl leading-tight font-semibold lg:text-4xl"
                            />

                            <div className="mt-4">
                                <Image
                                    src={images.lotus}
                                    width={116}
                                    height={25}
                                    alt="lotus"
                                    className="brightness-0 invert"
                                />
                            </div>
                        </div>

                        <AnimatedContent>
                            <h3 className="text-md mb-4 font-normal md:text-xl lg:text-2xl">
                                {item.subTitle}
                            </h3>
                        </AnimatedContent>

                        <AnimatedContent delay={0.1}>
                            <p className="text-sm leading-relaxed md:text-base">
                                {item.content}
                            </p>
                        </AnimatedContent>
                    </div>

                    <AnimatedContent delay={0.2}>
                        <div className="mt-8 md:mt-10">
                            <PaginationSwiper
                                total={features.length}
                                activeIndex={activeIndex}
                                onClick={handleChange}
                                autoPlay
                                delay={5000}
                            />
                        </div>
                    </AnimatedContent>
                </div>
            </div>
        </div>
    );
}

export default Features;
