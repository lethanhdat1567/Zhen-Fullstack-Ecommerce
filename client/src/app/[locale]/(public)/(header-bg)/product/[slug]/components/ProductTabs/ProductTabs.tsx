import AnimatedContent from "@/components/AnimatedContent";
import { Link } from "@/i18n/navigation";
import { productCategoryService } from "@/services/productCategoryService";
import { getLocale } from "next-intl/server";

interface Props {
    slug?: string;
}
async function ProductTabs({ slug }: Props) {
    const locale = await getLocale();
    const productCategoryData = await productCategoryService.list({
        lang: locale,
        isActive: true,
    });
    return (
        <ul className="flex flex-wrap items-center justify-center gap-6">
            {productCategoryData.items.map((item: any, index) => {
                return (
                    <AnimatedContent
                        key={item.id}
                        delay={index / 10}
                        distance={50}
                    >
                        <li
                            key={item.id}
                            className={`group h-11.25 rounded-tl-[23px] rounded-br-[23px] border px-6.25 text-sm md:text-lg ${
                                slug === item.slug
                                    ? "border-(--primary-color) bg-(--primary-color) text-white"
                                    : "border-(--primary-color) text-(--primary-color)"
                            }`}
                        >
                            <Link
                                href={item.slug}
                                className="flex h-full w-full items-center"
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

export default ProductTabs;
