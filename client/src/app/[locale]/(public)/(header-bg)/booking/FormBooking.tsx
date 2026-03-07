"use client";

import bookingSchema from "@/app/[locale]/(public)/(header-bg)/booking/bookingSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Giả định bạn có component Button
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import SelectService from "@/app/[locale]/(public)/(header-bg)/booking/components/SelectService/SelectService";
import { DatePickerWithRange } from "@/app/[locale]/(public)/(header-bg)/booking/components/DateRangePicker/DateRangePicker";
import { Textarea } from "@/components/ui/textarea";
import { HttpError } from "@/lib/http/errors";
import SelectPaymentMethod from "@/app/[locale]/(public)/(header-bg)/booking/components/SelectPaymentMethod/SelectPaymentMethod";
import { bookingService } from "@/services/bookingService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function FormBooking() {
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

    async function onSubmit(data: z.infer<typeof bookingSchema>) {
        try {
            const res = await bookingService.create(data);

            if (res.payment_url) {
                router.push(res.payment_url);
            } else {
            }
        } catch (error) {
            if (error instanceof HttpError) {
                if (error.status === 400) {
                    form.setError("note", { message: error.message });
                }
            }
        }
    }

    // eslint-disable-next-line react-hooks/incompatible-library
    const serviceId = form.watch("service_id");
    const dateFrom = form.watch("check_in");
    const dateTo = form.watch("check_out");

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
            <h2 className="mb-4 text-xl font-bold">Thông tin đặt phòng</h2>

            <Controller
                name="service_id"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Mã dịch vụ</FieldLabel>

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

            {/* Tên khách hàng */}
            <Controller
                name="customer_name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Họ và tên</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            placeholder="Nhập tên của bạn"
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Email */}
                <Controller
                    name="customer_email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
                                Số điện thoại
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
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* Số khách */}
                <Controller
                    name="guests"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Số khách
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

                {/* Check-in */}
                <Controller
                    name="check_in"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Nhận phòng
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

            {/* Ghi chú */}
            <Controller
                name="note"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Ghi chú thêm
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id={field.name}
                            placeholder="Yêu cầu đặc biệt..."
                        />
                        {/* Hoặc dùng <Textarea {...field} /> nếu bạn có component đó */}
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="payment_method"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Phương thức thanh toán
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

            <Button type="submit" className="mt-6 w-full">
                Xác nhận đặt phòng
            </Button>
        </form>
    );
}

export default FormBooking;
