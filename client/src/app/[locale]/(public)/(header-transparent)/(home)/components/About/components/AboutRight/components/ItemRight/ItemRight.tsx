"use client";

import { images } from "@/assets/images";
import Image from "next/image";
import { motion } from "motion/react";

function ItemRight() {
    return (
        <div className="flex h-full flex-col justify-center gap-3 lg:gap-4">
            <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{
                    scale: 1,
                    transition: { duration: 0.5 },
                }}
                className="relative h-40 overflow-hidden rounded-tl-[40px] rounded-br-[40px] sm:h-48 md:h-56 lg:h-66 lg:rounded-tl-[90px] lg:rounded-br-[90px]"
            >
                <Image
                    src={images.decor2}
                    alt="Spa Candles"
                    fill
                    className="object-cover"
                />
            </motion.div>

            <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{
                    scale: 1,
                    transition: { duration: 0.7 },
                }}
                className="relative h-40 overflow-hidden rounded-tr-[40px] rounded-bl-[40px] sm:h-48 md:h-56 lg:h-66 lg:rounded-tr-[90px] lg:rounded-bl-[90px]"
            >
                <Image
                    src={images.decor3}
                    alt="Spa Treatment"
                    fill
                    className="object-cover"
                />
            </motion.div>
        </div>
    );
}

export default ItemRight;
