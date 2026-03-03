import Image from "next/image";
import Button from "../../../../../../../../../components/Button/button";
import { resolveMediaSrc } from "@/lib/image";
import AnimatedContent from "@/components/AnimatedContent";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { serviceService } from "@/services/service";
import { useEffect, useState } from "react";
interface IProps {
    src: string;
    isActive: boolean;
}

function SwiperItem({ src, isActive }: IProps) {
    const t = useTranslations("Home");
    const locale = useLocale();
    const [serviceSlug, setServiceSlug] = useState("");

    const fetchServices = async () => {
        const res = await serviceService.listServices({
            limit: 1,
            lang: locale,
        });

        setServiceSlug(res.items[0].slug);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchServices();
    }, [locale]);

    return (
        <div className="relative h-full w-full">
            <Image
                src={resolveMediaSrc(src)}
                alt="ZHEN"
                fill
                className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div
                className={`absolute bottom-14 left-5 pr-2 text-white transition-transform duration-700 ease-out sm:pl-0 md:bottom-30 md:left-40 lg:bottom-40 lg:left-70 ${
                    isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0"
                }`}
            >
                <AnimatedContent duration={2}>
                    <h2 className="mb-5 max-w-5xl text-left text-4xl font-bold md:text-5xl lg:text-6xl">
                        {t("Hero.title")}
                    </h2>
                </AnimatedContent>

                <AnimatedContent duration={2} delay={0.1}>
                    <p className="mt-2 mb-10 max-w-3xl text-lg leading-snug md:text-xl lg:text-2xl">
                        {t("Hero.desc")}
                    </p>
                </AnimatedContent>

                <AnimatedContent duration={2} delay={0.2}>
                    <Link href={`/services/${serviceSlug}`}>
                        <Button className="text-md bg-(--primary-color) lg:text-lg">
                            {t("Hero.btnText")}
                        </Button>
                    </Link>
                </AnimatedContent>
            </div>
        </div>
    );
}

export default SwiperItem;
