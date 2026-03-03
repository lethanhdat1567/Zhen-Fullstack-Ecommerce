/* eslint-disable @typescript-eslint/no-empty-object-type */
import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { checkSlugConflict } from "@/services/slug.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

/* =========================
   TYPES
========================= */

export interface PostTranslationDTO {
    language_code: string;
    title: string;
    slug: string;
    description?: string;
    content?: string;
    thumbnail?: string;
}

export interface CreatePostDTO {
    category_id: string;
    status?: string;
    thumbnail?: string;
    translations: PostTranslationDTO[];
}

export interface UpdatePostDTO extends CreatePostDTO {}

export interface ListPostQuery {
    lang?: string;
    search?: string;
    isActive?: boolean;
    categorySlug?: string;
    page?: string;
    limit?: string;
}

export interface RelatedPostQuery {
    lang?: string;
    postId?: string;
    categorySlug?: string;
    isActive?: boolean;
    limit?: string;
    excludeIds?: string[];
    random?: boolean;
}

/* =========================
   SERVICE
========================= */

class PostService {
    /* =========================
       HELPERS
    ========================= */

    private transformPost(post: any, lang?: string) {
        const isSingleLang = !!lang;

        const translation = isSingleLang ? post.translations?.[0] : null;

        const categoryTranslation = lang
            ? post.category?.translations?.[0]
            : null;

        return {
            id: post.id,
            status: post.status,
            thumbnail: post.thumbnail,
            created_at: post.created_at,
            updated_at: post.updated_at,

            category: {
                id: post.category?.id,
                name: categoryTranslation?.name ?? null,
                slug: categoryTranslation?.slug ?? null,
            },
            ...(isSingleLang
                ? {
                      name: categoryTranslation?.name,
                      slug: categoryTranslation?.slug,
                  }
                : {
                      translations: post.category?.translations ?? [],
                  }),

            ...(isSingleLang
                ? {
                      title: translation?.title,
                      slug: translation?.slug,
                      description: translation?.description,
                      content: translation?.content,
                  }
                : {
                      translations: post.translations ?? [],
                  }),
        };
    }

