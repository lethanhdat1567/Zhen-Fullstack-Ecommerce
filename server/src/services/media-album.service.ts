import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { checkSlugConflict } from "@/services/slug.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

/* ================= DTO ================= */

export interface MediaAlbumTranslationInput {
    language_code: string;
    title: string;
    slug: string;
    description?: string;
    thumbnail?: string;
}

export interface GalleryInput {
    type: string;
    file_url: string;
    sort_order?: number;
}

export interface CreateMediaAlbumDTO {
    category_id: string;
    status?: "active";
    thumbnail?: string;
    galleries?: GalleryInput[];
    translations: MediaAlbumTranslationInput[];
}

export interface UpdateMediaAlbumDTO {
    category_id?: string;
    status?: "active";
    thumbnail?: string;
    galleries?: GalleryInput[];
    translations?: MediaAlbumTranslationInput[];
}

/* ================= SERVICE ================= */

export const mediaAlbumService = {
    /* ================= INCLUDE ================= */

    buildInclude(lang?: string): Prisma.media_albumsInclude {
        return {
            translations: {
                ...(lang && { where: { language: { code: lang } } }),
                include: {
                    language: {
                        select: { code: true },
                    },
                },
            },
            category: {
                include: {
                    translations: lang
                        ? { where: { language: { code: lang } } }
                        : true,
                },
            },
            items: {
                orderBy: { sort_order: "asc" },
            },
        };
    },
    /* ================= TRANSFORM ================= */

    transform(album: any, lang?: string) {
        const categoryTranslation = album.category?.translations?.[0] ?? null;

        // ===== Nếu có lang → trả 1 translation flatten =====
        if (lang) {
            const translation = album.translations?.[0] ?? null;

            return {
                id: album.id,
                status: album.status,
                created_at: album.created_at,
                updated_at: album.updated_at,

                category: album.category
                    ? {
                          id: album.category.id,
                          name: categoryTranslation?.name ?? null,
                      }
                    : null,

                title: translation?.title ?? null,
                slug: translation?.slug ?? null,
                description: translation?.description ?? null,
                thumbnail: album.thumbnail ?? null,

                galleries:
                    album.items?.map((item: any) => ({
                        id: item.id,
                        type: item.type,
                        file_url: item.file_url,
                        sort_order: item.sort_order,
                    })) ?? [],
            };
        }

        // ===== Không có lang → trả full translations =====
        return {
            id: album.id,
            status: album.status,
            thumbnail: album.thumbnail,
            created_at: album.created_at,
            updated_at: album.updated_at,

            category: album.category
                ? {
                      id: album.category.id,
                      translations:
                          album.category.translations?.map((t: any) => ({
                              language_id: t.language_id,
                              name: t.name,
                          })) ?? [],
                  }
                : null,

            translations:
                album.translations?.map((t: any) => ({
                    language_id: t.language_id,
                    language: {
                        code: t.language?.code,
                    },
                    title: t.title,
                    slug: t.slug,
                    description: t.description,
                })) ?? [],

            galleries:
                album.items?.map((item: any) => ({
                    id: item.id,
                    type: item.type,
                    file_url: item.file_url,
                    sort_order: item.sort_order,
                })) ?? [],
        };
    },
    /* ================= CREATE ================= */

    async create(data: CreateMediaAlbumDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                // 1️⃣ Check slug conflict (DÙNG HÀM CÓ SẴN)
                await checkSlugConflict({
                    tx,
                    model: "media_album_translations",
                    slugs: data.translations.map((t) => t.slug),
                });

                // 1️⃣ Lấy languages theo code
                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in: data.translations.map((t) => t.language_code),
                        },
                    },
                });

                // validate nhẹ nhàng vừa đủ
                if (languages.length !== data.translations.length) {
                    throw new Error("Invalid language_code");
                }

                // 2️⃣ Map translation → language_id
                const translationData = data.translations.map((t) => {
                    const language = languages.find(
                        (l) => l.code === t.language_code,
                    )!;

                    return {
                        language_id: language.id,
                        title: t.title,
                        slug: t.slug,
                        description: t.description ?? null,
                    };
                });

                // 3️⃣ Create album
                const album = await tx.media_albums.create({
                    data: {
                        category_id: data.category_id,
                        status: data.status ?? "active",
                        thumbnail: data.thumbnail ?? null,

                        translations: {
                            create: translationData,
                        },

                        items: {
                            create:
                                data.galleries?.map((g) => ({
                                    type: g.type,
                                    file_url: g.file_url,
                                    sort_order: g.sort_order ?? 0,
                                })) ?? [],
                        },
                    },
                    include: this.buildInclude(),
                });

                return this.transform(album);
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
    /* ================= FIND ALL ================= */

    async findAll(params?: {
        lang?: string;
        search?: string;
        categorySlug?: string;
        isActive?: boolean;
        page?: string;
        limit?: string;
    }) {
        const { lang, search, categorySlug, isActive } = params || {};

        const where: Prisma.media_albumsWhereInput = {
            ...(isActive && { status: "active" }),

            ...(categorySlug && {
                category: {
                    translations: {
                        some: {
                            slug: categorySlug,
                            ...(lang && {
                                language: { code: lang },
                            }),
                        },
                    },
                },
            }),

            translations: {
                some: {
                    ...(lang && { language: { code: lang } }),
                    ...(search && {
                        title: {
                            contains: search,
                        },
                    }),
                },
            },
        };

        const result = await paginate(prisma.media_albums, params ?? {}, {
            where,
            include: this.buildInclude(lang),
            orderBy: { created_at: "desc" },
        });

        return {
            ...result,
            items: result.items.map((album: any) =>
                this.transform(album, lang),
            ),
        };
    },

    /* ================= FIND BY ID ================= */

    async findById(id: string, lang?: string) {
        const album = await prisma.media_albums.findUnique({
            where: { id },
            include: this.buildInclude(lang),
        });

        if (!album) return null;

        return this.transform(album, lang);
    },

    async findBySlug(params: { slug: string; lang?: string }) {
        const { slug, lang } = params;

        const album = await prisma.media_albums.findFirst({
            where: {
                status: "active",
                translations: {
                    some: {
                        slug,
                        ...(lang && {
                            language: { code: lang },
                        }),
                    },
                },
            },
            include: this.buildInclude(lang),
        });

        if (!album) {
            throw new Error("Media album not found");
        }

        return this.transform(album, lang);
    },

    async toggleStatus(id: string) {
        const album = await prisma.media_albums.findUnique({
            where: { id },
        });

        if (!album) {
            throw new Error("Album not found");
        }

        const updated = await prisma.media_albums.update({
            where: { id },
            data: {
                status: album.status === "active" ? "inactive" : "active",
            },
        });

        return updated;
    },
    /* ================= UPDATE ================= */

    async update(id: string, data: CreateMediaAlbumDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                await checkSlugConflict({
                    tx,
                    model: "media_album_translations",
                    slugs: data.translations.map((t) => t.slug),
                    excludeId: id,
                });

                // 1️⃣ Lấy languages theo code
                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in: data.translations.map((t) => t.language_code),
                        },
                    },
                });

                if (languages.length !== data.translations.length) {
                    throw new AppError("Invalid language_code", 400);
                }

                // 2️⃣ Map translations
                const translationData = data.translations.map((t) => {
                    const language = languages.find(
                        (l) => l.code === t.language_code,
                    )!;

                    return {
                        language_id: language.id,
                        title: t.title,
                        slug: t.slug,
                        description: t.description ?? null,
                    };
                });

                // 3️⃣ Xoá toàn bộ translations & items cũ
                await tx.media_album_translations.deleteMany({
                    where: { album_id: id },
                });

                await tx.media_items.deleteMany({
                    where: { album_id: id },
                });

                // 4️⃣ Update + create lại toàn bộ
                const album = await tx.media_albums.update({
                    where: { id },
                    data: {
                        category_id: data.category_id,
                        status: data.status ?? "active",
                        thumbnail: data.thumbnail ?? null,

                        translations: {
                            create: translationData,
                        },

                        items: {
                            create:
                                data.galleries?.map((g) => ({
                                    type: g.type,
                                    file_url: g.file_url,
                                    sort_order: g.sort_order ?? 0,
                                })) ?? [],
                        },
                    },
                    include: this.buildInclude(),
                });

                return this.transform(album);
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
    /* ================= DELETE ================= */

    async delete(id: string) {
        try {
            await prisma.media_albums.delete({
                where: { id },
            });

            return { id };
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003"
            ) {
                throw new AppError(
                    "Không thể xoá album vì đang được liên kết với dữ liệu khác.",
                    400,
                );
            }

            throw error;
        }
    },

    async bulkDelete(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new AppError("Danh sách ID không hợp lệ.", 409);
        }

        try {
            const result = await prisma.media_albums.deleteMany({
                where: {
                    id: { in: ids },
                },
            });

            return {
                deletedCount: result.count,
            };
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003"
            ) {
                throw new AppError(
                    "Một hoặc nhiều album không thể xoá vì đang được sử dụng.",
                    409,
                );
            }

            throw error;
        }
    },
};
