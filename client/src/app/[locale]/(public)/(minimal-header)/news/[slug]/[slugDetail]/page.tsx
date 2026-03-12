import { postService } from "@/services/postService";
import { getLocale } from "next-intl/server";
import PostDetailContent from "./components/PostDetailContent/PostDetailContent";
import PostDetailLoading from "./components/PostDetailLoading/PostDetailLoading";
import AutoBanner from "@/components/Auto/AutoBanner";
import { postCategoryService } from "@/services/postCategoryService";
type Props = {
    params: Promise<{
        slug: string;
        slugDetail: string;
    }>;
};

export default async function PostDetailPage({ params }: Props) {
    const { slugDetail, slug } = await params;
    const locale = await getLocale();
    let loading = true;

    const getPostDetail: any = await postService.getDetail(slugDetail, locale);

    const getCategory: any = await postCategoryService.getDetail(slug, locale);

    loading = false;

    return (
        <div>
            <AutoBanner
                breadcrumbData={[
                    {
                        title: getCategory.name,
                        href: `/news/${getCategory.slug}`,
                    },
                    {
                        title: getPostDetail.name,
                        href: `/news/${getCategory.slug}/${getPostDetail.slug}`,
                    },
                ]}
                hideBanner
            />

            <div className="container pb-20">
                {loading ? (
                    <PostDetailLoading />
                ) : (
                    <PostDetailContent post={getPostDetail} />
                )}
            </div>
        </div>
    );
}
