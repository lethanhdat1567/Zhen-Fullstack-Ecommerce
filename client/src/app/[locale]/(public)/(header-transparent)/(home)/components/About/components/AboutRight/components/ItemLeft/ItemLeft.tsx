"use client";

import { images } from "@/assets/images";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

function ItemLeft() {
    const t = useTranslations("Home");
    return (
        <div className="flex flex-col items-end gap-3 lg:gap-4">
            <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{
                    scale: 1,
                    transition: { duration: 0.7 },
                }}
                className="relative h-48 w-full overflow-hidden rounded-tr-[40px] rounded-bl-[40px] sm:h-60 lg:h-66 lg:rounded-tr-[90px] lg:rounded-bl-[90px]"
            >
                <Image
                    src={images.decor1}
                    alt="Sen Spa Reception"
                    fill
                    className="object-cover"
                />
            </motion.div>

            <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{
                    scale: 1,
                    transition: { duration: 0.5 },
                }}
                className="flex w-full flex-col justify-center rounded-tl-[50px] rounded-br-[50px] bg-(--primary-color) px-6 py-10 text-white sm:px-8 sm:py-12 lg:rounded-tl-[100px] lg:rounded-br-[100px] lg:px-13 lg:py-17.5"
            >
                <h3 className="mb-4 text-3xl font-black sm:text-5xl lg:mb-5 lg:text-6xl">
                    {t("About.counterText")}
                </h3>

                <div className="flex gap-2">
                    <div className="w-0.5 bg-white"></div>
                    <h4 className="text-base sm:text-lg lg:text-2xl">
                        {t("About.counterDesc")}
                    </h4>
                </div>
            </motion.div>
        </div>
    );
}

export default ItemLeft;
