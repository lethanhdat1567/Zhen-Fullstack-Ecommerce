import { images } from "@/assets/images";
import Image from "next/image";
import NewsTabs from "./components/NewsTabs/NewsTabs";
import { CategorySlug } from "./data";
import NewsSideList from "./components/NewsSideList/NewsSideList";
import PostCard from "@/components/PostCard/PostCard";
import { Post, postService } from "@/services/postService";
import { getLocale, getTranslations } from "next-intl/server";
import TabsLoading from "@/components/Loading/TabsLoading/TabsLoading";
import NewsSideListLoading from "./components/NewsSideListLoading/NewsSideListLoading";
import NewsCardItemLoading from "./components/NewsCardItemLoading/NewsCardItemLoading";
import AutoBanner from "@/components/Auto/AutoBanner";
import AnimatedContent from "@/components/AnimatedContent";

type Props = {
    params: Promise<{
        slug: CategorySlug;
    }>;
};

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const locale = await getLocale();
    const t = await getTranslations("Post");
    let loading = true;

    const listPostByCategorySlug = await postService.list({
        lang: locale,
        isActive: true,
        categorySlug: slug,
        page: 1,
        limit: 9,
    });

    loading = false;

    if (!slug) {
        return <div>{t("emptyPost")}</div>;
    }

    return (
        <div className="mb-20">
            <AutoBanner
                breadcrumbData={[{ title: "Tin tức", href: "/news" }]}
            />
            <div className="mt-14 mb-10 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-light text-(--primary-color) sm:text-4xl md:text-5xl lg:text-[50px]">
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
                    {loading ? <TabsLoading /> : <NewsTabs slug={slug} />}
                </div>

                {listPostByCategorySlug.items.length === 0 ? (
                    <div className="text-center text-sm text-neutral-600 italic">
                        {t("emptyPost")}
                    </div>
                ) : (
                    <>
                        <div className="mb-10">
                            {loading ? (
                                <NewsSideListLoading />
                            ) : (
                                <NewsSideList
                                    posts={
                                        listPostByCategorySlug?.items.slice(
                                            0,
                                            3,
                                        ) || []
                                    }
                                />
                            )}
                        </div>

                        <div className="grid gap-3 lg:grid-cols-3">
                            {loading
                                ? Array.from({ length: 3 }).map((_, index) => (
                                      <NewsCardItemLoading key={index} />
                                  ))
                                : listPostByCategorySlug?.items
                                      .slice(3)
                                      .map((item: Post, index: number) => (
                                          <AnimatedContent
                                              key={item.id}
                                              delay={index / 10}
                                          >
                                              <PostCard item={item} />
                                          </AnimatedContent>
                                      ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
