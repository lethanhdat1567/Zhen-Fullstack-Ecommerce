"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { HttpError } from "@/lib/http/errors";
import { mediaAlbumSchema } from "@/app/admin/media/albums/new/schema";
import Galleries, {
    GalleriesType,
} from "@/app/admin/components/Galleries/Galleries";
import { mediaAlbumService } from "@/services/mediaAlbumService";
import MediaAlbumSelect from "@/app/admin/media/albums/new/MediaAlbumSelect";
import UploadThumbnail from "@/app/admin/components/UploadThumbnail/UploadThumbnail";

interface Props {
    activeLang: "vi" | "en" | "fr";
    form: ReturnType<typeof useForm<z.infer<typeof mediaAlbumSchema>>>;
    updateId?: string;
}

function MediaAlbumForm({ activeLang, form, updateId }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
        setError,
    } = form;

    const translations = watch("translations");

    const langIndex = translations.findIndex(
        (t) => t.language_code === activeLang,
    );

    async function onSubmit(data: z.infer<typeof mediaAlbumSchema>) {
        try {
            if (updateId) {
                await mediaAlbumService.update(updateId, data as any);
                toast.success("Cập nhật album thành công!");
            } else {
                await mediaAlbumService.create(data as any);
                toast.success("Tạo album thành công!");
            }

            router.push("/admin/media/albums" as any);
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                setError(`translations.${langIndex}.slug`, {
                    type: "server",
                    message: "Slug đã tồn tại",
                });

                toast.error(error.message);
            } else {
                toast.error(updateId ? "Cập nhật thất bại" : "Tạo thất bại");
            }
        }
    }

    const titleError = errors.translations?.[langIndex]?.title?.message;
    const slugError = errors.translations?.[langIndex]?.slug?.message;
    const descError = errors.translations?.[langIndex]?.description?.message;
    const galleriesError = errors.galleries?.message;
    const categoryError = errors.category_id?.message;

    const galleries = watch("galleries");
    const thumbnail = watch("thumbnail");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {/* TITLE */}
            <Field>
                <FieldLabel>Tiêu đề ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`title-${activeLang}`}
                    {...register(`translations.${langIndex}.title`)}
                    placeholder="Nhập tiêu đề album"
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
                    placeholder="album-slug"
                    autoComplete="off"
                />
                {slugError && <FieldError>{slugError}</FieldError>}
            </Field>

            {/* CATEGORY */}
            <Field>
                <FieldLabel>Thể loại ({activeLang.toUpperCase()})</FieldLabel>
                <MediaAlbumSelect
                    value={watch("category_id")}
                    onChange={(id: string) => {
                        form.setValue("category_id", id, {
                            shouldValidate: true,
                        });
                    }}
                />
                {categoryError && <FieldError>{categoryError}</FieldError>}
            </Field>

            {/* DESCRIPTION */}
            <Field>
                <FieldLabel>Mô tả ({activeLang.toUpperCase()})</FieldLabel>
                <Textarea
                    key={`desc-${activeLang}`}
                    {...register(`translations.${langIndex}.description`)}
                    placeholder="Nhập mô tả album"
                    rows={8}
                />
                {descError && <FieldError>{descError}</FieldError>}
            </Field>

            {/* THUMBNAIL */}
            <div className="border-t pt-4">
                <h3 className="mb-2 text-sm font-medium">Thumbnail</h3>
                <UploadThumbnail
                    value={thumbnail}
                    onChange={(value) =>
                        form.setValue("thumbnail", value, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                    onRemove={() => form.setValue("thumbnail", "")}
                    onError={(error) => {
                        form.setError("thumbnail", { message: error });
                    }}
                />
            </div>

            {/* GALLERIES */}
            <div className="border-t pt-4">
                <h3 className="mb-2 text-sm font-medium">Galleries</h3>
                <Galleries
                    galleries={galleries}
                    setGalleries={(newGalleries: GalleriesType[]) => {
                        form.setValue("galleries", newGalleries, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                    setError={(msg) => {
                        form.setError("galleries", {
                            message: msg,
                        });
                    }}
                    type="all"
                />
                {galleriesError && <FieldError>{galleriesError}</FieldError>}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
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

export default MediaAlbumForm;
