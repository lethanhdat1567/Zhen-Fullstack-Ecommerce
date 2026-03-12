import { images } from "@/assets/images";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import { getTranslations } from "next-intl/server";

async function IntroduceConceptItem() {
    const t = await getTranslations("Introduce.IntroduceConcept");

    const thumbnails = [
        images.icon_1,
        images.icon_2,
        images.icon_3,
        images.icon_4,
        images.icon_5,
    ];

    const items = t.raw("items").map((item: any, index: number) => ({
        ...item,
        thumbnail: thumbnails[index] || images.fallback,
    }));

    return (
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Content */}
            <div className="md:col-span-2 lg:col-span-4">
                <div className="relative mb-6 lg:mb-10">
                    <SplitText
                        textAlign="left"
                        text={t("title")}
                        className="mb-2 text-3xl font-medium text-(--primary-color) md:text-4xl lg:mb-2.5 lg:text-5xl"
                    />
                    <Image
                        src={images.lotus}
                        width={116}
                        height={25}
                        alt="lotus"
                        className="w-24 md:w-28 lg:w-auto"
                    />
                </div>

                <AnimatedContent>
                    <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                        {t("desc")}
                    </p>
                </AnimatedContent>
            </div>

            {/* Concept Items */}
            {items.map((item: any, index: number) => (
                <AnimatedContent
                    key={index}
                    className="md:col-span-1 lg:col-span-4"
                    delay={index / 10}
                >
                    <Image
                        src={item.thumbnail}
                        width={107}
                        height={105}
                        alt={item.title}
                        className="mb-4 object-cover"
                        style={{
                            filter: "sepia(1) hue-rotate(75deg) saturate(350%) brightness(0.9)",
                        }}
                    />
                    <h3 className="mb-3 text-base font-bold lg:text-[18px]">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 md:text-base">
                        {item.description}
                    </p>
                </AnimatedContent>
            ))}
        </div>
    );
}

export default IntroduceConceptItem;
