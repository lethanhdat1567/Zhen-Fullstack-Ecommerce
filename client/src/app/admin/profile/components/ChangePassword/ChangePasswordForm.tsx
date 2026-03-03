"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { HttpError } from "@/lib/http/errors";
import { changePasswordSchema } from "@/app/admin/profile/components/ChangePassword/schema";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

function ChangePasswordForm({ onCancel }: { onCancel: any }) {
    const admin = useAuthStore((state) => state.user);
    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof changePasswordSchema>) {
        try {
            if (!admin?.id) return;

            await userService.changePassword(admin?.id, data);
            toast.success("Cập nhật mật khẩu thành công");
            form.reset();
            onCancel();
        } catch (error) {
            if (error instanceof HttpError) {
                if (error.status === 400) {
                    form.setError("old_password", {
                        type: "server",
                        message: error.message,
                    });
                }

                toast.error(error.message);
            }
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-3xl space-y-5"
        >
            {/* OLD PASSWORD */}
            <Controller
                name="old_password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Mật khẩu cũ
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            type="password"
                            autoComplete="current-password"
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* NEW PASSWORD */}
            <Controller
                name="new_password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Mật khẩu mới
                        </FieldLabel>
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

            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant={"destructive"}
                >
                    Hủy
                </Button>
                <Button type="submit">Đổi mật khẩu</Button>
            </div>
        </form>
    );
}

export default ChangePasswordForm;
