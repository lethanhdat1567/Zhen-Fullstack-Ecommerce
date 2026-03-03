"use client";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LogoutPage() {
    const router = useRouter();
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const refreshToken = useAuthStore((state) => state.refreshToken);

    useEffect(() => {
        const fetchLogout = async () => {
            try {
                await authService.logoutFromClientToServer({
                    refreshToken: refreshToken || "",
                });
            } catch (error) {
                console.log(error);
            } finally {
                clearAuth();
                router.push(`/login?expired=true`);
            }
        };

        fetchLogout();
    }, []);

    return null;
}

export default LogoutPage;
