"use client";

import { adminSchema } from "@/app/admin/profile/components/AdminForm/schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import UploadThumbnail from "@/app/admin/components/UploadThumbnail/UploadThumbnail";
import { HttpError } from "@/lib/http/errors";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { userService } from "@/services/userService";

function AdminForm() {
    const admin = useAuthStore((state) => state.user);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    const form = useForm<z.infer<typeof adminSchema>>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            full_name: "",
            avatar: "",
            username: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    async function onSubmit(data: z.infer<typeof adminSchema>) {
        if (!admin) return;

        try {
            setLoading(true);
            await userService.update(admin.id, data);
            toast.success("Cập nhật thành công");
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message);
            } else {
                toast.error("Có lỗi xảy ra");
            }
        } finally {
            setLoading(false);
        }
    }

    const fetchAdmin = async () => {
        if (!admin) return;

        try {
            setFetching(true);
            const res = await userService.detail(admin.id);

            form.reset({
                full_name: res.full_name || "",
                avatar: res.avatar || "",
                username: res.username || "",
                email: res.email || "",
                phone: res.phone || "", // Map phone từ API
                address: res.address || "", // Map address từ API
            });
        } catch (error) {
            console.log(error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchAdmin();
    }, [admin]);

    const disabled = loading || fetching;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* FULL NAME */}
            <Controller
                name="full_name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Họ và tên</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            placeholder="Nguyễn Văn A"
                            disabled={disabled}
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* PHONE - Mới bổ sung */}
            <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Số điện thoại
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            placeholder="0912345678"
                            disabled={disabled}
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* EMAIL & USERNAME */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Username
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="admin_01"
                                autoComplete="off"
                                disabled={disabled}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="email"
                                placeholder="admin@example.com"
                                autoComplete="off"
                                disabled={disabled}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            {/* ADDRESS - Mới bổ sung */}
            <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Địa chỉ</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            placeholder="Số 123, Đường ABC, Quận XYZ..."
                            disabled={disabled}
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* AVATAR */}
            <Controller
                name="avatar"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Avatar</FieldLabel>
                        <UploadThumbnail
                            value={field.value}
                            onChange={async (file) => {
                                field.onChange(file);
                            }}
                            onRemove={() => {
                                if (!disabled) field.onChange("");
                            }}
                            onError={(error) => {
                                form.setError("avatar", { message: error });
                            }}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <div className="flex items-end justify-end">
                <Button type="submit" disabled={disabled} className="w-fit">
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Cập nhật tài khoản
                </Button>
            </div>
        </form>
    );
}

export default AdminForm;
