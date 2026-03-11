"use client";

import { Field, FieldSeparator } from "@/components/ui/field";
import { authService } from "@/services/authService";
import { cartService } from "@/services/cartService";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useGoogleLogin } from "@react-oauth/google"; // Chúng ta sẽ đổi cách dùng hook này
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GoogleLogin as GoogleStandardButton } from "@react-oauth/google";

function GoogleLogin() {
    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();
    const cartItems = useCartStore((state) => state.items);
    const syncFavoriate = useFavoriteStore((state) => state.syncLocalFavorites);

    return (
        <div className="w-full">
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mb-4">
                Or continue with
            </FieldSeparator>
            <Field>
                <GoogleStandardButton
                    onSuccess={async (credentialResponse) => {
                        try {
                            const res = await authService.googleLogin({
                                idToken: credentialResponse.credential!,
                            });
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

                            toast.success("Đăng nhập thành công");

                            if (res.data.user.role === "admin") {
                                router.push("/admin/dashboard");
                            } else {
                                await cartService.mergeCart(cartItems);
                                await syncFavoriate();
                                router.push("/");
                            }
                        } catch (err) {
                            console.error(err);
                            toast.error("Đăng nhập Google thất bại");
                        }
                    }}
                    onError={() => console.log("Login Failed")}
                />
            </Field>
        </div>
    );
}

export default GoogleLogin;
