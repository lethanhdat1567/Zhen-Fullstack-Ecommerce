import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { checkSlugConflict } from "@/services/slug.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

/* =========================
   TYPES
========================= */

export interface PostCategoryTranslationDTO {
    language_code: string;
    name: string;
    slug: string;
}

export interface CreatePostCategoryDTO {
    translations: PostCategoryTranslationDTO[];
}

export interface UpdatePostCategoryDTO {
    translations: PostCategoryTranslationDTO[];
}

export interface ListPostCategoryQuery {
    lang?: string;
    search?: string;
    page?: string;
    limit?: string;
    isActive?: boolean;
}

/* =========================
   SERVICE
========================= */

class PostCategoryService {
    /* =========================
       HELPER
    ========================= */

    private transformWithLang(category: any) {
        const { translations, ...rest } = category;
        const t = translations?.[0];

        return {
            ...rest,
            name: t?.name ?? null,
            slug: t?.slug ?? null,
        };
    }

    /* =========================
       CREATE
    ========================= */

    async createCategory(data: CreatePostCategoryDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                // 1️⃣ Load languages theo code
                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in: data.translations.map((t) => t.language_code),
                        },
                    },
                });

                // 2️⃣ Tạo category
                const category = await tx.post_categories.create({
                    data: {
                        status: "active",
                    },
                });

                await checkSlugConflict({
                    tx,
                    model: "post_category_translations",
                    slugs: data.translations.map((t) => t.slug),
                });

                // 3️⃣ Tạo translations
                for (const t of data.translations) {
                    const language = languages.find(
                        (l) => l.code === t.language_code,
                    );

                    if (!language) {
                        throw new AppError(
                            `Language not found: ${t.language_code}`,
                            400,
                        );
                    }

                    await tx.post_category_translations.create({
                        data: {
                            category_id: category.id,
                            language_id: language.id,
                            name: t.name,
                            slug: t.slug,
                        },
                    });
                }

                // 4️⃣ Return full data
                return tx.post_categories.findUnique({
                    where: { id: category.id },
                    include: {
                        translations: {
                            include: {
                                language: true,
                            },
                        },
                    },
                });
            });
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new AppError("Slug already exists", 409);
            }

            throw error;
        }
    }

    /* =========================
       UPDATE
    ========================= */

    async updateCategory(id: string, data: UpdatePostCategoryDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                // load languages 1 lần
                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in: data.translations.map((t) => t.language_code),
                        },
                    },
                });

                await checkSlugConflict({
                    tx,
                    model: "post_category_translations",
                    slugs: data.translations.map((t) => t.slug),
                    excludeId: id,
                });

                for (const t of data.translations) {
                    const language = languages.find(
                        (l) => l.code === t.language_code,
                    );

                    if (!language) {
                        throw new AppError(
                            `Language not found: ${t.language_code}`,
                            400,
                        );
                    }

                    await tx.post_category_translations.upsert({
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

                return tx.post_categories.findUnique({
                    where: { id },
                    include: {
                        translations: {
                            include: {
                                language: true,
                            },
                        },
                    },
                });
            });
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new AppError("Slug already exists", 409);
            }

            throw error;
        }
    }

    /* =========================
       LIST
    ========================= */

    async listCategories(query: ListPostCategoryQuery) {
        const { lang, search, isActive } = query;

        const where: Prisma.post_categoriesWhereInput = {
            ...(isActive && { status: "active" }),
        };

        if (search) {
            where.translations = {
                some: {
                    ...(lang && { language: { code: lang } }),
                    OR: [
                        { name: { contains: search } },
                        { slug: { contains: search } },
                    ],
                },
            };
        }

        const include: Prisma.post_categoriesInclude = {
            translations: lang
                ? {
                      where: {
                          language: { code: lang },
                      },
                  }
                : true,
        };

        const result = await paginate(prisma.post_categories, query as any, {
            where,
            include,
            orderBy: { created_at: "desc" },
        });

        if (lang) {
            result.items = result.items.map((c: any) =>
                this.transformWithLang(c),
            );
        }

        return result;
    }

    /* =========================
       DETAIL
    ========================= */

    async getDetail(slug: string, lang?: string) {
        const category = await prisma.post_categories.findFirst({
            where: {
                translations: {
                    some: {
                        slug,
                        ...(lang && {
                            language: { code: lang },
                        }),
                    },
                },
            },
            include: {
                translations: lang
                    ? {
                          where: {
                              language: { code: lang },
                          },
                      }
                    : true,
            },
        });

        if (!category) return null;

        if (lang) {
            return this.transformWithLang(category);
        }

        return category;
    }

    async getById(id: string, lang?: string) {
        const category = await prisma.post_categories.findUnique({
            where: { id },
            include: {
                translations: {
                    where: lang
                        ? {
                              language: { code: lang },
                          }
                        : undefined,
                    include: {
                        language: {
                            select: {
                                code: true,
                            },
                        },
                    },
                },
            },
        });

        if (!category) return null;

        return category;
    }

    /* =========================
       DELETE
    ========================= */

    async deleteCategory(id: string) {
        try {
            return await prisma.post_categories.delete({
                where: { id },
            });
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003"
            ) {
                throw new AppError(
                    "Không thể xóa danh mục vì đang có bài viết sử dụng danh mục này.",
                    409,
                );
            }

            throw error;
        }
    }

    async bulkDeleteCategory(ids: string[]) {
        if (!ids?.length) {
            throw new AppError("Danh sách ID không hợp lệ.", 400);
        }

        try {
            const result = await prisma.post_categories.deleteMany({
                where: {
                    id: { in: ids },
                },
            });

            return {
                deletedCount: result.count,
            };
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003"
            ) {
                throw new AppError(
                    "Một hoặc nhiều danh mục đang được sử dụng trong bài viết nên không thể xóa.",
                    409,
                );
            }

            throw error;
        }
    }

    async toggleStatus(id: string) {
        const category = await prisma.post_categories.findUnique({
            where: { id },
        });

        if (!category) {
            throw new Error("Category not found");
        }

        const updated = await prisma.post_categories.update({
            where: { id },
            data: {
                status: category.status === "active" ? "inactive" : "active",
            },
        });

        return updated;
    }
}

export default new PostCategoryService();
