import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { AppError } from "@/utils/appError";

export interface CreateHeroBannerDTO {
    thumbnail: string;
    sort_order?: number;
}

export interface ListHeroBannerQuery {
    search?: string;
}

export const heroBannerService = {
    /* =========================
       CREATE
    ========================= */

    async create(data: CreateHeroBannerDTO[]) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new AppError("Dữ liệu không hợp lệ.", 400);
        }

        // Validate từng phần tử
        data.forEach((item, index) => {
            if (!item.thumbnail) {
                throw new AppError(
                    `Thumbnail là bắt buộc tại vị trí ${index + 1}.`,
                    400,
                );
            }
        });

        return prisma.$transaction(async (tx) => {
            const created = await Promise.all(
                data.map((item) =>
                    tx.hero_banners.create({
                        data: {
                            thumbnail: item.thumbnail,
                            sort_order: item.sort_order ?? 0,
                        },
                    }),
                ),
            );

            return created;
        });
    },

    /* =========================
       LIST
    ========================= */

    async findAll(params?: ListHeroBannerQuery) {
        const where = params?.search
            ? {
                  thumbnail: {
                      contains: params.search,
                  },
              }
            : {};

        const result = await paginate(
            prisma.hero_banners,
            params ?? ({} as any),
            {
                where,
                orderBy: {
                    sort_order: "asc",
                },
            },
        );

        return result;
    },

    async update(data: CreateHeroBannerDTO[]) {
        if (!Array.isArray(data)) {
            throw new AppError("Dữ liệu không hợp lệ.", 400);
        }

        // Validate từng item
        data.forEach((item, index) => {
            if (!item.thumbnail) {
                throw new AppError(
                    `Thumbnail là bắt buộc tại vị trí ${index + 1}.`,
                    400,
                );
            }
        });

        return prisma.$transaction(async (tx) => {
            // 1️⃣ Xoá toàn bộ
            await tx.hero_banners.deleteMany({});

            // 2️⃣ Nếu payload rỗng thì chỉ xóa thôi
            if (data.length === 0) {
                return [];
            }

            // 3️⃣ Tạo lại toàn bộ
            const created = await Promise.all(
                data.map((item) =>
                    tx.hero_banners.create({
                        data: {
                            thumbnail: item.thumbnail,
                            sort_order: item.sort_order ?? 0,
                        },
                    }),
                ),
            );

            return created;
        });
    },

    /* =========================
       DETAIL
    ========================= */

    async findById(id: string) {
        return prisma.hero_banners.findUnique({
            where: { id },
        });
    },

    /* =========================
       DELETE
    ========================= */

    async delete(id: string) {
        return prisma.hero_banners.delete({
            where: { id },
        });
    },

    async bulkDelete(ids: string[]) {
        if (!ids?.length) {
            throw new AppError("Danh sách ID không hợp lệ.", 400);
        }

        const result = await prisma.hero_banners.deleteMany({
            where: {
                id: { in: ids },
            },
        });

        return {
            deletedCount: result.count,
        };
    },
};
