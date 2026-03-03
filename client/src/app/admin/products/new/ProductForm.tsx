"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HttpError } from "@/lib/http/errors";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import UploadThumbnail from "@/app/admin/components/UploadThumbnail/UploadThumbnail";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { productSchema } from "@/app/admin/products/new/schema";
import { productService } from "@/services/productService";
import Galleries, {
    GalleriesType,
} from "@/app/admin/components/Galleries/Galleries";
import ProductSelect from "@/app/admin/products/new/ProductSelect";

interface Props {
    activeLang: "vi" | "en" | "fr";
    form: ReturnType<typeof useForm<z.infer<typeof productSchema>>>;
    updateId?: string;
}

function ProductForm({ activeLang, form, updateId }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
        setValue,
    } = form;

    const translations = watch("translations");

    const langIndex = translations.findIndex(
        (t) => t.language_code === activeLang,
    );

    async function onSubmit(data: z.infer<typeof productSchema>) {
        try {
            if (updateId) {
                await productService.update(updateId, data as any);
                toast.success("Cập nhật sản phẩm thành công!");
            } else {
                await productService.create(data as any);
                toast.success("Tạo sản phẩm thành công!");
            }

            router.push("/admin/products");
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
    const galleriesError = errors.galleries?.message;
    const categoryError = errors.category_id?.message;
    const priceError = errors.price?.message;
    const salePriceError = errors.sale_price?.message;
    const stockError = errors.stock?.message;
    const thumbnailError = errors.thumbnail?.message;

    const category_id = watch("category_id");
    const thumbnail = watch("thumbnail");
    const content = watch("translations")[langIndex]?.content;
    const galleries = watch("galleries");

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`mt-4 space-y-6 ${
                isSubmitting ? "pointer-events-none opacity-70" : ""
            }`}
        >
            {/* CATEGORY */}
            <Field>
                <FieldLabel>Danh mục</FieldLabel>
                <ProductSelect
                    value={category_id}
                    onChange={(value: string) => {
                        if (value) {
                            setValue("category_id", value, {
                                shouldValidate: true,
                            });
                        }
                    }}
                />
                {categoryError && <FieldError>{categoryError}</FieldError>}
            </Field>

            {/* PRICE */}
            <Field>
                <FieldLabel>Giá</FieldLabel>
                <Input
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                />
                {priceError && <FieldError>{priceError}</FieldError>}
            </Field>

            {/* SALE PRICE */}
            <Field>
                <FieldLabel>Giá khuyến mãi</FieldLabel>
                <Input
                    type="number"
                    {...register("sale_price", { valueAsNumber: true })}
                />
                <p className="text-muted-foreground text-sm italic">
                    Đặt 0 nếu không có giá khuyến mãi
                </p>
                {salePriceError && <FieldError>{salePriceError}</FieldError>}
            </Field>

            {/* STOCK */}
            <Field>
                <FieldLabel>Tồn kho</FieldLabel>
                <Input
                    type="number"
                    {...register("stock", { valueAsNumber: true })}
                />
                {stockError && <FieldError>{stockError}</FieldError>}
            </Field>

            {/* THUMBNAIL */}
            <Field>
                <FieldLabel>Thumbnail</FieldLabel>
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
                        setValue("thumbnail", undefined, {
                            shouldValidate: true,
                        });
                    }}
                />
                {thumbnailError && <FieldError>{thumbnailError}</FieldError>}
            </Field>

            {/* GALLERIES */}
            <div className="border-t pt-4">
                <h3 className="mb-2 text-sm font-medium">Galleries</h3>
                <Galleries
                    galleries={galleries as any}
                    setGalleries={(newGalleries: GalleriesType[]) => {
                        setValue("galleries", newGalleries as any, {
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

            {/* TITLE */}
            <Field>
                <FieldLabel>Tiêu đề ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`title-${activeLang}`}
                    {...register(`translations.${langIndex}.title`)}
                    placeholder="Nhập tiêu đề sản phẩm"
                />
                {titleError && <FieldError>{titleError}</FieldError>}
            </Field>

            {/* SLUG */}
            <Field>
                <FieldLabel>Slug ({activeLang.toUpperCase()})</FieldLabel>
                <Input
                    key={`slug-${activeLang}`}
                    {...register(`translations.${langIndex}.slug`)}
                    placeholder="product-slug"
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
                        setValue(`translations.${langIndex}.content`, value, {
                            shouldValidate: true,
                        });
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

export default ProductForm;
