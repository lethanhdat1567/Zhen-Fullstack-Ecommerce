import { Link } from "@/i18n/navigation";
import { Flower } from "lucide-react";
import { serviceCategoryService } from "@/services/serviceCategoryService";
import { getLocale, getTranslations } from "next-intl/server";
import AnimatedContent from "@/components/AnimatedContent";

interface IProps {
    slug: string;
}

async function ServiceSidebar({ slug }: IProps) {
    const locale = await getLocale();
    const listServiceCategoryData = await serviceCategoryService.list({
        lang: locale,
    });
    const t = await getTranslations("Service");

    return (
        <AnimatedContent className="w-77.5">
            {/* Header */}
            <div className="flex items-center rounded-tl-[40px] bg-(--primary-color) py-4.75 pl-15 text-[24px] font-medium text-white">
                <Flower size={30} className="mr-2" />
                <h3>{t("title")}</h3>
            </div>

            {/* Card body */}
            <div className="rounded-br-[40px] bg-[#f4f4f4]">
                <ul className="px-8.75 pb-2.5">
                    {listServiceCategoryData.items.map((item) => {
                        const isActive = item.slug === slug;

                        return (
                            <li key={item.id}>
                                <Link
                                    href={`/services/${item.slug}`}
                                    className={`flex items-center gap-2.5 px-3.75 py-5 text-[15px] hover:text-(--primary-color) ${
                                        isActive
                                            ? "font-semibold text-(--primary-color)"
                                            : "font-normal text-[#6b6b6b]"
                                    }`}
                                >
                                    {isActive && <Flower size={16} />}
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </AnimatedContent>
    );
}

export default ServiceSidebar;
