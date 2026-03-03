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

import { recruitmentService } from "@/services/recruitmentService";
import { recruitmentSchema } from "@/app/admin/recruitment/new/schema";

interface Props {
    activeLang: "vi" | "en" | "fr";
    form: ReturnType<typeof useForm<z.infer<typeof recruitmentSchema>>>;
    updateId?: string;
}

function RecruitmentForm({ activeLang, form, updateId }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = form;

    const translations = watch("translations");

    const langIndex = translations
        ? translations.findIndex((t) => t.language_code === activeLang)
        : 0;

    async function onSubmit(data: z.infer<typeof recruitmentSchema>) {
        try {
            if (updateId) {
                await recruitmentService.update(updateId, data as any);
                toast.success("Cập nhật tuyển dụng thành công!");
            } else {
                await recruitmentService.create(data as any);
                toast.success("Tạo tuyển dụng thành công!");
            }

            router.push("/admin/recruitment" as any);
        } catch (error) {
            if (error instanceof HttpError) {
                toast.error(error.message);
                return;
            }

            toast.error(
                updateId
                    ? "Cập nhật tuyển dụng thất bại"
                    : "Tạo tuyển dụng thất bại",
            );
        }
    }

    const titleError = errors.translations?.[langIndex]?.title?.message;
    const addressError = errors.address?.message;
    const quantityError = errors.quantity?.message;
    const statusError = errors.status?.message;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
            {/* ===== TITLE (đa ngôn ngữ) ===== */}
            <Field>
                <FieldLabel>
                    Vị trí tuyển dụng ({activeLang.toUpperCase()})
                </FieldLabel>
                <Input
                    key={`title-${activeLang}`}
                    {...register(`translations.${langIndex}.title`)}
                    placeholder="Nhập vị trí tuyển dụng"
                    autoComplete="off"
                />
                {titleError && <FieldError>{titleError}</FieldError>}
            </Field>

            {/* ===== ADDRESS (không đa ngôn ngữ) ===== */}
            <Field>
                <FieldLabel>Địa chỉ</FieldLabel>
                <Input
                    {...register("address")}
                    placeholder="Địa chỉ làm việc"
                    autoComplete="off"
                />
                {addressError && <FieldError>{addressError}</FieldError>}
            </Field>

            {/* ===== QUANTITY ===== */}
            <Field>
                <FieldLabel>Số lượng</FieldLabel>
                <Input
                    type="number"
                    {...register("quantity", { valueAsNumber: true })}
                    placeholder="Số lượng cần tuyển"
                />
                {quantityError && <FieldError>{quantityError}</FieldError>}
            </Field>

            {/* ===== STATUS ===== */}
            <Field>
                <FieldLabel>Trạng thái</FieldLabel>
                <select
                    {...register("status")}
                    className="w-full rounded-md border px-3 py-2 text-sm"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                {statusError && <FieldError>{statusError}</FieldError>}
            </Field>

            {/* ===== ACTIONS ===== */}
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

export default RecruitmentForm;
