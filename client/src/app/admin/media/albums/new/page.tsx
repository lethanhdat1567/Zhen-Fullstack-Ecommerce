"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { mediaAlbumSchema } from "@/app/admin/media/albums/new/schema";
import MediaAlbumForm from "@/app/admin/media/albums/new/MediaAlbumForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function MediaAlbumCategoryCreatePage() {
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    // Form
    const form = useForm<z.infer<typeof mediaAlbumSchema>>({
        resolver: zodResolver(mediaAlbumSchema),
        mode: "onChange",
        defaultValues: {
            category_id: "",
            thumbnail: "",

            galleries: [],

            translations: [
                {
                    language_code: "vi",
                    title: "Dịch vụ thiết kế website",
                    slug: "dich-vu-thiet-ke-website",
                    description:
                        "Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp, tối ưu SEO và hiệu suất.",
                },
                {
                    language_code: "en",
                    title: "Website Design Service",
                    slug: "website-design-service",
                    description:
                        "We provide professional website design services with SEO optimization and high performance.",
                },
                {
                    language_code: "fr",
                    title: "Service de conception de site web",
                    slug: "service-conception-site-web",
                    description:
                        "Nous fournissons des services professionnels de conception de sites web optimisés pour le SEO.",
                },
            ],
        },
    });

    return (
        <div className="mx-auto w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackBtn />
                    <Title title="Thêm mới album" />
                </div>
                <div className="flex items-center gap-4">
                    <TabsTranslate
                        activeLang={activeLang}
                        onChange={(v) => setActiveLang(v as "vi" | "en" | "fr")}
                    />
                    <TranslateBtn
                        activeLang={activeLang}
                        form={form}
                        fields={["name", "slug", "description"]}
                    />
                </div>
            </div>
            <MediaAlbumForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default MediaAlbumCategoryCreatePage;
