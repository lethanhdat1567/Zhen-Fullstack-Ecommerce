import { images } from "@/assets/images";
import Image from "next/image";
import IntroduceAwardItem from "./components/IntroduceAwardItem/IntroduceAwardItem";
import { getTranslations } from "next-intl/server";

async function IntroduceAward() {
    const t = await getTranslations("Introduce");

    return (
        <section className="py-14 md:py-20 lg:py-22.5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
                    {/* Left Content */}
                    <div className="text-center lg:col-span-4 lg:text-left">
                        <div className="relative mb-6 lg:mb-10">
                            <h2 className="mb-3 text-3xl font-semibold text-(--primary-color) md:text-4xl lg:text-[50px]">
                                {t("IntroduceAward.title")}
                            </h2>

                            <div className="flex justify-center lg:justify-start">
                                <Image
                                    src={images.lotus}
                                    width={116}
                                    height={25}
                                    alt="lotus"
                                />
                            </div>
                        </div>

                        <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-600 md:text-base lg:mx-0">
                            {t("IntroduceAward.desc")}
                        </p>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-8">
                        <IntroduceAwardItem />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default IntroduceAward;
