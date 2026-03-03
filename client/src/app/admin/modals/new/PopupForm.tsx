"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { popupSchema } from "@/app/admin/modals/new/schema";
import { popupService } from "@/services/popupService";
import { HttpError } from "@/lib/http/errors";
import UploadThumbnail from "@/app/admin/components/UploadThumbnail/UploadThumbnail";
import { uploadService } from "@/services/uploadService";

interface Props {
    activeLang: "vi" | "en" | "fr";
    form: ReturnType<typeof useForm<z.infer<typeof popupSchema>>>;
    updateId?: string;
}

function PopupForm({ activeLang, form, updateId }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = form;

    const translations = watch("translations");

    const langIndex = translations.findIndex(
        (t) => t.language_code === activeLang,
    );

    async function onSubmit(data: z.infer<typeof popupSchema>) {
        const isUpdate = Boolean(updateId);

        try {
            if (isUpdate) {
                await popupService.update(updateId!, data);
            } else {
                await popupService.create(data);
            }

            toast.success(
                isUpdate
                    ? "Cập nhật popup thành công!"
                    : "Tạo popup thành công!",
            );

            router.push("/admin/modals");
        } catch (error) {
            if (error instanceof HttpError) {
                toast.error(error.message);
                return;
            }

            toast.error(
                isUpdate ? "Cập nhật popup thất bại" : "Tạo popup thất bại",
            );
        }
    }

    const titleError = errors.translations?.[langIndex]?.title?.message;
    const contentError = errors.translations?.[langIndex]?.content?.message;
    const thumbnailError = errors.thumbnail;

    const thumbnail = watch("thumbnail");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
            {/* TITLE */}
            <Field>
                <FieldLabel>Tiêu đề ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`title-${activeLang}`}
                    {...register(`translations.${langIndex}.title`)}
                    placeholder="Nhập tiêu đề popup"
                    autoComplete="off"
                />
                {titleError && <FieldError>{titleError}</FieldError>}
            </Field>

            {/* CONTENT */}
            <Field>
                <FieldLabel>Nội dung ({activeLang.toUpperCase()})</FieldLabel>
                <Textarea
                    key={`content-${activeLang}`}
                    {...register(`translations.${langIndex}.content`)}
                    placeholder="Nhập nội dung popup"
                    rows={4}
                />
                {contentError && <FieldError>{contentError}</FieldError>}
            </Field>

            {/* THUMBNAIL */}
            <Field>
                <FieldLabel>Ảnh ({activeLang.toUpperCase()})</FieldLabel>
                <UploadThumbnail
                    value={thumbnail}
                    onChange={(url) => {
                        form.setValue("thumbnail", url, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                    onError={(error) => {
                        form.setError("thumbnail", { message: error });
                    }}
                    onRemove={() => {
                        form.setValue("thumbnail", "");
                    }}
                />

                {thumbnailError && <FieldError>{contentError}</FieldError>}
            </Field>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-2">
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => router.back()}
                >
                    Hủy bỏ
                </Button>
                <Button type="submit">Lưu</Button>
            </div>
        </form>
    );
}

export default PopupForm;
