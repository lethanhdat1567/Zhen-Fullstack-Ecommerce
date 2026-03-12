import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { postCategoryService } from "@/services/postCategoryService";
import AnimatedContent from "@/components/AnimatedContent";

async function NewsTabs({ slug }: { slug: string }) {
    const locale = await getLocale();

    const res = await postCategoryService.list({
        lang: locale,
        isActive: true,
    });

    if (!res || res.items.length === 0) return null;

    return (
        <ul className="flex flex-wrap items-center justify-center gap-4">
            {res.items.map((item: any, index: number) => {
                return (
                    <AnimatedContent
                        key={item.id}
                        delay={index / 10}
                        distance={80}
                    >
                        <li
                            key={index}
                            className={`group flex h-11.25 items-center rounded-tr-[23px] rounded-bl-[23px] border px-6.25 text-sm md:text-lg ${
                                slug === item.slug
                                    ? "border-(--primary-color) bg-(--primary-color) text-white"
                                    : "border-[#e1e1e1] text-[#666666] hover:bg-(--primary-color) hover:text-white"
                            }`}
                        >
                            <Link
                                href={item.slug}
                                className="flex h-full w-full items-center justify-center"
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

export default NewsTabs;
