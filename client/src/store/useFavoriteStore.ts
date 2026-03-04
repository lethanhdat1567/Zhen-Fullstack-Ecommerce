import { favoriteService, FavoriteItem } from "@/services/favoriteService";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoriteState {
    items: FavoriteItem[];
    // Actions
    fetchFavorites: (params?: {
        type?: "product" | "service";
        lang?: string;
    }) => Promise<void>;
    toggleFavorite: (item: FavoriteItem) => Promise<void>;
    syncLocalFavorites: () => Promise<void>;
    clearFavorites: () => void;
    isLiked: (id: string, type: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set, get) => {
            return {
                items: [],

                isLiked: (id: string, type: string) => {
                    const { items } = get();
                    return items.some(
                        (item) => item.id === id && item.type === type,
                    );
                },

                // Lấy danh sách từ Server (nếu đã login) hoặc giữ nguyên local
                fetchFavorites: async (params) => {
                    const { user } = useAuthStore.getState();
                    if (user) {
                        try {
                            const res =
                                await favoriteService.getFavorites(params);
                            set({ items: res || [] });
                        } catch (error) {
                            console.error("Fetch favorites error:", error);
                        }
                    }
                },

                // Thêm hoặc xóa yêu thích
                toggleFavorite: async (item: FavoriteItem) => {
                    const { user } = useAuthStore.getState();
                    const { items } = get();

                    const payload = {
                        product_id:
                            item.type === "product" ? item.id : undefined,
                        service_id:
                            item.type === "service" ? item.id : undefined,
                    };

                    if (user) {
                        try {
                            const res =
                                await favoriteService.toggleFavorite(payload);
                            if (res.liked) {
                                toast.success(
                                    "Đã thêm vào danh sách yêu thích",
                                );
                            } else {
                                toast.success(
                                    "Đã xóa khỏi danh sách yêu thích",
                                );
                            }
                            // Refresh lại list từ server để đảm bảo data chuẩn (title, slug, price...)
                            const updatedList =
                                await favoriteService.getFavorites();
                            set({ items: updatedList || [] });
                        } catch (error: any) {
                            toast.error(
                                error.response?.data?.message ||
                                    "Không thể thực hiện",
                            );
                        }
                    } else {
                        // CASE 2: GUEST -> Xử lý local
                        const isExist = items.find(
                            (i) => i.id === item.id && i.type === item.type,
                        );

                        if (isExist) {
                            set({
                                items: items.filter(
                                    (i) =>
                                        !(
                                            i.id === item.id &&
                                            i.type === item.type
                                        ),
                                ),
                            });
                            toast.success("Đã xóa khỏi danh sách yêu thích");
                        } else {
                            set({ items: [...items, item] });
                            toast.success(
                                "Đã thêm vào danh sách yêu thích (Local)",
                            );
                        }
                    }
                },

                syncLocalFavorites: async () => {
                    const { user } = useAuthStore.getState();
                    const { items } = get();

                    if (user && items.length > 0) {
                        try {
                            const favoritesPayload = items.map(
                                ({ type, id }) => ({ type, id }),
                            );

                            await favoriteService.syncFavorites(
                                favoritesPayload,
                            );

                            const serverItems =
                                await favoriteService.getFavorites();
                            set({ items: serverItems || [] });

                            console.log(
                                "Synced with type-safe body successfully",
                            );
                        } catch (error) {
                            console.error("Sync failed:", error);
                        }
                    }
                },

                clearFavorites: () => set({ items: [] }),
            };
        },
        {
            name: "favorite-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
