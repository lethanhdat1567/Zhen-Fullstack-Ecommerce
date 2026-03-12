import { images } from "@/assets/images";
import AnimatedContent from "@/components/AnimatedContent";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

async function IntroduceSpaLeft() {
    const t = await getTranslations("Introduce");
    return (
        <div className="w-full">
            {/* Title */}
            <div className="relative mb-8 lg:mb-10">
                <AnimatedContent>
                    <h2 className="pb-6 text-3xl leading-tight text-(--primary-color) sm:text-4xl lg:text-5xl">
                        {t("IntroduceSpa.title")}
                    </h2>
                </AnimatedContent>

                <Image src={images.lotus} width={116} height={25} alt="lotus" />
            </div>

            {/* Content */}
            <AnimatedContent delay={0.2}>
                <div className="space-y-4 text-base leading-relaxed text-gray-700 lg:text-lg">
                    <p>{t("IntroduceSpa.desc")}</p>

                    <p>{t("IntroduceSpa.desc2")}</p>
                </div>
            </AnimatedContent>
        </div>
    );
}

export default IntroduceSpaLeft;
