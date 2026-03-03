"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { HttpError } from "@/lib/http/errors";

export default function SliceSession() {
    const router = useRouter();
    const refreshToken = useAuthStore((state) => state.refreshToken);
    const updateToken = useAuthStore((state) => state.updateToken);

    useEffect(() => {
        setInterval(async () => {
            if (!refreshToken) return;
            try {
                const res = await authService.refreshFromClientToServer({
                    refresh_token: refreshToken || "",
                });

                updateToken({
                    accessToken: res.accessToken,
                    expiresIn: res.expiresIn,
                });
            } catch (error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        router.push("/logout");
                    }
                }
            }
        }, 900000); // 15 minute
    }, [router, refreshToken]);

    return null;
}
