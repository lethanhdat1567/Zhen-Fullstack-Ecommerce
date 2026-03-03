import AutoBanner from "@/components/Auto/AutoBanner";
import { ServiceSlug } from "../data";
import ServiceIntroduction from "./components/ServiceIntroduction/ServiceIntroduction";
import DetailItem from "@/components/DetailItem/DetailItem";
import CardRelated from "@/components/CardRelated/CardRelated";
import { serviceService } from "@/services/service";
import { getLocale } from "next-intl/server";
import DetailItemLoading from "@/components/Loading/DetailItemLoading/DetailItemLoading";
import DetailItemIntroductionLoading from "@/components/Loading/DetailItemIntroductionLoading/DetailItemIntroductionLoading";
import { serviceCategoryService } from "@/services/serviceCategoryService";

type Props = {
    params: {
        slug: ServiceSlug;
        slugDetail: string;
    };
};

export default async function ServiceDetailPage({ params }: Props) {
    const { slugDetail, slug } = await params;
    const locale = await getLocale();
    let loading = true;

    // * Service detail
    const getServiceDetail = await serviceService.getServiceDetail(
        slugDetail,
        locale,
    );

    // * Service category
    const serviceCategory = await serviceCategoryService.detailBySlug(
        slug,
        locale,
    );

    // * Related services
    const relatedServices = await serviceService.getRelatedServices({
        lang: locale,
        limit: 6,
        isActive: true,
        excludeIds: [getServiceDetail.id],
    });

    loading = false;

    if (!slugDetail) {
        return <div>Không tìm thấy dịch vụ</div>;
    }

    return (
        <div className="mb-20">
            <AutoBanner
                breadcrumbData={[
                    {
                        title: serviceCategory.name,
                        href: `/services/${serviceCategory.slug}`,
                    },
                    {
                        title: getServiceDetail.title,
                        href: `/services/${serviceCategory.slug}/${getServiceDetail.slug}`,
                    },
                ]}
            />
            <div className="container rounded-[10px] bg-white p-12.5 shadow-[0_0_87px_rgba(0,0,0,0.1)]">
                {loading ? (
                    <div>
                        <DetailItemLoading />

                        <DetailItemIntroductionLoading />
                    </div>
                ) : (
                    <div>
                        <DetailItem item={getServiceDetail} />
                        <ServiceIntroduction service={getServiceDetail} />
                    </div>
                )}
            </div>
            <CardRelated slug={slug} item={relatedServices as any} />
        </div>
    );
}
