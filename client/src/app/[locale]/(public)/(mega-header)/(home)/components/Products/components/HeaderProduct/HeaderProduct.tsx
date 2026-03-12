"use client";

import { images } from "@/assets/images";
import SplitText from "@/components/SplitText";
import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";
import { useTranslations } from "next-intl";

function HeaderProduct() {
    const t = useTranslations("Home.Products");

    return (
        <div className="mb-12 px-4 text-center md:mb-10">
            <div className="mb-6 md:mb-8">
                <SplitText
                    text={t("title")}
                    className="font-serif text-3xl text-(--primary-color) md:text-4xl lg:text-5xl"
                />

                <div className="mt-3 md:mt-4">
                    <Image
                        src={images.lotus}
                        width={116}
                        height={25}
                        alt="lotus"
                        className="mx-auto w-20 sm:w-24 lg:w-29"
                    />
                </div>
            </div>

            <AnimatedContent>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
                    {t("desc")}
                </p>
            </AnimatedContent>
        </div>
    );
}

export default HeaderProduct;
