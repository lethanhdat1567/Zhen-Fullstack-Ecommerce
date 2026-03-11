"use client";

import { checkoutSchema } from "@/app/[locale]/(public)/(single)/checkout/schema";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

type Props = {
    form: UseFormReturn<z.infer<typeof checkoutSchema>>;
};

function FormInfo({ form }: Props) {
    const t = useTranslations("Checkout");

    return (
        <div className="space-y-6">
            {/* Họ và tên */}
            <Controller
                name="full_name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div
                        className="flex flex-col gap-2"
                        data-invalid={fieldState.invalid}
                    >
                        <Label htmlFor={field.name} className="font-semibold">
                            {t("fullName")}
                        </Label>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder={t("fullNamePlaceholder")}
                            className={
                                fieldState.invalid
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : ""
                            }
                        />
                        {fieldState.error && (
                            <span className="text-sm font-medium text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </div>
                )}
            />

            {/* Số điện thoại */}
            <Controller
                name="phone_number"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div
                        className="flex flex-col gap-2"
                        data-invalid={fieldState.invalid}
                    >
                        <Label htmlFor={field.name} className="font-semibold">
                            {t("phoneNumber")}
                        </Label>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder={t("phoneNumberPlaceholder")}
                            className={
                                fieldState.invalid
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : ""
                            }
                        />
                        {fieldState.error && (
                            <span className="text-sm font-medium text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </div>
                )}
            />

            {/* Email */}
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div
                        className="flex flex-col gap-2"
                        data-invalid={fieldState.invalid}
                    >
                        <Label htmlFor={field.name} className="font-semibold">
                            {t("email")}
                        </Label>
                        <Input
                            {...field}
                            id={field.name}
                            type="email"
                            aria-invalid={fieldState.invalid}
                            placeholder={t("emailPlaceholder")}
                            className={
                                fieldState.invalid
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : ""
                            }
                        />
                        {fieldState.error && (
                            <span className="text-sm font-medium text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </div>
                )}
            />

            {/* Địa chỉ nhận hàng */}
            <Controller
                name="shipping_address"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div
                        className="flex flex-col gap-2"
                        data-invalid={fieldState.invalid}
                    >
                        <Label htmlFor={field.name} className="font-semibold">
                            {t("address")}
                        </Label>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder={t("addressPlaceholder")}
                            className={
                                fieldState.invalid
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : ""
                            }
                        />
                        {fieldState.error && (
                            <span className="text-sm font-medium text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </div>
                )}
            />

            {/* Ghi chú */}
            <Controller
                name="note"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div
                        className="flex flex-col gap-2"
                        data-invalid={fieldState.invalid}
                    >
                        <Label htmlFor={field.name} className="font-semibold">
                            {t("note")}
                        </Label>
                        <Textarea
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder={t("notePlaceholder")}
                            className={`resize-none ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        {fieldState.error && (
                            <span className="text-sm font-medium text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </div>
                )}
            />
        </div>
    );
}

export default FormInfo;
