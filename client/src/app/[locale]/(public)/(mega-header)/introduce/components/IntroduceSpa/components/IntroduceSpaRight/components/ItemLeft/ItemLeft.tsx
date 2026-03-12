"use client";

import { images } from "@/assets/images";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

function ItemLeft() {
    const t = useTranslations("Introduce");
    return (
        <div className="flex flex-col gap-4">
            {/* Image */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{
                    scale: 1,
                    transition: { duration: 1 },
                }}
                className="relative h-56 overflow-hidden rounded-tr-[50px] rounded-bl-[50px] sm:h-64 lg:rounded-tr-[90px] lg:rounded-bl-[90px]"
            >
                <Image
                    src={images.decor3}
                    alt="Sen Spa Reception"
                    fill
                    className="object-cover"
                />
            </motion.div>

            {/* Content box */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{
                    scale: 1,
                    transition: { duration: 1 },
                }}
                className="flex flex-col justify-center rounded-tl-[60px] rounded-br-[60px] bg-(--primary-color) px-6 py-10 text-white sm:px-10 sm:py-14 lg:rounded-tl-[100px] lg:rounded-br-[100px] lg:px-11.25 lg:py-17.5"
            >
                {/* Big number */}
                <h3 className="mb-4 text-4xl leading-none font-bold sm:text-5xl lg:text-6xl">
                    {t("IntroduceSpa.counterText")}
                </h3>

                {/* Subtitle */}
                <div className="flex items-start gap-3">
                    <div className="w-[2px] bg-white"></div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl">
                        {t("IntroduceSpa.counterDesc")}
                    </h4>
                </div>
            </motion.div>
        </div>
    );
}

export default ItemLeft;
