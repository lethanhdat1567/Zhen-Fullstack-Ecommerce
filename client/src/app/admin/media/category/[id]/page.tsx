"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { mediaCategorySchema } from "@/app/admin/media/category/new/schema";
import MediaCategoryForm from "@/app/admin/media/category/new/MediaCategoryForm";
import { useParams } from "next/navigation";
import { mediaCategoryService } from "@/services/mediaCategoryService";
import LoadingForm from "@/app/admin/components/LoadingForm/LoadingForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function MediaCategoryUpdatePage() {
    const params = useParams();
    const categoryId = params.id;
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");
    const [loading, setLoading] = useState(true);

    // Form
    const form = useForm<z.infer<typeof mediaCategorySchema>>({
        resolver: zodResolver(mediaCategorySchema),
        mode: "onChange",
        defaultValues: {
            status: "active",
            translations: [
                { language_code: "vi", name: "", slug: "" },
                { language_code: "en", name: "", slug: "" },
                { language_code: "fr", name: "", slug: "" },
            ],
        },
    });

    const fetchCategory = async () => {
        try {
            const res = await mediaCategoryService.getById(
                categoryId as string,
            );

            const translation = res.translations.map((item: any) => {
                return {
                    language_code: item.language.code,
                    name: item.name,
                    slug: item.slug,
                };
            });

            form.setValue("translations", translation);
            form.setValue("status", res.status);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [categoryId]);

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

            {loading ? (
                <LoadingForm />
            ) : (
                <MediaCategoryForm
                    activeLang={activeLang}
                    form={form}
                    updateId={categoryId as string}
                />
            )}
        </div>
    );
}

export default MediaCategoryUpdatePage;
