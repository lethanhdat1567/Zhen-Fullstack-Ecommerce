"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { mediaCategorySchema } from "@/app/admin/media/category/new/schema";
import MediaCategoryForm from "@/app/admin/media/category/new/MediaCategoryForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function MediaCategoryPage() {
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    // Form
    const form = useForm<z.infer<typeof mediaCategorySchema>>({
        resolver: zodResolver(mediaCategorySchema),
        mode: "onChange",
        defaultValues: {
            status: "active",
            translations: [
                {
                    language_code: "vi",
                    name: "Danh mục dịch vụ",
                    slug: "danh-muc-dich-vu",
                },
                {
                    language_code: "en",
                    name: "Service Category",
                    slug: "service-category",
                },
                {
                    language_code: "fr",
                    name: "Catégorie de service",
                    slug: "categorie-de-service",
                },
            ],
        },
    });

    return (
        <div className="mx-auto w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackBtn />
                    <Title title="Thêm mới danh mục" />
                </div>
                <div className="flex items-center gap-4">
                    <TabsTranslate
                        activeLang={activeLang}
                        onChange={(v) => setActiveLang(v as "vi" | "en" | "fr")}
                    />
                    <TranslateBtn
                        activeLang={activeLang}
                        form={form}
                        fields={["name", "slug"]}
                    />
                </div>
            </div>

            <MediaCategoryForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default MediaCategoryPage;
