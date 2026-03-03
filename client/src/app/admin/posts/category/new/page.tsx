"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { mediaCategorySchema } from "@/app/admin/media/category/new/schema";
import PostCategoryForm from "@/app/admin/posts/category/new/PostCategoryForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function ProductCategoryUpdatePage() {
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
                    name: "Thiết kế Website",
                    slug: "thiet-ke-website",
                },
                {
                    language_code: "en",
                    name: "Website Design",
                    slug: "website-design",
                },
                {
                    language_code: "fr",
                    name: "Conception de site web",
                    slug: "conception-site-web",
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

            <PostCategoryForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default ProductCategoryUpdatePage;
