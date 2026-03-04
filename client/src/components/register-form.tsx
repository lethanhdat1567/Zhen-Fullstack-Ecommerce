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
            // 1. Gọi API Register (Đã bao gồm logic trả về token)
            const res = await authService.register(formData);

            // 2. Lưu Cookie (Next Server) để Middleware đọc được
            await authService.loginFormNextClientToNextServer({
                accessToken: res.data.accessToken,
                role: res.data.user.role,
                expiresIn: res.data.expiresIn,
            });

            // 3. Cập nhật Zustand Store
            await setAuth({
                user: res.data.user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                expiresIn: res.data.expiresIn,
            });

            toast.success("Đăng ký tài khoản thành công!");

            // 4. Điều hướng dựa trên Role
            if (res.data.user.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                await cartService.mergeCart(cartItems);
                syncFavoriate();
                router.push("/");
            }
        } catch (err: any) {
            if (err instanceof HttpError) {
                // Handle lỗi 409 Conflict (Username/Email đã tồn tại)
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
                            placeholder="Nguyễn Văn A"
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
                            placeholder="admin123"
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
                            placeholder="example@gmail.com"
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
                            placeholder="••••••••"
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

                    <div className="text-center text-sm">
                        Đã có tài khoản?{" "}
                        <Link
                            href="/login"
                            className="text-primary hover:underline"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                </FieldGroup>
            </form>
        </div>
    );
}
