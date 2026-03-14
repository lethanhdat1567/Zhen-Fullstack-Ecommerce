import AutoBanner from "@/components/Auto/AutoBanner";
import DetailItem from "@/components/DetailItem/DetailItem";
import ProductIntroduction from "./components/ProductIntroduction/ProductIntroduction";
import { getLocale } from "next-intl/server";
import { productService } from "@/services/productService";
import DetailItemIntroductionLoading from "@/components/Loading/DetailItemIntroductionLoading/DetailItemIntroductionLoading";
import DetailItemLoading from "@/components/Loading/DetailItemLoading/DetailItemLoading";
import { productCategoryService } from "@/services/productCategoryService";
import CardRelated from "@/components/CardRelated/CardRelated";
import { ProductSlug } from "@/app/[locale]/(public)/(mega-header)/product/[slug]/data";

type Props = {
    params: {
        slug: ProductSlug;
        slugDetail: string;
    };
};
export default async function ProductDetailPage({ params }: Props) {
    const { slugDetail, slug } = await params;
    const locale = await getLocale();
    let loading = true;

    const getProductDetail = await productService.getBySlug(slugDetail, locale);

    const productCategory = await productCategoryService.getBySlug(
        slug,
        locale,
    );

    const relatedProduct = await productService.getRelatedProducts({
        categorySlug: slug,
        lang: locale,
        isActive: true,
        limit: 6,
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
                        title: productCategory.name,
                        href: `/product/${productCategory.slug}`,
                    },
                    {
                        title: getProductDetail.title,
                        href: `/product/${productCategory.slug}/${getProductDetail.slug}`,
                    },
                ]}
                hideBanner
            />
            <div className="container rounded-[10px] bg-white p-12.5 shadow-[0_0_87px_rgba(0,0,0,0.1)]">
                {loading ? (
                    <div>
                        <DetailItemLoading />
                        <DetailItemIntroductionLoading />
                    </div>
                ) : (
                    <>
                        <DetailItem item={getProductDetail} type="product" />
                        <ProductIntroduction product={getProductDetail} />
                    </>
                )}
            </div>
            <CardRelated type="product" item={relatedProduct as any[]} />
        </div>
    );
}
