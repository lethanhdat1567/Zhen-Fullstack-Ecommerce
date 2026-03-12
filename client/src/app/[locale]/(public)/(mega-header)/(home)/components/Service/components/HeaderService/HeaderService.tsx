import { images } from "@/assets/images";
import AnimatedContent from "@/components/AnimatedContent";
import SplitText from "@/components/SplitText";
import { useTranslations } from "next-intl";
import Image from "next/image";

function HeaderService() {
    const t = useTranslations("Home");

    return (
        <div className="mb-12 text-center md:mb-10">
            <div className="mb-8 md:mb-10">
                <SplitText
                    text={t("Service.title")}
                    className="font-serif text-3xl text-(--primary-color) sm:text-4xl lg:text-5xl"
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
                <p className="mx-auto max-w-sm text-sm text-gray-600 sm:max-w-md sm:text-base lg:max-w-xl">
                    {t("Service.desc")}
                </p>
            </AnimatedContent>
        </div>
    );
}

export default HeaderService;
