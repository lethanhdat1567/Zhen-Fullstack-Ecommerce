"use client";

import { createServiceSchema } from "@/app/admin/services/category/new/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { serviceCategoryService } from "@/services/serviceCategoryService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { HttpError } from "@/lib/http/errors";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
    activeLang: "vi" | "en" | "fr";
    form: ReturnType<typeof useForm<z.infer<typeof createServiceSchema>>>;
    updatedId?: string;
}

function ServiceCategoryForm({ activeLang, form, updatedId }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty },
    } = form;

    const translations = watch("translations");

    const langIndex = translations.findIndex(
        (t) => t.language_code === activeLang,
    );

    async function onSubmit(data: z.infer<typeof createServiceSchema>) {
        try {
            setLoading(true);

            if (updatedId) {
                await serviceCategoryService.update(updatedId, data as any);
                toast.success("Cập nhật danh mục thành công!");
            } else {
                await serviceCategoryService.create(data as any);
                toast.success("Tạo dịch vụ thành công!");
            }

            router.push("/admin/services/category" as any);
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                const message = error.message;

                form.setError(`translations.${langIndex}.slug`, {
                    type: "server",
                    message: message,
                });

                return;
            }

            toast.error(
                updatedId
                    ? "Cập nhật danh mục thất bại"
                    : "Tạo dịch vụ thất bại",
            );
        } finally {
            setLoading(false);
        }
    }

    const nameError = errors.translations?.[langIndex]?.name?.message;
    const slugError = errors.translations?.[langIndex]?.slug?.message;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
            <Field>
                <FieldLabel>
                    Tên danh mục ({activeLang.toUpperCase()})
                </FieldLabel>
                <Input
                    key={`name-${activeLang}`}
                    {...register(`translations.${langIndex}.name`)}
                    placeholder="Tên danh mục"
                    autoComplete="off"
                />
                {nameError && <FieldError>{nameError}</FieldError>}
            </Field>

            <Field>
                <FieldLabel>Slug ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`slug-${activeLang}`}
                    {...register(`translations.${langIndex}.slug`)}
                    placeholder="slug"
                    autoComplete="off"
                />
                {slugError && <FieldError>{slugError}</FieldError>}
            </Field>

            <div className="flex items-center justify-end gap-2">
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => router.back()}
                    disabled={loading}
                >
                    Hủy bỏ
                </Button>

                <Button
                    type="submit"
                    disabled={loading || !isValid || !isDirty}
                >
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {updatedId ? "Cập nhật" : "Lưu"}
                </Button>
            </div>
        </form>
    );
}

export default ServiceCategoryForm;
