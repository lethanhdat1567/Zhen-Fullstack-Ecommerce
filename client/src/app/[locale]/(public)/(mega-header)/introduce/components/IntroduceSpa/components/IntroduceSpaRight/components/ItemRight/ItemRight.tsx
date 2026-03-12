"use client";

import { images } from "@/assets/images";
import Image from "next/image";
import { motion } from "motion/react";

function ItemRight() {
    return (
        <div className="flex h-full flex-col justify-center gap-2.5">
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{
                    scale: 1,
                    transition: { duration: 1 },
                }}
                className="relative h-60 overflow-hidden rounded-tl-[90px] rounded-br-[90px]"
            >
                <Image
                    src={images.decor7}
                    alt="Spa Candles"
                    fill
                    className="object-cover"
                />
            </motion.div>

            <motion.div
                initial={{ scale: 0 }}
                whileInView={{
                    scale: 1,
                    transition: { duration: 1 },
                }}
                className="relative h-60 overflow-hidden rounded-tr-[90px] rounded-bl-[90px]"
            >
                <Image
                    src={images.decor8}
                    alt="Spa Treatment"
                    fill
                    className="object-cover"
                />
            </motion.div>
        </div>
    );
}

export default ItemRight;
