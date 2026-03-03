import ServiceItemLoading from "@/app/[locale]/(public)/(header-bg)/services/[slug]/components/ServiceItemLoading/ServiceItemLoading";
import ServiceSidebar from "@/app/[locale]/(public)/(header-bg)/services/[slug]/components/ServiceSidebar/ServiceSidebar";
import { ServiceSlug } from "@/app/[locale]/(public)/(header-bg)/services/[slug]/data";

import AutoBanner from "@/components/Auto/AutoBanner";
import CardItem from "@/components/CardItem/CardItem";
import { serviceService } from "@/services/service";
import { getLocale, getTranslations } from "next-intl/server";
import ServiceSidebarLoading from "./components/ServiceSidebarLoading/ServiceSidebarLoading";
import { serviceCategoryService } from "@/services/serviceCategoryService";
import AnimatedContent from "@/components/AnimatedContent";

type Props = {
    params: Promise<{
        slug: ServiceSlug;
    }>;
};

export default async function ServicePage({ params }: Props) {
    const t = await getTranslations("Site");
    const { slug } = await params;
    const locale = await getLocale();
    let loading = true;

    if (!slug) {
        return <div>Không tìm thấy dịch vụ</div>;
    }

    const serviceBySlug = await serviceService.listServices({
        categorySlug: slug,
        lang: locale,
        isActive: true,
    });
    const serviceCategory = await serviceCategoryService.detailBySlug(
        slug,
        locale,
    );

    loading = false;

    return (
        <div className="mb-20">
            <div>
                <AutoBanner
                    breadcrumbData={[
                        {
                            title: serviceCategory.name,
                            href: `services/${slug}`,
                        },
                    ]}
                />
            </div>
            <div className="container grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="col col-span-4 hidden lg:block">
                    {loading ? (
                        <ServiceSidebarLoading />
                    ) : (
                        <ServiceSidebar slug={slug} />
                    )}
                </div>
                {loading ? (
                    <div className="col col-span-8 grid grid-cols-2 gap-10">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <ServiceItemLoading key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="col-span-12 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-8">
                        {serviceBySlug.items.length === 0 ? (
                            <div className="col-span-2 text-sm text-neutral-600 italic">
                                {t("emptyService")}
                            </div>
                        ) : (
                            serviceBySlug.items.map((service, index) => (
                                <AnimatedContent
                                    key={service.id}
                                    delay={index / 10}
                                >
                                    <CardItem
                                        basePath="services"
                                        item={service}
                                        slug={slug}
                                    />
                                </AnimatedContent>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
