import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

class FavoriteService {
    async toggleFavorite(
        user_id: string,
        data: { product_id?: string; service_id?: string },
    ) {
        const { product_id, service_id } = data;

        if (!product_id && !service_id) {
            throw new AppError("Product ID or Service ID is required", 400);
        }

        // 1. Kiểm tra xem item đã được thích chưa
        const existingFavorite = await prisma.user_favorites.findFirst({
            where: {
                user_id,
                ...(product_id ? { product_id } : { service_id }),
            },
        });

        if (existingFavorite) {
            // 2. Nếu thích rồi -> Unlike (Xóa)
            await prisma.user_favorites.delete({
                where: { id: existingFavorite.id },
            });
            return { liked: false, message: "Removed from favorites" };
        } else {
            // 3. Nếu chưa thích -> Like (Tạo mới)
            // Optional: Kiểm tra ID có tồn tại thật trong DB không trước khi tạo
            if (product_id) {
                const p = await prisma.products.findUnique({
                    where: { id: product_id },
                });
                if (!p) throw new AppError("Product not found", 404);
            } else if (service_id) {
                const s = await prisma.services.findUnique({
                    where: { id: service_id },
                });
                if (!s) throw new AppError("Service not found", 404);
            }

            await prisma.user_favorites.create({
                data: {
                    user_id,
                    product_id,
                    service_id,
                },
            });
            return { liked: true, message: "Added to favorites" };
        }
    }

    // favorite.service.ts
    async syncFavorites(
        user_id: string,
        localFavorites: { type: "product" | "service"; id: string }[],
    ) {
        if (!localFavorites || localFavorites.length === 0) return { count: 0 };

        // 1. Lấy danh sách hiện tại để tránh trùng lặp
        const existingFavorites = await prisma.user_favorites.findMany({
            where: { user_id },
            select: { product_id: true, service_id: true },
        });

        // 2. Lọc ra những item CHƯA có trong database
        const newItems = localFavorites.filter((localItem) => {
            return !existingFavorites.some((dbItem) => {
                if (localItem.type === "product") {
                    return dbItem.product_id === localItem.id;
                } else {
                    return dbItem.service_id === localItem.id;
                }
            });
        });

        if (newItems.length === 0) return { count: 0 };

        // 3. Map sang đúng cấu trúc bảng DB để insert
        const dataToInsert = newItems.map((item) => ({
            user_id,
            product_id: item.type === "product" ? item.id : null,
            service_id: item.type === "service" ? item.id : null,
        }));

        // 4. Insert hàng loạt
        return await prisma.user_favorites.createMany({
            data: dataToInsert,
            skipDuplicates: true,
        });
    }

    async getFavorites(user_id: string, type?: string, lang?: string) {
        const whereClause: any = { user_id };

        if (type === "product") whereClause.product_id = { not: null };
        if (type === "service") whereClause.service_id = { not: null };

        const favorites = await prisma.user_favorites.findMany({
            where: whereClause,
            include: {
                product: {
                    include: {
                        translations: {
                            where: lang ? { language: { code: lang } } : {},
                        },
                    },
                },
                service: {
                    include: {
                        translations: {
                            where: lang ? { language: { code: lang } } : {},
                        },
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        return favorites.map((fav) => {
            if (fav.product) {
                const { translations, ...rest } = fav.product;
                return {
                    type: "product",
                    ...rest,
                    title: translations[0]?.title || null,
                    slug: translations[0]?.slug || null,
                };
            }
            if (fav.service) {
                const { translations, ...rest } = fav.service;
                return {
                    type: "service",
                    ...rest,
                    title: translations[0]?.title || null,
                    slug: translations[0]?.slug || null,
                };
            }
        });
    }

    // favorite.service.ts
    async checkLikedStatus(
        user_id: string,
        data: { product_id?: string; service_id?: string },
    ) {
        const { product_id, service_id } = data;

        // 1. Validate đầu vào
        if (!product_id && !service_id) {
            throw new AppError(
                "Either product_id or service_id must be provided",
                400,
            );
        }

        // 2. Tìm kiếm record trong DB
        const favorite = await prisma.user_favorites.findFirst({
            where: {
                user_id,
                AND: [
                    product_id ? { product_id } : {},
                    service_id ? { service_id } : {},
                ],
            },
            select: { id: true },
        });

        return !!favorite;
    }
}

export default new FavoriteService();
