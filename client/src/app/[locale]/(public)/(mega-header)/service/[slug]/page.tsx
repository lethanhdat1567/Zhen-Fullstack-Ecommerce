import { ServiceSlug } from "@/app/[locale]/(public)/(mega-header)/service/[slug]/data";

import AutoBanner from "@/components/Auto/AutoBanner";
import CardItem from "@/components/CardItem/CardItem";
import { serviceService } from "@/services/service";
import { getLocale, getTranslations } from "next-intl/server";
import ServiceSidebarLoading from "./components/ServiceSidebarLoading/ServiceSidebarLoading";
import { serviceCategoryService } from "@/services/serviceCategoryService";
import AnimatedContent from "@/components/AnimatedContent";
import ServiceItemLoading from "@/app/[locale]/(public)/(mega-header)/service/[slug]/components/ServiceItemLoading/ServiceItemLoading";
import ServiceSidebar from "@/app/[locale]/(public)/(mega-header)/service/[slug]/components/ServiceSidebar/ServiceSidebar";
import Pagination from "@/app/[locale]/(public)/components/Pagination/Pagination";

type Props = {
    params: Promise<{
        slug: ServiceSlug;
    }>;

    searchParams: {
        search?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        page?: string;
    };
};

export default async function ServicePage({ params, searchParams }: Props) {
    const t = await getTranslations("Site");
    const { slug } = await params;
    const { search, minPrice, maxPrice, sort, page } = await searchParams;
    const locale = await getLocale();

    let loading = true;

    if (!slug) {
        return <div>Không tìm thấy dịch vụ</div>;
    }

    const serviceBySlug = await serviceService.listServices({
        categorySlug: slug,
        lang: locale,
        isActive: true,
        search,
        minPrice,
        maxPrice,
        sort: sort || ("latest" as any),
        limit: 10,
        page: page || 1,
    });
    const totalPages = serviceBySlug.pagination.totalPages;

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
                            href: `service/${slug}`,
                        },
                    ]}
                    isFilter
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
                                        basePath="service"
                                        item={service}
                                    />
                                </AnimatedContent>
                            ))
                        )}

                        <div className="col-span-full flex justify-center pt-4">
                            <Pagination totalPages={totalPages} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
