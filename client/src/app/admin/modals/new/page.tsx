"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { popupSchema } from "@/app/admin/modals/new/schema";
import PopupForm from "@/app/admin/modals/new/PopupForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function AdminPopupCreatePage() {
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    // Form
    const form = useForm<z.infer<typeof popupSchema>>({
        resolver: zodResolver(popupSchema) as any,
        defaultValues: {
            status: "active",
            thumbnail: "",
            sort_order: 0,
            translations: [
                {
                    language_code: "vi",
                    title: "Popup tiếng Việt",
                    content: "Nội dung popup tiếng Việt",
                },
                {
                    language_code: "en",
                    title: "English Popup",
                    content: "Popup content in English",
                },
                {
                    language_code: "fr",
                    title: "Popup Français",
                    content: "Contenu du popup en français",
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
            <PopupForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default AdminPopupCreatePage;
