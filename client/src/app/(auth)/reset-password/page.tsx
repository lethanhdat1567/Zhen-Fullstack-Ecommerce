"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
} from "@/components/ui/field";

import { HttpError } from "@/lib/http/errors";
import Logo from "@/components/Logo/Logo";
import { authService } from "@/services/authService";

function ResetPassword() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    /* =========================
       VERIFY TOKEN
    ========================= */

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                await authService.verifyResetToken(token);
                setValid(true);
            } catch {
                setValid(false);
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [token]);

    /* =========================
       SUBMIT NEW PASSWORD
    ========================= */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        setSubmitting(true);
        setError(null);

        try {
            await authService.resetPassword({
                token,
                password,
            });

            setSuccess(true);

            // Redirect sau 2s
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err: unknown) {
            if (err instanceof HttpError) {
                setError((err.data as any)?.message || err.message);
            } else {
                setError("Đã xảy ra lỗi.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-background flex min-h-svh items-center justify-center p-6 font-[Inter]">
            <div className="w-full max-w-sm">
                <div className="space-y-6 p-6">
                    <FieldGroup>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Logo />
                            <h1 className="text-xl font-bold">
                                Đặt lại mật khẩu
                            </h1>
                            <FieldDescription>
                                Tạo mật khẩu mới cho tài khoản của bạn
                            </FieldDescription>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <p className="text-muted-foreground text-center text-sm">
                                Đang kiểm tra link...
                            </p>
                        )}

                        {/* Invalid token */}
                        {!loading && !valid && (
                            <div className="space-y-4 text-center">
                                <p className="text-destructive text-sm">
                                    Link không hợp lệ hoặc đã hết hạn.
                                </p>
                                <Link
                                    href="/forgot-password"
                                    className="text-primary text-sm hover:underline"
                                >
                                    Yêu cầu link mới
                                </Link>
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm text-green-700">
                                Mật khẩu đã được đặt lại thành công. Đang chuyển
                                hướng về đăng nhập...
                            </div>
                        )}

                        {/* Form */}
                        {!loading && valid && !success && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        Mật khẩu mới
                                    </FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        minLength={6}
                                    />
                                </Field>

                                {error && (
                                    <p className="text-destructive text-sm">
                                        {error}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? "Đang cập nhật..."
                                        : "Cập nhật mật khẩu"}
                                </Button>
                            </form>
                        )}
                    </FieldGroup>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
