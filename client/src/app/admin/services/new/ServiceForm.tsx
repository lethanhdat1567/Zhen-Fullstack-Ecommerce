"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HttpError } from "@/lib/http/errors";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { useForm } from "react-hook-form";
import UploadThumbnail from "@/app/admin/components/UploadThumbnail/UploadThumbnail";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import Galleries, {
    GalleriesType,
} from "@/app/admin/components/Galleries/Galleries";
import { createServiceSchema } from "@/app/admin/services/new/form";
import { serviceService } from "@/services/service";
import ServiceSelect from "@/app/admin/services/new/ServiceSelect";

interface Props {
    activeLang: "vi" | "en" | "fr";
    form: ReturnType<typeof useForm<z.infer<typeof createServiceSchema>>>;
    updateId?: string;
}

function ServiceForm({ activeLang, form, updateId }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = form;

    const translations = watch("translations");

    const langIndex = translations.findIndex(
        (t) => t.language_code === activeLang,
    );

    async function onSubmit(data: z.infer<typeof createServiceSchema>) {
        try {
            if (updateId) {
                await serviceService.updateService(updateId, data as any);
                toast.success("Cập nhật dịch vụ thành công!");
            } else {
                await serviceService.createService(data as any);
                toast.success("Tạo dịch vụ thành công!");
            }

            router.push("/admin/services");
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                if (error.message === "DUP_SKU") {
                    form.setError("sku", {
                        type: "server",
                        message: "SKU đã tồn tại, vui lòng chọn SKU khác",
                    });
                    toast.error("SKU đã tồn tại, vui lòng chọn SKU khác");
                } else {
                    form.setError(`translations.${langIndex}.slug`, {
                        type: "server",
                        message: error.message,
                    });
                    toast.error(error.message);
                }
            } else {
                toast.error("Thao tác thất bại");
            }
        }
    }

    const titleError = errors.translations?.[langIndex]?.title?.message;
    const slugError = errors.translations?.[langIndex]?.slug?.message;
    const descError = errors.translations?.[langIndex]?.description?.message;
    const contentError = errors.translations?.[langIndex]?.content?.message;
    const galleriesError = errors.galleries?.message;

    const category_id = watch("category_id");
    const thumbnail = watch("thumbnail");
    const content = watch("translations")[langIndex]?.content;
    const galleries = watch("galleries");
    const skuError = errors.sku?.message;
    const priceError = errors.price?.message;
    const thumbnailError = errors.thumbnail?.message;
    const categoryError = errors.category_id?.message;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
            {/* ===== CATEGORY ===== */}
            <Field>
                <FieldLabel>Danh mục</FieldLabel>
                <ServiceSelect
                    value={category_id}
                    onChange={(value: string) => {
                        if (value) {
                            form.setValue("category_id", value);
                        }
                    }}
                />
                {categoryError && <FieldError>{categoryError}</FieldError>}
            </Field>

            {/* ===== SKU ===== */}
            <Field>
                <FieldLabel>SKU</FieldLabel>
                <Input {...register("sku")} />
                {skuError && <FieldError>{skuError}</FieldError>}
            </Field>

            {/* ===== PRICE ===== */}
            <Field>
                <FieldLabel>Giá</FieldLabel>
                <Input
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                />
                {priceError && <FieldError>{priceError}</FieldError>}
            </Field>

            {/* ===== THUMBNAIL ===== */}
            <Field>
                <FieldLabel>Ảnh đại diện</FieldLabel>
                <UploadThumbnail
                    value={thumbnail || ""}
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
                        setValue("thumbnail", undefined);
                    }}
                />
                {thumbnailError && <FieldError>{thumbnailError}</FieldError>}
            </Field>

            {/* ==== GALLERIES ===== */}
            <div className="border-t pt-4">
                <h3 className="mb-2 text-sm font-medium">Thư viện ảnh</h3>
                <Galleries
                    galleries={galleries as any}
                    setGalleries={(newGalleries: GalleriesType[]) => {
                        form.setValue("galleries", newGalleries as any, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                    setError={(msg) => {
                        form.setError("galleries", {
                            message: msg,
                        });
                    }}
                />
                {galleriesError && <FieldError>{galleriesError}</FieldError>}
            </div>

            {/* ===== TITLE ===== */}
            <Field>
                <FieldLabel>Tiêu đề ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`title-${activeLang}`}
                    {...register(`translations.${langIndex}.title`)}
                />
                {titleError && <FieldError>{titleError}</FieldError>}
            </Field>

            {/* ===== SLUG ===== */}
            <Field>
                <FieldLabel>Slug ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`slug-${activeLang}`}
                    {...register(`translations.${langIndex}.slug`)}
                />
                {slugError && <FieldError>{slugError}</FieldError>}
            </Field>

            {/* ===== DESCRIPTION ===== */}
            <Field>
                <FieldLabel>Mô tả ({activeLang.toUpperCase()})</FieldLabel>
                <Textarea
                    key={`desc-${activeLang}`}
                    {...register(`translations.${langIndex}.description`)}
                />
                {descError && <FieldError>{descError}</FieldError>}
            </Field>

            {/* ===== CONTENT ===== */}
            <Field>
                <FieldLabel>Nội dung ({activeLang.toUpperCase()})</FieldLabel>
                <SimpleEditor
                    value={content || ""}
                    onChange={(value) => {
                        setValue(`translations.${langIndex}.content`, value);
                    }}
                    className="tiptap min-h-[80vh] border"
                />
                {contentError && <FieldError>{contentError}</FieldError>}
            </Field>

            {/* ===== ACTIONS ===== */}
            <div className="flex items-center justify-end gap-2">
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => router.back()}
                >
                    Hủy
                </Button>

                <Button type="submit">{updateId ? "Cập nhật" : "Lưu"}</Button>
            </div>
        </form>
    );
}

export default ServiceForm;