    private buildInclude(lang?: string) {
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
            category: {
                include: {
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
                },
            },
        };
    }

    private buildWhere(query: ListPostQuery) {
        const { lang, search, categorySlug, isActive } = query;

        return {
            ...(isActive && { status: "active" }),

            ...(categorySlug && {
                category: {
                    translations: {
                        some: {
                            slug: categorySlug,
                            ...(lang && {
                                language: {
                                    code: lang,
                                },
                            }),
                        },
                    },
                },
            }),

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
                                  OR: [
                                      { title: { contains: search } },
                                      { slug: { contains: search } },
                                  ],
                              }),
                          },
                      },
                  }
                : {}),
        };
    }

    /* =========================
       CREATE
    ========================= */

    async createPost(data: CreatePostDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                await checkSlugConflict({
                    tx,
                    model: "post_translations",
                    slugs: data.translations.map((t) => t.slug),
                });
                // 1️⃣ Load languages theo code
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

                // 2️⃣ Tạo map để lookup O(1) (không dùng find mỗi lần)
                const languageMap = new Map(
                    languages.map((l) => [l.code, l.id]),
                );

                // 3️⃣ Tạo post
                const post = await tx.posts.create({
                    data: {
                        category_id: data.category_id,
                        status: data.status ?? "active",
                        thumbnail: data.thumbnail ?? null,

                        translations: {
                            create: data.translations.map((t) => ({
                                language_id: languageMap.get(t.language_code)!,
                                title: t.title,
                                slug: t.slug,
                                description: t.description ?? null,
                                content: t.content ?? null,
                            })),
                        },
                    },
                    include: this.buildInclude(),
                });

                return post;
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

    async updatePost(id: string, data: UpdatePostDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                await checkSlugConflict({
                    tx,
                    model: "post_translations",
                    slugs: data.translations.map((t) => t.slug),
                    excludeId: id,
                });

                // 1️⃣ Load languages theo code
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

                // 2️⃣ Tạo map lookup nhanh
                const languageMap = new Map(
                    languages.map((l) => [l.code, l.id]),
                );

                // 3️⃣ Update post chính
                await tx.posts.update({
                    where: { id },
                    data: {
                        category_id: data.category_id,
                        status: data.status,
                        thumbnail: data.thumbnail,
                    },
                });

                // 4️⃣ Upsert translations
                for (const t of data.translations) {
                    const languageId = languageMap.get(t.language_code)!;

                    await tx.post_translations.upsert({
                        where: {
                            post_id_language_id: {
                                post_id: id,
                                language_id: languageId,
                            },
                        },
                        update: {
                            title: t.title,
                            slug: t.slug,
                            description: t.description ?? null,
                            content: t.content ?? null,
                        },
                        create: {
                            post_id: id,
                            language_id: languageId,
                            title: t.title,
                            slug: t.slug,
                            description: t.description ?? null,
                            content: t.content ?? null,
                        },
                    });
                }

                // 5️⃣ Return full data
                return tx.posts.findUnique({
                    where: { id },
                    include: this.buildInclude(),
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

    async listPosts(query: ListPostQuery) {
        const where = this.buildWhere(query);
        const include = this.buildInclude(query.lang);

        const result = await paginate(prisma.posts, query as any, {
            where,
            include,
            orderBy: [{ created_at: "desc" }],
        });

        result.items = result.items.map((post: any) =>
            this.transformPost(post, query.lang),
        );

        return result;
    }

    /* =========================
       DETAIL
    ========================= */

    async getDetail(slug: string, lang?: string) {
        const translation = await prisma.post_translations.findFirst({
            where: {
                slug,
                ...(lang && {
                    language: {
                        code: lang,
                    },
                }),
            },
            select: { post_id: true },
        });

        if (!translation) return null;

        const post = await prisma.posts.findUnique({
            where: { id: translation.post_id },
            include: this.buildInclude(lang),
        });

        if (!post) return null;

        return this.transformPost(post, lang);
    }

    async getById(id: string, lang?: string) {
        const post = await prisma.posts.findUnique({
            where: { id },
            include: this.buildInclude(lang),
        });

        if (!post) return null;

        return this.transformPost(post, lang);
    }

    async getRelatedPosts(query: RelatedPostQuery) {
        const {
            lang,
            postId,
            categorySlug,
            isActive = true,
            limit = "4",
            excludeIds,
            random,
        } = query;

        if (!lang) {
            throw new AppError("lang is required", 400);
        }

        const take = parseInt(limit);

        // 🔥 Gộp id filter (tránh override)
        const idFilter: Prisma.StringFilter = {};

        if (postId) {
            idFilter.not = postId;
        }

        if (excludeIds?.length) {
            idFilter.notIn = excludeIds;
        }

        const where: Prisma.postsWhereInput = {
            ...(isActive && { status: "active" }),

            translations: {
                some: {
                    language: { code: lang },
                },
            },

            ...(Object.keys(idFilter).length && {
                id: idFilter,
            }),

            ...(categorySlug && {
                category: {
                    translations: {
                        some: {
                            slug: categorySlug,
                            language: { code: lang },
                        },
                    },
                },
            }),
        };

        const posts = await prisma.posts.findMany({
            where,
            take,
            include: this.buildInclude(lang),
            orderBy: random ? undefined : { created_at: "desc" },
        });

        let result = posts;

        if (random) {
            result = posts.sort(() => 0.5 - Math.random());
        }

        return result.map((post) => this.transformPost(post, lang));
    }

    /* =========================
       DELETE
    ========================= */

    async deletePost(id: string) {
        return prisma.posts.delete({
            where: { id },
        });
    }

    async bulkDelete(ids: string[]) {
        return prisma.posts.deleteMany({
            where: {
                id: { in: ids },
            },
        });
    }

    async toggleStatus(id: string) {
        return prisma.$transaction(async (tx) => {
            const post = await tx.posts.findUnique({
                where: { id },
                select: { id: true, status: true },
            });

            if (!post) {
                throw new AppError("Post not found", 404);
            }

            const newStatus = post.status === "active" ? "inactive" : "active";

            return tx.posts.update({
                where: { id },
                data: { status: newStatus },
                include: this.buildInclude(),
            });
        });
    }
}

export default new PostService();
