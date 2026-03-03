"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { productSchema } from "@/app/admin/products/new/schema";
import ProductForm from "@/app/admin/products/new/ProductForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function ProductCreatePage() {
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    // Form
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema) as any,
        mode: "onChange",
        defaultValues: {
            category_id: "1508cccd-9f19-4b29-8f54-87551c88c7fc",

            price: 0,
            sale_price: 0,
            stock: 0,

            thumbnail: "/uploads/products/product-main.jpg",

            status: "active",

            translations: [
                {
                    language_code: "vi",
                    title: "Serum dưỡng da cao cấp",
                    slug: "serum-duong-da-cao-cap",
                    description: "Serum dưỡng da giúp da sáng và mịn.",
                    content: `
                    <h2>Giới thiệu</h2>
                    <p>Serum cao cấp giúp cải thiện làn da rõ rệt.</p>
                `,
                },
                {
                    language_code: "en",
                    title: "Premium Skin Serum",
                    slug: "premium-skin-serum",
                    description: "High quality serum for glowing skin.",
                    content: `
                    <h2>Introduction</h2>
                    <p>Premium serum improves your skin texture.</p>
                `,
                },
                {
                    language_code: "fr",
                    title: "Sérum de soin premium",
                    slug: "serum-soin-premium",
                    description:
                        "Sérum de haute qualité pour une peau éclatante.",
                    content: `
                    <h2>Introduction</h2>
                    <p>Un sérum premium pour améliorer la peau.</p>
                `,
                },
            ],

            galleries: [],
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
            <ProductForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default ProductCreatePage;
