"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HttpError } from "@/lib/http/errors";
import { postSchema } from "@/app/admin/posts/schema";
import { postService } from "@/services/postService";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import PostSelect from "@/app/admin/posts/new/PostSelect";
import UploadThumbnail from "@/app/admin/components/UploadThumbnail/UploadThumbnail";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

interface Props {
    activeLang: "vi" | "en" | "fr";
    form: ReturnType<typeof useForm<z.infer<typeof postSchema>>>;
    updateId?: string;
}

function PostForm({ activeLang, form, updateId }: Props) {
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

    async function onSubmit(data: z.infer<typeof postSchema>) {
        try {
            if (updateId) {
                await postService.update(updateId, data as any);
                toast.success("Cập nhật bài viết thành công!");
            } else {
                await postService.create(data as any);
                toast.success("Tạo bài viết thành công!");
            }

            router.push("/admin/posts");
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                form.setError(`translations.${langIndex}.slug`, {
                    type: "server",
                    message: error.message,
                });

                toast.error(error.message);
            } else {
                toast.error("Thao tác thất bại");
            }
        }
    }

    const titleError = errors.translations?.[langIndex]?.title?.message;
    const slugError = errors.translations?.[langIndex]?.slug?.message;
    const descError = errors.translations?.[langIndex]?.description?.message;
    const contentError = errors.translations?.[langIndex]?.content?.message;
    const categoryError = errors.category_id?.message;
    const thumbnailError = errors.thumbnail?.message;

    const category_id = watch("category_id");
    const content = watch("translations")[langIndex].content;
    const thumbnail = watch("thumbnail");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
            {/* CATEGORY */}
            <Field>
                <FieldLabel>Danh mục</FieldLabel>
                <PostSelect
                    value={category_id}
                    onChange={(value) => {
                        if (value) {
                            form.setValue("category_id", value, {
                                shouldValidate: true,
                            });
                        }
                    }}
                />
                {categoryError && <FieldError>{categoryError}</FieldError>}
            </Field>

            {/* THUMBNAIL */}
            <Field>
                <FieldLabel>Thumbnail ({activeLang.toUpperCase()})</FieldLabel>
                <UploadThumbnail
                    value={thumbnail}
                    onChange={(url) => {
                        form.setValue(`thumbnail`, url, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                    onError={(error) => {
                        form.setError(`thumbnail`, {
                            message: error,
                        });
                    }}
                    onRemove={() => {
                        form.setValue(`thumbnail`, undefined, {
                            shouldValidate: true,
                        });
                    }}
                />
                {thumbnailError && <FieldError>{thumbnailError}</FieldError>}
            </Field>

            {/* TITLE */}
            <Field>
                <FieldLabel>Tiêu đề ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`title-${activeLang}`}
                    {...register(`translations.${langIndex}.title`)}
                    placeholder="Nhập tiêu đề bài viết"
                    autoComplete="off"
                />
                {titleError && <FieldError>{titleError}</FieldError>}
            </Field>

            {/* SLUG */}
            <Field>
                <FieldLabel>Slug ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`slug-${activeLang}`}
                    {...register(`translations.${langIndex}.slug`)}
                    placeholder="post-slug"
                    autoComplete="off"
                />
                {slugError && <FieldError>{slugError}</FieldError>}
            </Field>

            {/* DESCRIPTION */}
            <Field>
                <FieldLabel>Mô tả ({activeLang.toUpperCase()})</FieldLabel>
                <Textarea
                    key={`desc-${activeLang}`}
                    {...register(`translations.${langIndex}.description`)}
                    placeholder="Nhập mô tả ngắn"
                />
                {descError && <FieldError>{descError}</FieldError>}
            </Field>

            {/* CONTENT */}
            <Field>
                <FieldLabel>Nội dung ({activeLang.toUpperCase()})</FieldLabel>
                <SimpleEditor
                    value={content}
                    onChange={(value) => {
                        form.setValue(
                            `translations.${langIndex}.content`,
                            value,
                            { shouldValidate: true },
                        );
                    }}
                    className="tiptap border"
                />
                {contentError && <FieldError>{contentError}</FieldError>}
            </Field>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-2">
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Hủy
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

export default PostForm;
