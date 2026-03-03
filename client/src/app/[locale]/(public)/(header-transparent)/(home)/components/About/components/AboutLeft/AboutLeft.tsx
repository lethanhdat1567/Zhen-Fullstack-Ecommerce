import Image from "next/image";
import Button from "../../../../../../../../../components/Button/button";
import { images } from "@/assets/images";
import AnimatedContent from "@/components/AnimatedContent";
import SplitText from "@/components/SplitText";
import { get } from "http";
import { getTranslations } from "next-intl/server";

async function AboutLeft() {
    const t = await getTranslations("Home");
    return (
        <div>
            <div className="relative mb-6 sm:mb-8 lg:mb-10">
                <SplitText
                    text={t("About.title")}
                    className="pb-6 text-3xl font-semibold text-(--primary-color) sm:text-4xl lg:text-5xl"
                />

                <Image
                    src={images.lotus}
                    width={116}
                    height={25}
                    alt="lotus"
                    className="mx-auto w-20 sm:w-24 lg:w-29"
                />
            </div>

            <AnimatedContent delay={0.1}>
                <div>
                    <p className="mb-4 text-sm leading-relaxed sm:text-base lg:mb-5">
                        {t("About.desc")}
                    </p>

                    <p className="mb-6 text-sm leading-relaxed sm:text-base lg:mb-5">
                        {t("About.desc2")}
                    </p>
                </div>
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
                <Button className="mt-0 border border-(--primary-color) text-(--primary-color) transition-all hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A,3px_3px_#8D388A] lg:mt-8">
                    {t("About.btnText")}
                </Button>
            </AnimatedContent>
        </div>
    );
}

export default AboutLeft;
