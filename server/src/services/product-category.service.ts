import { prisma } from "@/lib/prisma";
import { paginate, PaginationQuery } from "@/services/pagination.service";
import { checkSlugConflict } from "@/services/slug.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

export interface ProductCategoryTranslationDTO {
    language_code: string;
    name: string;
    slug: string;
}

export interface CreateProductCategoryDTO {
    status: string;
    translations: ProductCategoryTranslationDTO[];
}

export interface UpdateProductCategoryDTO {
    status: string;
    translations: ProductCategoryTranslationDTO[];
}

export interface ListProductCategoryQuery {
    lang?: string;
    search?: string;
    isActive?: string;
    page?: string;
    limit?: string;
}

class ProductCategoryService {
    private transformWithLang(category: any) {
        const { translations, ...rest } = category;
        const t = translations?.[0];

        return {
            name: t?.name ?? null,
            slug: t?.slug ?? null,
            ...rest,
        };
    }

    async createCategory(data: CreateProductCategoryDTO) {
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

                // 2️⃣ Check slug conflict trước khi create
                await checkSlugConflict({
                    tx,
                    model: "product_category_translations",
                    slugs: data.translations.map((t) => t.slug),
                });

                // 3️⃣ Tạo category
                const category = await tx.product_categories.create({
                    data: {
                        status: "active",
                    },
                });

                // 4️⃣ Tạo translations
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

                    await tx.product_category_translations.create({
                        data: {
                            category_id: category.id,
                            language_id: language.id,
                            name: t.name,
                            slug: t.slug,
                        },
                    });
                }

                // 5️⃣ Return full data
                return tx.product_categories.findUnique({
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

    async updateCategory(id: string, data: UpdateProductCategoryDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                await checkSlugConflict({
                    tx,
                    model: "product_category_translations",
                    slugs: data.translations.map((t) => t.slug),
                    excludeId: id,
                });

                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in: data.translations.map((t) => t.language_code),
                        },
                    },
                });

                for (const t of data.translations) {
                    const language = languages.find(
                        (l) => l.code === t.language_code,
                    );

                    if (!language) {
                        throw new Error(
                            `Language not found: ${t.language_code}`,
                        );
                    }

                    await tx.product_category_translations.upsert({
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

                return tx.product_categories.findUnique({
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

    async listCategories(query: ListProductCategoryQuery) {
        const { lang, search, isActive } = query;

        // Status
        const where: Prisma.product_categoriesWhereInput = {
            ...(isActive !== undefined ? { status: "active" } : {}),
        };

        // Search
        if (search) {
            where.translations = {
                some: {
                    OR: [
                        { name: { contains: search } },
                        { slug: { contains: search } },
                    ],
                },
            };
        }

        // Check lange
        const include: Prisma.product_categoriesInclude = {
            translations: lang
                ? {
                      where: {
                          language: { code: lang },
                      },
                  }
                : true,
        };

        const paginationQuery: PaginationQuery = {
            page: query.page,
            limit: query.limit,
        };

        const result = await paginate(
            prisma.product_categories,
            paginationQuery,
            {
                where,
                include,
                orderBy: { created_at: "desc" },
            },
        );

        if (lang) {
            result.items = result.items.map((c: any) =>
                this.transformWithLang(c),
            );
        }

        return result;
    }

    async getDetail(slug: string, lang?: string) {
        const category = await prisma.product_categories.findFirst({
            where: {
                translations: {
                    some: {
                        slug,
                        ...(lang && {
                            language: {
                                code: lang,
                            },
                        }),
                    },
                },
            },
            include: {
                translations: lang
                    ? {
                          where: {
                              language: {
                                  code: lang,
                              },
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
        const category = await prisma.product_categories.findUnique({
            where: { id },
            include: {
                translations: {
                    where: lang
                        ? {
                              language: {
                                  code: lang,
                              },
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

        if (!category) {
            throw new Error("Category not found");
        }

        return category;
    }

    async toggleStatus(id: string) {
        const category = await prisma.product_categories.findUnique({
            where: { id },
        });

        if (!category) {
            throw new Error("Category not found");
        }

        const updated = await prisma.product_categories.update({
            where: { id },
            data: {
                status: category.status === "active" ? "inactive" : "active",
            },
        });

        return updated;
    }

    async deleteCategory(id: string) {
        try {
            return await prisma.product_categories.delete({
                where: { id },
            });
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003"
            ) {
                throw new AppError(
                    "Không thể xóa danh mục vì đang có sản phẩm thuộc danh mục này.",
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
            const result = await prisma.product_categories.deleteMany({
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
                    "Không thể xóa một hoặc nhiều danh mục vì đang có sản phẩm liên kết.",
                    409,
                );
            }

            throw error;
        }
    }
}

export default new ProductCategoryService();
