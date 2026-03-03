"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { mediaCategorySchema } from "@/app/admin/media/category/new/schema";
import ProductCategoryForm from "@/app/admin/products/category/new/ProductCategoryForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function ProductCategoryCreatePage() {
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
                    name: "Thiết bị điện tử",
                    slug: "thiet-bi-dien-tu",
                },
                {
                    language_code: "en",
                    name: "Electronics",
                    slug: "electronics",
                },
                {
                    language_code: "fr",
                    name: "Électronique",
                    slug: "electronique",
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

            <ProductCategoryForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default ProductCategoryCreatePage;
