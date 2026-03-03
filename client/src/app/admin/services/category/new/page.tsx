"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import ServiceCategoryForm from "./ServiceCategoryForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createServiceSchema } from "@/app/admin/services/category/new/form";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function ServiceCategoryNewPage() {
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    // Form
    const form = useForm<z.infer<typeof createServiceSchema>>({
        resolver: zodResolver(createServiceSchema),
        mode: "onChange",
        defaultValues: {
            status: "active",
            translations: [
                {
                    language_code: "vi",
                    name: "Dịch vụ thiết kế website",
                    slug: "dich-vu-thiet-ke-website",
                },
                {
                    language_code: "en",
                    name: "Website Design Service",
                    slug: "website-design-service",
                },
                {
                    language_code: "fr",
                    name: "Service de conception de site web",
                    slug: "service-conception-site-web",
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

            <ServiceCategoryForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default ServiceCategoryNewPage;
