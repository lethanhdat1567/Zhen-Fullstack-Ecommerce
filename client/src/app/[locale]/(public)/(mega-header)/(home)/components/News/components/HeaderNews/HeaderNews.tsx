import { images } from "@/assets/images";
import AnimatedContent from "@/components/AnimatedContent";
import SplitText from "@/components/SplitText";
import { useTranslations } from "next-intl";
import Image from "next/image";

function HeaderNews() {
    const t = useTranslations("Home");

    return (
        <div className="mb-10 text-center">
            <div className="mb-10">
                <SplitText
                    text={t("News.title")}
                    className="font-serif text-3xl text-(--primary-color) sm:text-4xl lg:text-5xl"
                />

                <div className="mt-3 mb-8 md:mt-4 md:mb-10">
                    <Image
                        src={images.lotus}
                        width={116}
                        height={25}
                        alt="lotus"
                        className="mx-auto w-20 sm:w-24 lg:w-29"
                    />
                </div>
                <AnimatedContent>
                    <p className="mx-auto max-w-sm text-sm text-gray-600 sm:max-w-md sm:text-base lg:max-w-xl">
                        {t("News.desc")}
                    </p>
                </AnimatedContent>
            </div>
        </div>
    );
}

export default HeaderNews;
