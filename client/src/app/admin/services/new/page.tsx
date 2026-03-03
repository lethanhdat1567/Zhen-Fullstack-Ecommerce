"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { createServiceSchema } from "@/app/admin/services/new/form";
import ServiceForm from "@/app/admin/services/new/ServiceForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function ServiceNewPage() {
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    const form = useForm<z.infer<typeof createServiceSchema>>({
        resolver: zodResolver(createServiceSchema) as any,
        mode: "onChange",
        defaultValues: {
            sku: "SEO-001",
            price: 1500000,
            thumbnail: "",
            status: "active",

            category_id: "",

            galleries: [],

            translations: [
                {
                    language_code: "vi",
                    title: "Dịch vụ SEO tổng thể",
                    slug: "dich-vu-seo-tong-the",
                    description: "Giải pháp SEO toàn diện",
                    content: "Nội dung SEO tiếng Việt...",
                },
                {
                    language_code: "en",
                    title: "Comprehensive SEO Service",
                    slug: "comprehensive-seo-service",
                    description: "Full SEO solution",
                    content: "English SEO content...",
                },
                {
                    language_code: "fr",
                    title: "Service SEO complet",
                    slug: "service-seo-complet",
                    description: "Solution SEO complète",
                    content: "Contenu SEO en français...",
                },
            ],
        },
    });

    return (
        <div className="mx-auto w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackBtn />
                    <Title title="Thêm mới dịch vụ" />
                </div>

                <div className="flex items-center gap-4">
                    <TabsTranslate
                        activeLang={activeLang}
                        onChange={(v) => setActiveLang(v as "vi" | "en" | "fr")}
                    />

                    <TranslateBtn
                        activeLang={activeLang}
                        form={form}
                        fields={["title", "slug"]}
                    />
                </div>
            </div>

            <ServiceForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default ServiceNewPage;
