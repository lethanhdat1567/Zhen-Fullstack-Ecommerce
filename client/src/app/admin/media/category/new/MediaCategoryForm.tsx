"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { HttpError } from "@/lib/http/errors";
import { mediaCategorySchema } from "@/app/admin/media/category/new/schema";
import { mediaCategoryService } from "@/services/mediaCategoryService";

interface Props {
    activeLang: "vi" | "en" | "fr";
    form: ReturnType<typeof useForm<z.infer<typeof mediaCategorySchema>>>;
    updateId?: string;
}

function MediaCategoryForm({ activeLang, form, updateId }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = form;

    const translations = watch("translations");

    const langIndex = translations.findIndex(
        (t) => t.language_code === activeLang,
    );

    async function onSubmit(data: z.infer<typeof mediaCategorySchema>) {
        const isUpdate = Boolean(updateId);

        try {
            if (isUpdate) {
                await mediaCategoryService.update(updateId!, data);
            } else {
                await mediaCategoryService.create(data as any);
            }

            toast.success(
                isUpdate
                    ? "Cập nhật danh mục thành công!"
                    : "Tạo danh mục thành công!",
            );

            router.push("/admin/media/category" as any);
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                form.setError(`translations.${langIndex}.slug`, {
                    type: "server",
                    message: error.message,
                });
                toast.error(error.message);
                return;
            }

            toast.error(
                isUpdate
                    ? "Cập nhật danh mục thất bại"
                    : "Tạo danh mục thất bại",
            );
        }
    }

    const nameError = errors.translations?.[langIndex]?.name?.message;
    const slugError = errors.translations?.[langIndex]?.slug?.message;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
            <Field>
                <FieldLabel>Tên ({activeLang.toUpperCase()})</FieldLabel>
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
                    placeholder="category-slug"
                    autoComplete="off"
                />
                {slugError && <FieldError>{slugError}</FieldError>}
            </Field>

            <div className="flex items-center justify-end gap-2">
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Hủy bỏ
                </Button>

                <Button type="submit" disabled={!isValid || isSubmitting}>
                    {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {updateId ? "Cập nhật" : "Lưu"}
                </Button>
            </div>
        </form>
    );
}

export default MediaCategoryForm;
