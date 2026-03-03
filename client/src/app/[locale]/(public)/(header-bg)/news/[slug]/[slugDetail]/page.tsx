import AutoBanner from "@/components/Auto/AutoBanner";
import { postService } from "@/services/postService";
import { getLocale } from "next-intl/server";
import PostDetailContent from "./components/PostDetailContent/PostDetailContent";
import PostDetailLoading from "./components/PostDetailLoading/PostDetailLoading";
type Props = {
    params: Promise<{
        slug: string;
        slugDetail: string;
    }>;
};

export default async function PostDetailPage({ params }: Props) {
    const { slugDetail } = await params;
    const locale = await getLocale();
    let loading = true;

    const getPostDetail = await postService.getDetail(slugDetail, locale);

    loading = false;

    return (
        <div>
            {/* <AutoBanner breadcrumbData={{  }} /> */}

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
