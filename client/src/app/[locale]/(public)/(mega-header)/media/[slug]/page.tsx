import AutoBanner from "@/components/Auto/AutoBanner";
import { MediaSlug } from "./data";
import MediaTags from "./components/MediaTags/MediaTags";
import Image from "next/image";
import { images } from "@/assets/images";
import MediaGallery from "./components/MediaGallery/MediaGallery";
import { mediaCategoryService } from "@/services/mediaCategoryService";
import { getLocale, getTranslations } from "next-intl/server";

type Props = {
    params: Promise<{
        slug: MediaSlug;
    }>;
};
export default async function MediaPage({ params }: Props) {
    const { slug } = await params;
    const locale = await getLocale();
    const t = await getTranslations("Media");

    if (!slug) {
        return <div>{t("emptyMedia")}</div>;
    }

    const mediaCategory = await mediaCategoryService.getBySlug(slug, locale);

    return (
        <div className="mb-25">
            <AutoBanner
                breadcrumbData={[
                    {
                        title: mediaCategory.name,
                        href: `/media/${mediaCategory.slug}`,
                    },
                ]}
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
                    <MediaTags mediaCategorySlug={slug} />
                </div>
                <MediaGallery />
            </div>
        </div>
    );
}
