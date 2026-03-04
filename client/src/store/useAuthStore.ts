import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar: string;
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    isInitialized: boolean;

    setAuth: (data: {
        user: User;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }) => void;

    updateToken: (data: { accessToken: string; expiresIn: number }) => void;
    setInitialized: (status: boolean) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            expiresIn: null,
            isInitialized: false,

            setAuth: ({ user, accessToken, refreshToken, expiresIn }) =>
                set({
                    user,
                    accessToken,
                    refreshToken,
                    expiresIn,
                }),
            setInitialized: (status) => set({ isInitialized: status }),
            updateToken: ({ accessToken, expiresIn }) =>
                set((state) => ({
                    ...state,
                    accessToken,
                    expiresIn,
                })),

            clearAuth: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    expiresIn: null,
                }),
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: (state) => {
                return () => state?.setInitialized(true);
            },
        },
    ),
);
