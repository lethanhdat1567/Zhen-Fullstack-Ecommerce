import AnimatedContent from "@/components/AnimatedContent";
import TabsLoading from "@/components/Loading/TabsLoading/TabsLoading";
import { Link } from "@/i18n/navigation";
import { mediaCategoryService } from "@/services/mediaCategoryService";
import { getLocale } from "next-intl/server";

interface IProps {
    mediaCategorySlug: string;
}
async function MediaTags({ mediaCategorySlug }: IProps) {
    let loading = true;
    const locale = await getLocale();

    const mediaData = await mediaCategoryService.list({
        isActive: true,
        lang: locale,
    });

    if (!mediaData.items.length) return null;

    loading = false;

    return loading ? (
        <TabsLoading />
    ) : (
        <ul className="flex flex-wrap items-center justify-center gap-4">
            {mediaData.items.map((item, index) => {
                const isActive = mediaCategorySlug === item.slug;

                return (
                    <AnimatedContent
                        key={item.id}
                        delay={index / 10}
                        distance={80}
                    >
                        <li
                            key={index}
                            className={`group flex h-11.25 items-center rounded-tr-[23px] rounded-bl-[23px] border px-6.25 text-sm uppercase md:text-lg ${
                                isActive
                                    ? "border-(--primary-color) bg-(--primary-color) text-white"
                                    : "border-(--primary-color) text-(--primary-color)"
                            }`}
                        >
                            <Link
                                className="flex h-full w-full items-center justify-center"
                                href={item.slug}
                            >
                                {item.name}
                            </Link>
                        </li>
                    </AnimatedContent>
                );
            })}
        </ul>
    );
}

export default MediaTags;
