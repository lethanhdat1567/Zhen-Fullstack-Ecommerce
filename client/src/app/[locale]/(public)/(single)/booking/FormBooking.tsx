"use client";

import bookingSchema from "@/app/[locale]/(public)/(single)/booking/bookingSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import SelectService from "@/app/[locale]/(public)/(single)/booking/components/SelectService/SelectService";
import { DatePickerWithRange } from "@/app/[locale]/(public)/(single)/booking/components/DateRangePicker/DateRangePicker";
import { Textarea } from "@/components/ui/textarea";
import { HttpError } from "@/lib/http/errors";
import SelectPaymentMethod from "@/app/[locale]/(public)/(single)/booking/components/SelectPaymentMethod/SelectPaymentMethod";
import { bookingService } from "@/services/bookingService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";
import { useTranslations } from "next-intl";

function FormBooking() {
    const t = useTranslations("Booking");
    const user = useAuthStore((state) => state.user);
    const searchParams = useSearchParams();
    const service_id = searchParams.get("id");

    const router = useRouter();
    const form = useForm<z.infer<typeof bookingSchema>>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            service_id: "",
            customer_name: "Nguyễn Văn A",
            customer_email: "nguyenvana@gmail.com",
            customer_phone: "0901234567",
            guests: 2,
            note: "Xin phòng có view hướng hồ và 1 giỏ trái cây.",
            payment_method: "cod",
        },
    });

    useEffect(() => {
        if (service_id) form.setValue("service_id", service_id);
    }, [service_id]);

    useEffect(() => {
        if (user) {
            userService.detail(user.id).then((res) => {
                form.setValue("customer_name", res.full_name || "");
                form.setValue("customer_email", res.email);
            });
        }
    }, [user]);

    async function onSubmit(data: z.infer<typeof bookingSchema>) {
        try {
            const res = await bookingService.create(data);

            if (res.payment_url) {
                router.push(res.payment_url);
            } else {
                router.push(
                    "/order/confirmation?type=service&status=success&orderId=" +
                        res.id,
                );
            }
            toast.success(t("successMessage"));
        } catch (error) {
            if (error instanceof HttpError) {
                if (error.status === 400) {
                    form.setError("check_in", {
                        message: t("errorOvernightOnly"),
                    });
                }
            }
        }
    }

    const serviceId = form.watch("service_id");
    const dateFrom = form.watch("check_in");
    const dateTo = form.watch("check_out");

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-2">
            <h2 className="text-xl font-bold md:text-2xl">{t("title")}</h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Dịch vụ - Full width */}
                <div className="md:col-span-2">
                    <Controller
                        name="service_id"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    {t("serviceId")}
                                </FieldLabel>
                                <SelectService
                                    value={serviceId}
                                    onChange={field.onChange}
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Tên khách hàng - Full width */}
                <div className="md:col-span-2">
                    <Controller
                        name="customer_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    {t("fullName")}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    placeholder={t("fullNamePlaceholder")}
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Email */}
                <Controller
                    name="customer_email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                {t("email")}
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="email"
                                placeholder="email@gmail.com"
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Số điện thoại */}
                <Controller
                    name="customer_phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                {t("phone")}
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="090..."
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Số khách */}
                <Controller
                    name="guests"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                {t("guests")}
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="number"
                                onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                }
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Khoảng ngày - Ưu tiên hiển thị rộng hơn để tránh vỡ UI lịch */}
                <div className="md:col-span-1">
                    <Controller
                        name="check_in"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    {t("checkIn")}
                                </FieldLabel>
                                <DatePickerWithRange
                                    from={dateFrom}
                                    to={dateTo}
                                    serviceId={serviceId}
                                    onRangeChange={(range) => {
                                        form.setValue(
                                            "check_in",
                                            range?.from as Date,
                                        );
                                        form.setValue(
                                            "check_out",
                                            range?.to as Date,
                                        );
                                    }}
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Ghi chú - Full width */}
                <div className="md:col-span-2">
                    <Controller
                        name="note"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    {t("note")}
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id={field.name}
                                    placeholder={t("notePlaceholder")}
                                    className="min-h-[80px]"
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Phương thức thanh toán - Full width */}
                <div className="md:col-span-2">
                    <Controller
                        name="payment_method"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    {t("paymentMethod")}
                                </FieldLabel>
                                <SelectPaymentMethod
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
            </div>

            <Button
                type="submit"
                className="h-11 w-full font-bold md:h-12 md:text-lg"
            >
                {t("confirmButton")}
            </Button>
        </form>
    );
}

export default FormBooking;
