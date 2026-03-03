"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { useParams } from "next/navigation";
import { createServiceSchema } from "@/app/admin/services/new/form";
import { serviceService } from "@/services/service";
import ServiceForm from "@/app/admin/services/new/ServiceForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function ServiceUpdatePage() {
    const params = useParams();
    const serviceId = params.id;
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    // Form
    const form = useForm<z.infer<typeof createServiceSchema>>({
        resolver: zodResolver(createServiceSchema) as any,
        mode: "onChange",
        defaultValues: {
            category_id: "",
            price: 0,
            thumbnail: "/uploads/images/seo.jpg",
            status: "active",
            sku: "",
            translations: [
                {
                    language_code: "vi",
                    title: "",
                    slug: "",
                    description: "",
                    content: "",
                },
                {
                    language_code: "en",
                    title: "",
                    slug: "",
                    description: "",
                    content: "",
                },
                {
                    language_code: "fr",
                    title: "",
                    slug: "",
                    description: "",
                    content: "",
                },
            ],
            galleries: [],
        },
    });

    const fetchService = async () => {
        try {
            const res: any = await serviceService.getServiceById(
                serviceId as string,
            );

            /* =========================
           TRANSLATIONS
        ========================== */

            const defaultLangs = ["vi", "en", "fr"];

            const translations = defaultLangs.map((lang) => {
                const found = res.translations.find((t: any) => {
                    // nếu BE có include language relation thì dùng t.language.code
                    // hiện tại BE chưa trả về language nên map theo thứ tự
                    return (
                        t.language?.code === lang ||
                        // fallback nếu BE không include language
                        res.translations.indexOf(t) ===
                            defaultLangs.indexOf(lang)
                    );
                });

                return {
                    language_code: lang,
                    title: found?.title || "",
                    slug: found?.slug || "",
                    description: found?.description || "",
                    content: found?.content || "",
                };
            });

            /* =========================
           GALLERIES
        ========================== */

            const galleries =
                res.galleries?.map((item: any) => ({
                    id: item.id,
                    file_url: item.image,
                    sort_order: item.sort_order,
                    type: "image",
                })) || [];

            /* =========================
           RESET FORM
        ========================== */

            form.reset({
                category_id: res.category_id || "",
                price: Number(res.price) || 0,
                thumbnail: res.thumbnail || "",
                status: res.status || "active",
                sku: res.sku || "",
                translations,
                galleries,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchService();
    }, [serviceId]);

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
            <ServiceForm
                activeLang={activeLang}
                form={form}
                updateId={serviceId as any}
            />
        </div>
    );
}

export default ServiceUpdatePage;
