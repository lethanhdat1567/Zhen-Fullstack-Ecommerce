"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
} from "@/components/ui/field";

import Logo from "@/components/Logo/Logo";
import { authService } from "@/services/authService";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authService.forgotPassword(email);
        } catch {
        } finally {
            setLoading(false);
            setSent(true);
        }
    };

    return (
        <div className="bg-background flex min-h-svh items-center justify-center p-6 font-[Inter]">
            <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    <FieldGroup>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-xl font-bold">
                                Quên mật khẩu?
                            </h1>
                            <FieldDescription>
                                Nhập email để nhận link đặt lại mật khẩu
                            </FieldDescription>
                        </div>

                        {/* Badge thành công */}
                        {sent && (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                                Nếu email tồn tại trong hệ thống, chúng tôi đã
                                gửi link đặt lại mật khẩu.
                            </div>
                        )}

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Field>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading
                                ? "Đang gửi..."
                                : "Gửi link đặt lại mật khẩu"}
                        </Button>

                        <div className="text-center text-sm">
                            <Link
                                href="/login"
                                className="text-primary hover:underline"
                            >
                                Quay lại đăng nhập
                            </Link>
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
