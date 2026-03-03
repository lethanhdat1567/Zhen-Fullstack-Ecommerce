import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { checkSlugConflict } from "@/services/slug.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

/* =========================
   TYPES
========================= */

export interface MediaCategoryTranslationInput {
    language_code: string;
    name: string;
    slug: string;
}

export interface CreateMediaCategoryDTO {
    status?: string;
    translations: MediaCategoryTranslationInput[];
}

export interface UpdateMediaCategoryDTO {
    status?: string;
    translations?: MediaCategoryTranslationInput[];
}

export interface ListMediaCategoryQuery {
    lang?: string; // language.code
    search?: string;
    isActive?: boolean;
    page?: string;
    limit?: string;
}

/* =========================
   SERVICE
========================= */

export const mediaCategoryService = {
    /* =========================
       HELPERS
    ========================= */

    buildInclude(lang?: string) {
        return {
            translations: lang
                ? {
                      where: {
                          language: {
                              code: lang,
                          },
                      },
                      include: {
                          language: true,
                      },
                  }
                : {
                      include: {
                          language: true,
                      },
                  },
        };
    },

    buildWhere(query?: ListMediaCategoryQuery) {
        if (!query) return {};

        const { lang, search, isActive } = query;

        return {
            ...(isActive && { status: "active" }),

            ...(lang || search
                ? {
                      translations: {
                          some: {
                              ...(lang && {
                                  language: {
                                      code: lang,
                                  },
                              }),
                              ...(search && {
                                  name: { contains: search },
                              }),
                          },
                      },
                  }
                : {}),
        };
    },

    transform(category: any, lang?: string) {
        if (lang) {
            const translation = category.translations?.[0] ?? null;

            return {
                id: category.id,
                status: category.status,
                created_at: category.created_at,
                updated_at: category.updated_at,

                ...(translation && {
                    name: translation.name,
                    slug: translation.slug,
                }),
            };
        }

        // Không có lang → trả toàn bộ translations
        return {
            id: category.id,
            status: category.status,
            created_at: category.created_at,
            updated_at: category.updated_at,
            translations: category.translations,
        };
    },
    /* =========================
       CREATE
    ========================= */

    async create(data: CreateMediaCategoryDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                // 1️⃣ Load languages
                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in: data.translations.map((t) => t.language_code),
                        },
                    },
                });

                // 2️⃣ Check slug conflict (DÙNG HÀM CÓ SẴN)
                await checkSlugConflict({
                    tx,
                    model: "media_category_translations",
                    slugs: data.translations.map((t) => t.slug),
                });

                // 3️⃣ Build translation data
                const translationData = data.translations.map((t) => {
                    const language = languages.find(
                        (l) => l.code === t.language_code,
                    );

                    if (!language) {
                        throw new AppError(
                            `Language not found: ${t.language_code}`,
                            400,
                        );
                    }

                    return {
                        language_id: language.id,
                        name: t.name,
                        slug: t.slug,
                    };
                });

                // 4️⃣ Create category
                const category = await tx.media_categories.create({
                    data: {
                        status: data.status ?? "active",
                        translations: {
                            create: translationData,
                        },
                    },
                    include: this.buildInclude(),
                });

                return this.transform(category);
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
    },
    async toggleStatus(id: string) {
        const category = await prisma.media_categories.findUnique({
            where: { id },
        });

        if (!category) {
            throw new Error("Category not found");
        }

        const updated = await prisma.media_categories.update({
            where: { id },
            data: {
                status: category.status === "active" ? "inactive" : "active",
            },
        });

        return updated;
    },
    /* =========================
       LIST
    ========================= */

    async findAll(params?: ListMediaCategoryQuery) {
        const where = this.buildWhere(params);
        const include = this.buildInclude(params?.lang);

        const result = await paginate(
            prisma.media_categories,
            params ?? ({} as any),
            {
                where,
                include,
                orderBy: { created_at: "desc" },
            },
        );

        result.items = result.items.map((category: any) =>
            this.transform(category, params?.lang),
        );

        return result;
    },
    /* =========================
       DETAIL
    ========================= */

    async findById(id: string, lang?: string) {
        const category = await prisma.media_categories.findUnique({
            where: { id },
            include: this.buildInclude(lang),
        });

        if (!category) return null;

        return this.transform(category, lang);
    },

    /* =========================
       UPDATE
    ========================= */

    async update(id: string, data: UpdateMediaCategoryDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                let translationData: any[] | undefined = undefined;

                if (data.translations) {
                    await checkSlugConflict({
                        tx,
                        model: "media_category_translations",
                        slugs: data.translations?.map((t) => t.slug),
                        excludeId: id,
                    });
                    // 1️⃣ Lấy languages theo code
                    const languages = await tx.languages.findMany({
                        where: {
                            code: {
                                in: data.translations.map(
                                    (t) => t.language_code,
                                ),
                            },
                        },
                    });

                    // 2️⃣ Map sang language_id
                    translationData = data.translations.map((t) => {
                        const language = languages.find(
                            (l) => l.code === t.language_code,
                        );

                        if (!language) {
                            throw new Error(
                                `Language not found: ${t.language_code}`,
                            );
                        }

                        return {
                            language_id: language.id,
                            name: t.name,
                            slug: t.slug,
                        };
                    });

                    // 3️⃣ Xoá translations cũ
                    await tx.media_category_translations.deleteMany({
                        where: { category_id: id },
                    });
                }

                // 4️⃣ Update category
                const category = await tx.media_categories.update({
                    where: { id },
                    data: {
                        status: data.status,
                        translations: translationData
                            ? {
                                  create: translationData,
                              }
                            : undefined,
                    },
                    include: this.buildInclude(),
                });

                return this.transform(category);
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
    },
    async findBySlug(slug: string, lang?: string) {
        const category = await prisma.media_categories.findFirst({
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
            include: this.buildInclude(lang),
        });

        if (!category) return null;

        return this.transform(category, lang);
    },
    /* =========================
       DELETE
    ========================= */

    async delete(id: string) {
        try {
            return await prisma.media_categories.delete({
                where: { id },
            });
        } catch (error: any) {
            console.log(error);

            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003"
            ) {
                throw new AppError(
                    "Không thể xóa danh mục vì đang có media thuộc danh mục này.",
                    409,
                );
            }

            throw error;
        }
    },

    async bulkDelete(ids: string[]) {
        if (!ids?.length) {
            throw new AppError("Danh sách ID không hợp lệ.", 400);
        }

        try {
            const result = await prisma.media_categories.deleteMany({
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
                    "Một hoặc nhiều danh mục đang được sử dụng nên không thể xóa.",
                    409,
                );
            }

            throw error;
        }
    },
};
