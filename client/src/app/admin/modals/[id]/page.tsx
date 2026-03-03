"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { useParams } from "next/navigation";
import { popupSchema } from "@/app/admin/modals/new/schema";
import { popupService } from "@/services/popupService";
import PopupForm from "@/app/admin/modals/new/PopupForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function PopupUpdatePage() {
    const params = useParams();
    const categoryId = params.id;
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    const form = useForm<z.infer<typeof popupSchema>>({
        resolver: zodResolver(popupSchema) as any,
        defaultValues: {
            status: "active",
            thumbnail: "",
            sort_order: 0,
            translations: [
                {
                    language_code: "vi",
                    title: "",
                    content: "",
                },
                {
                    language_code: "en",
                    title: "",
                    content: "",
                },
                {
                    language_code: "fr",
                    title: "",
                    content: "",
                },
            ],
        },
    });

    const fetchCategory = async () => {
        try {
            const res = await popupService.detail(categoryId as string);

            const translation = res.translations.map((item: any) => {
                return {
                    language_code: item.language.code,
                    title: item.title,
                    content: item.content,
                };
            });

            form.setValue("translations", translation);
            form.setValue("status", res.status);
            form.setValue("thumbnail", res.thumbnail);
        } catch (error) {
            console.log(error);
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
                    <Title title="Thêm mới Popup" />
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

            <PopupForm
                activeLang={activeLang}
                form={form}
                updateId={categoryId as string}
            />
        </div>
    );
}

export default PopupUpdatePage;
