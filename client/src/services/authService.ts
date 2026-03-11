// src/services/auth.service.ts

import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type LoginParams = {
    username: string;
    password: string;
};

export type RefreshParams = {
    refreshToken: string;
};

export type ResetPasswordParams = {
    token: string;
    password: string;
};

export type AuthResponse<T> = {
    message?: string;
    data: T;
};

export type LoginResponse = {
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
        avatar: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};
export type GoogleLoginParams = {
    idToken: string;
};

/* =========================
   SERVICE
========================= */

export const authService = {
    async login(params: LoginParams) {
        const res = await http.post<AuthResponse<{ data: LoginResponse }>>(
            "/auth/login",
            params,
        );

        return res.data;
    },

    async loginFormNextClientToNextServer(data: {
        accessToken: string;
        role: string;
        expiresIn: number;
    }) {
        return http.post<{ message: string }>("/api/auth", data, {
            base: "next",
        });
    },
    async register(payload: any) {
        const res = await http.post<AuthResponse<any>>(
            "/auth/register",
            payload,
        );

        return res.data;
    },

    async refresh(params: RefreshParams) {
        const res = await http.post<AuthResponse<{ data: LoginResponse }>>(
            "/auth/refresh",
            params,
        );

        return res.data;
    },

    async refreshFromClientToServer({
        refresh_token,
    }: {
        refresh_token: string;
    }) {
        const res = await http.post<any>(
            "/api/auth/slice-session",
            { refresh_token },
            { base: "next" },
        );

        return res;
    },

    async logout(params: RefreshParams) {
        const res = await http.post<AuthResponse<null>>("/auth/logout", params);

        return res.data;
    },

    async logoutFromClientToServer({ refreshToken }: { refreshToken: string }) {
        const res = await http.post<AuthResponse<null>>(
            "/api/auth/logout",
            {
                refreshToken,
            },
            {
                base: "next",
            },
        );

        return res.data;
    },

    async forgotPassword(email: string) {
        const res = await http.post<AuthResponse<null>>(
            "/auth/forgot-password",
            { email },
        );

        return res.data;
    },

    async verifyResetToken(token: string) {
        const res = await http.get<AuthResponse<{ valid: boolean }>>(
            `/auth/reset-password/verify?token=${token}`,
        );

        return res.data;
    },

    async resetPassword(params: ResetPasswordParams) {
        const res = await http.post<AuthResponse<null>>(
            "/auth/reset-password",
            params,
        );

        return res.data;
    },

    async googleLogin(params: GoogleLoginParams) {
        const res = await http.post<AuthResponse<{ data: LoginResponse }>>(
            "/auth/google-login",
            params,
        );

        return res.data;
    },
};
