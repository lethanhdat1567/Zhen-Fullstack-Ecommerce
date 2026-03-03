import { create } from "zustand";
import { persist } from "zustand/middleware";

type Admin = {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar: string;
};

type AuthState = {
    admin: Admin | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;

    setAuth: (data: {
        admin: Admin;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }) => void;

    updateToken: (data: { accessToken: string; expiresIn: number }) => void;

    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            admin: null,
            accessToken: null,
            refreshToken: null,
            expiresIn: null,

            setAuth: ({ admin, accessToken, refreshToken, expiresIn }) =>
                set({
                    admin,
                    accessToken,
                    refreshToken,
                    expiresIn,
                }),

            updateToken: ({ accessToken, expiresIn }) =>
                set((state) => ({
                    ...state,
                    accessToken,
                    expiresIn,
                })),

            clearAuth: () =>
                set({
                    admin: null,
                    accessToken: null,
                    refreshToken: null,
                    expiresIn: null,
                }),
        }),
        {
            name: "auth-storage",
        },
    ),
);
