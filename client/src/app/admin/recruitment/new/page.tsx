"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import RecruitmentForm from "./RecruitmentForm";
import { recruitmentSchema } from "@/app/admin/recruitment/new/schema";

function RecruitmentUpdatePage() {
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    const form = useForm<z.infer<typeof recruitmentSchema>>({
        resolver: zodResolver(recruitmentSchema) as any,
        mode: "onChange",
        defaultValues: {
            address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
            quantity: 2,
            status: "active",
            translations: [
                {
                    language_code: "vi",
                    title: "Nhân viên Marketing",
                },
                {
                    language_code: "en",
                    title: "Marketing Executive",
                },
                {
                    language_code: "fr",
                    title: "Responsable Marketing",
                },
            ],
        },
    });

    return (
        <div className="mx-auto w-4xl">
            {/* ===== HEADER ===== */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackBtn />
                    <Title title="Cập nhật tuyển dụng" />
                </div>

                <div className="flex items-center gap-4">
                    <TabsTranslate
                        activeLang={activeLang}
                        onChange={(v) => setActiveLang(v as "vi" | "en" | "fr")}
                    />

                    <TranslateBtn
                        activeLang={activeLang}
                        form={form}
                        fields={["title"]}
                    />
                </div>
            </div>

            {/* ===== FORM ===== */}
            <RecruitmentForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default RecruitmentUpdatePage;
