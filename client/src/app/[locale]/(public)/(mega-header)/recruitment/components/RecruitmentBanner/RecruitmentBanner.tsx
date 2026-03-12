import { images } from "@/assets/images";
import AnimatedContent from "@/components/AnimatedContent";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

async function RecruitmentBanner() {
    const t = await getTranslations("Recruitment");

    return (
        <div className="relative h-[60vh] md:h-full">
            {/* Background */}
            <Image
                src={images.sanh}
                fill
                alt=""
                className="object-cover"
                priority
            />

            <div className="absolute inset-0 flex items-center bg-black/40">
                <div className="container grid grid-cols-1 gap-8 px-6 font-medium text-white lg:grid-cols-2">
                    {/* LEFT */}
                    <AnimatedContent direction="horizontal">
                        <div className="uppercase">
                            <h3 className="mb-2.5 text-[14px] sm:text-[18px] lg:text-[20px]">
                                {t("badge")}
                            </h3>

                            <h1 className="text-[28px] leading-tight sm:text-[42px] lg:text-[55px] lg:leading-16">
                                {t("title")} <br />
                                <span className="text-(--primary-color)">
                                    {t("highlight")}
                                </span>
                            </h1>
                        </div>
                    </AnimatedContent>

                    {/* RIGHT */}
                    <AnimatedContent className="text-xs leading-relaxed sm:text-base lg:text-base">
                        {t("desc")}
                    </AnimatedContent>
                </div>
            </div>
        </div>
    );
}

export default RecruitmentBanner;
