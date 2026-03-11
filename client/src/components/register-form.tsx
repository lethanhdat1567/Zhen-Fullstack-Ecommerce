"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
import { useCartStore } from "@/store/useCartStore";
import { cartService } from "@/services/cartService";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import GoogleLogin from "@/app/(auth)/components/GoogleLogin/GoogleLogin";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        full_name: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();

    const cartItems = useCartStore((state) => state.items);
    const syncFavoriate = useFavoriteStore((state) => state.syncLocalFavorites);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await authService.register(formData);

            await authService.loginFormNextClientToNextServer({
                accessToken: res.data.accessToken,
                role: res.data.user.role,
                expiresIn: res.data.expiresIn,
            });

            await setAuth({
                user: res.data.user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                expiresIn: res.data.expiresIn,
            });

            toast.success("Đăng ký tài khoản thành công!");

            if (res.data.user.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                await cartService.mergeCart(cartItems);
                syncFavoriate();
                router.push("/");
            }
        } catch (err: any) {
            if (err instanceof HttpError) {
                if (err.status === 409) {
                    setError("Username hoặc Email đã được sử dụng");
                } else {
                    setError(err.message || "Đăng ký thất bại");
                }
            } else {
                setError("Đã có lỗi xảy ra, vui lòng thử lại");
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
                        <h1 className="text-xl font-bold">Tạo tài khoản mới</h1>
                        <FieldDescription>
                            Nhập thông tin bên dưới để bắt đầu trải nghiệm
                        </FieldDescription>
                    </div>

                    {/* Full Name */}
                    <Field>
                        <FieldLabel htmlFor="full_name">Họ và tên</FieldLabel>
                        <Input
                            id="full_name"
                            type="text"
                            placeholder="Nhập họ tên đầy đủ của bạn" // Đã sửa
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    {/* Username */}
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input
                            id="username"
                            type="text"
                            placeholder="username" // Đã sửa
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="yourname@example.com" // Đã sửa
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    {/* Error message */}
                    {error && (
                        <p className="text-destructive text-sm font-medium">
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Đang xử lý..." : "Đăng ký ngay"}
                    </Button>
                    <GoogleLogin />
                    <Field>
                        <FieldDescription className="text-center">
                            Đã có tài khoản?{" "}
                            <a
                                href={"/login"}
                                className="text-primary hover:underline"
                            >
                                Đăng nhập
                            </a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
