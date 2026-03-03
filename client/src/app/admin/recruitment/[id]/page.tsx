"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { useParams } from "next/navigation";
import { recruitmentService } from "@/services/recruitmentService";
import RecruitmentForm from "@/app/admin/recruitment/new/RecruitmentForm";
import LoadingForm from "@/app/admin/components/LoadingForm/LoadingForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";
import { recruitmentSchema } from "@/app/admin/recruitment/new/schema";

function RecruitmentUpdatePage() {
    const params = useParams();
    const recruitmentId = params.id as string;

    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

    const [loading, setLoading] = useState(true);

    // =========================
    // FORM
    // =========================
    const form = useForm<z.infer<typeof recruitmentSchema>>({
        resolver: zodResolver(recruitmentSchema) as any,
        mode: "onChange",
        defaultValues: {
            address: "",
            quantity: 1,
            status: "active",
            translations: [
                { language_code: "vi", title: "" },
                { language_code: "en", title: "" },
                { language_code: "fr", title: "" },
            ],
        },
    });

    // =========================
    // FETCH DATA
    // =========================
    const fetchRecruitment = async () => {
        try {
            const res: any = await recruitmentService.getById(recruitmentId);

            const translation = res.translations.map((item: any) => ({
                language_code: item.language.code,
                title: item.title,
            }));

            form.setValue("address", res.address || "");
            form.setValue("quantity", res.quantity);
            form.setValue("status", res.status);
            form.setValue("translations", translation);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (recruitmentId) {
            fetchRecruitment();
        }
    }, [recruitmentId]);

    // =========================
    // UI
    // =========================
    return (
        <div className="mx-auto w-4xl">
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

            {loading ? (
                <LoadingForm />
            ) : (
                <RecruitmentForm
                    activeLang={activeLang}
                    form={form}
                    updateId={recruitmentId}
                />
            )}
        </div>
    );
}

export default RecruitmentUpdatePage;
