import { images } from "@/assets/images";
import AutoBanner from "@/components/Auto/AutoBanner";
import Image from "next/image";
import ProductTabs from "./components/ProductTabs/ProductTabs";
import CardItem from "@/components/CardItem/CardItem";
import { getLocale, getTranslations } from "next-intl/server";
import { productService } from "@/services/productService";
import ProductItemsLoading from "./components/ProductItemsLoading/ProductItemsLoading";
import TabsLoading from "@/components/Loading/TabsLoading/TabsLoading";
import { productCategoryService } from "@/services/productCategoryService";
import AnimatedContent from "@/components/AnimatedContent";
import Pagination from "@/app/[locale]/(public)/components/Pagination/Pagination";

type Props = {
    params: Promise<{
        slug: string;
    }>;
    searchParams: {
        search?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        page?: string;
    };
};
export default async function ProductPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { search, minPrice, maxPrice, sort, page } = await searchParams;
    const locale = await getLocale();
    let loading = true;
    const t = await getTranslations("Product");

    if (!slug) {
        return <div>{t("emptyProduct")}</div>;
    }

    const productBySlug = await productService.list({
        categorySlug: slug,
        lang: locale,
        isActive: true,
        page: Number(page) || 1,
        limit: 10,
        search,
        minPrice,
        maxPrice,
        sort: sort || ("latest" as any),
    });

    const totalPages = productBySlug.pagination.totalPages;

    const productCategory = await productCategoryService.getBySlug(
        slug,
        locale,
    );

    loading = false;
    return (
        <div className="mb-20">
            <AutoBanner
                breadcrumbData={[
                    { title: productCategory.name, href: `/product/${slug}` },
                ]}
                isFilter
            />
            <div className="mt-14 mb-10 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-light text-(--primary-color) sm:text-4xl lg:text-[50px]">
                    {t("title")}
                </h2>

                <Image
                    src={images.lotus}
                    width={116}
                    height={25}
                    alt=""
                    className="mt-3.75"
                />
            </div>
            <div className="container">
                <div className="mb-10">
                    {/* Tabs */}
                    {loading ? <TabsLoading /> : <ProductTabs slug={slug} />}
                </div>

                {/* Card wrapper */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <>
                            {Array.from({ length: 9 }).map((_, index) => (
                                <ProductItemsLoading key={index} />
                            ))}
                        </>
                    ) : productBySlug.items.length <= 0 ? (
                        <div className="col-span-12 w-full text-center text-sm text-neutral-600 italic">
                            {t("emptyProduct")}
                        </div>
                    ) : (
                        productBySlug.items.map((product, index) => (
                            <AnimatedContent
                                key={product.id}
                                delay={index / 10}
                            >
                                <CardItem
                                    basePath={"product"}
                                    item={product}
                                    key={index}
                                />
                            </AnimatedContent>
                        ))
                    )}
                </div>
                <div className="mt-10 flex justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}
