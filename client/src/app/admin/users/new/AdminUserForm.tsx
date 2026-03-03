"use client";

import { createAdminSchema } from "@/app/admin/users/new/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import * as z from "zod";
import UploadThumbnail from "@/app/admin/components/UploadThumbnail/UploadThumbnail";
import { uploadService } from "@/services/uploadService";
import { HttpError } from "@/lib/http/errors";
import { toast } from "sonner";
import { adminService } from "@/services/adminService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react"; // Spinner icon shadcn

export function AdminUserForm({
    form,
    updateId,
}: {
    form: any;
    updateId?: string;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(data: z.infer<typeof createAdminSchema>) {
        try {
            setLoading(true);

            if (updateId) {
                await adminService.update(updateId, data);
                toast.success("Cập nhật thành công");
            } else {
                await adminService.create(data);
                toast.success("Tạo mới thành công");
            }

            router.push("/admin/users");
        } catch (error) {
            console.log(error);

            if (error instanceof HttpError) {
                if (error.status === 409) {
                    toast.error(error.message);
                    form.setError("email", { message: error.message });
                    form.setError("username", { message: error.message });
                }
            }
        } finally {
            setLoading(false);
        }
    }

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
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* USERNAME */}
            <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            placeholder="admin01"
                            autoComplete="off"
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* EMAIL */}
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
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* PASSWORD */}
            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Mật khẩu</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            type="password"
                            autoComplete="new-password"
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
                        <FieldLabel htmlFor={field.name}>
                            Ảnh đại diện
                        </FieldLabel>
                        <UploadThumbnail
                            value={field.value}
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
                                field.onChange("");
                            }}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <div className="flex items-center justify-end gap-2">
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => router.back()}
                    disabled={loading}
                >
                    Hủy
                </Button>

                <Button
                    type="submit"
                    disabled={
                        loading ||
                        !form.formState.isValid ||
                        !form.formState.isDirty
                    }
                >
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {updateId ? "Cập nhật" : "Tạo tài khoản"}
                </Button>
            </div>
        </form>
    );
}
