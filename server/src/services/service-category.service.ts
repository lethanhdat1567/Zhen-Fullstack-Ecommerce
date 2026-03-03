import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { checkSlugConflict } from "@/services/slug.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

export type ServiceTranslationPayload = {
    name: string;
    slug: string;
    language_code: string;
};

export type ServiceCategoryPayload = {
    status?: string;
    translations: ServiceTranslationPayload[];
};

export const serviceCategoryService = {
    // =========================
    // CREATE
    // =========================
    async create(payload: ServiceCategoryPayload) {
        const { status = "active", translations } = payload;

        if (!translations?.length) {
            throw new AppError("Translations are required", 400);
        }

        try {
            return await prisma.$transaction(async (tx) => {
                await checkSlugConflict({
                    tx,
                    model: "service_category_translations",
                    slugs: translations.map((t) => t.slug),
                });

                const category = await tx.service_categories.create({
                    data: { status },
                });

                for (const t of translations) {
                    const language = await tx.languages.findUnique({
                        where: { code: t.language_code },
                    });

                    if (!language) {
                        throw new AppError(
                            `Language ${t.language_code} not found`,
                            400,
                        );
                    }

                    await tx.service_category_translations.create({
                        data: {
                            category_id: category.id,
                            language_id: language.id,
                            name: t.name,
                            slug: t.slug,
                        },
                    });
                }

                return category;
            });
        } catch (error) {
            // 👇 BẮT UNIQUE ERROR
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new AppError(`Slug already exists`, 409);
            }

            throw error;
        }
    },

    // =========================
    // UPDATE
    // =========================
    async update(id: string, payload: ServiceCategoryPayload) {
        const category = await prisma.service_categories.findUnique({
            where: { id },
        });

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        return await prisma.$transaction(async (tx) => {
            await checkSlugConflict({
                tx,
                model: "service_category_translations",
                slugs: payload.translations?.map((t) => t.slug),
                excludeId: id,
            });

            await tx.service_categories.update({
                where: { id },
                data: {
                    status: payload.status ?? category.status,
                },
            });

            if (payload.translations?.length) {
                for (const t of payload.translations) {
                    const language = await tx.languages.findUnique({
                        where: { code: t.language_code },
                    });

                    if (!language) {
                        throw new AppError(
                            `Language ${t.language_code} not found`,
                            400,
                        );
                    }

                    await tx.service_category_translations.upsert({
                        where: {
                            category_id_language_id: {
                                category_id: id,
                                language_id: language.id,
                            },
                        },
                        update: {
                            name: t.name,
                            slug: t.slug,
                        },
                        create: {
                            category_id: id,
                            language_id: language.id,
                            name: t.name,
                            slug: t.slug,
                        },
                    });
                }
            }

            return { message: "Category updated successfully" };
        });
    },

    // =========================
    // TOGGLE STATUS
    // =========================
    async toggleStatus(id: string) {
        const category = await prisma.service_categories.findUnique({
            where: { id },
        });

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        const newStatus = category.status === "active" ? "inactive" : "active";

        return prisma.service_categories.update({
            where: { id },
            data: { status: newStatus },
        });
    },

    // =========================
    // LIST + SEARCH
    // =========================
    async list(query: {
        search?: string;
        lang?: string;
        page?: string;
        limit?: string;
        isActive?: string;
    }) {
        const { search, lang, isActive } = query;

        const where: Prisma.service_categoriesWhereInput = {
            ...(isActive ? { status: "active" } : {}),
        };

        if (search || lang) {
            where.translations = {
                some: {
                    ...(search && {
                        name: { contains: search },
                    }),
                    ...(lang && { language: { code: lang } }),
                },
            };
        }

        const include = {
            translations: {
                where: {
                    ...(lang && { language: { code: lang } }),
                    ...(search && {
                        name: { contains: search },
                    }),
                },
            },
        };

        const result = await paginate(prisma.service_categories, query, {
            where,
            include,
            orderBy: { created_at: "desc" },
        });

        if (lang) {
            result.items = result.items.map(
                ({ translations, ...rest }: any) => ({
                    ...rest,
                    name: translations?.[0]?.name ?? null,
                    slug: translations?.[0]?.slug ?? null,
                }),
            );
        }

        return result;
    },
    // =========================
    // DETAIL
    // =========================
    async detail(id: string, langCode?: string) {
        const category = await prisma.service_categories.findUnique({
            where: { id },
            include: {
                translations: {
                    include: {
                        language: {
                            select: { code: true },
                        },
                    },
                },
            },
        });

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        // 🎯 Nếu có lang → trả 1 translation
        if (langCode) {
            const translation = category.translations.find(
                (t) => t.language.code === langCode,
            );

            if (!translation) {
                throw new AppError(
                    `Translation not found for language ${langCode}`,
                    404,
                );
            }

            return {
                id: category.id,
                status: category.status,
                name: translation.name,
                slug: translation.slug,
                language_code: translation.language.code,
                created_at: category.created_at,
                updated_at: category.updated_at,
            };
        }

        // 🎯 Nếu không có lang → trả full
        return category;
    },

    // =========================
    // GET BY SLUG
    // =========================
    async getBySlug(slug: string, langCode?: string) {
        const translation =
            await prisma.service_category_translations.findFirst({
                where: {
                    slug,
                    ...(langCode && {
                        language: { code: langCode },
                    }),
                },
                include: {
                    category: {
                        include: {
                            translations: {
                                include: {
                                    language: { select: { code: true } },
                                },
                            },
                        },
                    },
                    language: {
                        select: { code: true },
                    },
                },
            });

        if (!translation) {
            throw new AppError("Category not found", 404);
        }

        const category = translation.category;

        // Nếu có lang → trả 1 translation
        if (langCode) {
            return {
                id: category.id,
                status: category.status,
                name: translation.name,
                slug: translation.slug,
                language_code: translation.language.code,
                created_at: category.created_at,
                updated_at: category.updated_at,
            };
        }

        // Không có lang → trả full category
        return category;
    },
    // =========================
    // DELETE
    // =========================
    async delete(id: string) {
        try {
            await prisma.service_categories.delete({
                where: { id },
            });

            return { message: "Category deleted successfully" };
        } catch (error: any) {
            if (error.code === "P2003") {
                throw new AppError(
                    "Không thể xóa danh mục vì vẫn còn dịch vụ đang sử dụng.",
                    400,
                );
            }

            if (error.code === "P2025") {
                throw new AppError("Danh mục không tồn tại", 404);
            }

            throw error;
        }
    },

    async bulkDelete(ids: string[]) {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new AppError("Ids is required", 400);
        }

        try {
            const result = await prisma.service_categories.deleteMany({
                where: {
                    id: { in: ids },
                },
            });

            if (result.count === 0) {
                throw new AppError("No categories found", 404);
            }

            return {
                message: "Categories deleted successfully",
                deletedCount: result.count,
            };
        } catch (error: any) {
            if (error.code === "P2003") {
                throw new AppError(
                    "Một hoặc nhiều danh mục đang chứa dịch vụ. Không thể xóa.",
                    400,
                );
            }

            throw error;
        }
    },
};
