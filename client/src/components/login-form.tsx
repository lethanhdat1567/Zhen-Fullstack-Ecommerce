"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo/Logo";
import { authService } from "@/services/authService";
import { HttpError } from "@/lib/http/errors";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await authService.login({
                username: identifier,
                password,
            });
            console.log(res);

            await authService.loginFormNextClientToNextServer({
                accessToken: res.data.accessToken,
                expiresIn: res.data.expiresIn,
            });

            await setAuth({
                admin: res.data.admin,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                expiresIn: res.data.expiresIn,
            });

            toast.success("Đăng nhập thành công");
            router.push("/admin/dashboard");
        } catch (err: any) {
            if (err instanceof HttpError) {
                if (err.status === 401) {
                    setError("Tài khoản hoặc mật khẩu không đúng");
                } else {
                    setError(err.message);
                }
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Logo />
                        <h1 className="text-xl font-bold">
                            Chào mừng bạn trở lại
                        </h1>
                        <FieldDescription>
                            Vui lòng đăng nhập để quản lý dự án của bạn
                        </FieldDescription>
                    </div>

                    {/* Identifier */}
                    <Field>
                        <FieldLabel htmlFor="identifier">
                            Email hoặc Username
                        </FieldLabel>
                        <Input
                            id="identifier"
                            type="text"
                            placeholder="admin@example.com"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </Field>

                    {/* Password */}
                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                            <Link
                                href="/forgot-password"
                                className="text-primary text-sm hover:underline"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Field>

                    {/* Error message */}
                    {error && (
                        <p className="text-destructive text-sm">{error}</p>
                    )}

                    {/* Submit */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </FieldGroup>
            </form>
        </div>
    );
}
