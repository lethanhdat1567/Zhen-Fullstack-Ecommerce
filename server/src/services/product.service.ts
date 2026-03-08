import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { ListQuery, QueryBuilder } from "@/services/queryBuilder.service";
import { checkSlugConflict } from "@/services/slug.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

export interface ProductTranslationInput {
    language_code: string;
    title: string;
    slug: string;
    description?: string;
    content?: string;
}

interface BaseProductDTO {
    category_id?: string;
    price?: number;
    sale_price?: number;
    stock?: number;
    thumbnail?: string;
    status?: string;
}

export interface CreateProductDTO extends BaseProductDTO {
    category_id: string;
    price: number;

    translations: ProductTranslationInput[];

    galleries?: {
        file_url: string;
        sort_order: number;
    }[];
}

export interface UpdateProductDTO extends BaseProductDTO {
    translations?: ProductTranslationInput[];

    galleries?: {
        id?: string;
        file_url: string;
        sort_order: number;
    }[];
}

export interface RelatedProductQuery {
    lang?: string;
    productId?: string;
    categorySlug?: string;
    isActive?: boolean;
    limit?: string;
    excludeIds?: string[];
    random?: boolean;
    samePriceRange?: boolean;
}

export type ProductWithRelations = Prisma.productsGetPayload<{
    include: {
        translations: true;
        galleries: true;
        category: {
            include: {
                translations: true;
            };
        };
    };
}>;

class ProductService {
    private transformWithLang(product: any) {
        const { translations, category, ...rest } = product;

        const t = translations?.[0];
        const ct = category.translations?.[0];

        return {
            ...rest,
            ...t,
            category: {
                id: category.id,
                name: ct?.name ?? null,
                slug: ct?.slug ?? null,
            },
        };
    }

    private buildTranslationInclude(lang?: string) {
        const include: Prisma.productsInclude = {
            translations: lang
                ? {
                      where: {
                          language: { code: lang },
                      },
                  }
                : {
                      include: {
                          language: {
                              select: { code: true },
                          },
                      },
                  },
            // galleries: true,

            category: {
                include: {
                    translations: lang
                        ? {
                              where: {
                                  language: { code: lang },
                              },
                          }
                        : true,
                },
            },
        };

        return include;
    }

    async createProduct(data: CreateProductDTO) {
        const {
            category_id,
            price,
            sale_price,
            stock,
            thumbnail,
            status,
            translations,
            galleries,
        } = data;

        try {
            return await prisma.$transaction(async (tx) => {
                // 1️⃣ Check slug conflict
                if (translations?.length) {
                    await checkSlugConflict({
                        tx,
                        model: "product_translations",
                        slugs: translations.map((t) => t.slug),
                    });
                }

                // 2️⃣ Load languages theo code
                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in: translations.map((t) => t.language_code),
                        },
                    },
                });

                if (languages.length !== translations.length) {
                    throw new AppError("Invalid language_code", 400);
                }

                // 3️⃣ Tạo map lookup O(1)
                const languageMap = new Map(
                    languages.map((l) => [l.code, l.id]),
                );

                // 4️⃣ Create product
                const product = await tx.products.create({
                    data: {
                        category_id,
                        price,
                        sale_price,
                        stock,
                        thumbnail,
                        status,
                    },
                });

                // 5️⃣ Create translations (convert code → id)
                if (translations?.length) {
                    await tx.product_translations.createMany({
                        data: translations.map((t) => ({
                            product_id: product.id,
                            language_id: languageMap.get(t.language_code)!,
                            title: t.title,
                            slug: t.slug,
                            description: t.description ?? null,
                            content: t.content ?? null,
                        })),
                    });
                }

                // 6️⃣ Create galleries
                if (galleries?.length) {
                    await tx.product_galleries.createMany({
                        data: galleries.map((img) => ({
                            product_id: product.id,
                            image: img.file_url,
                            sort_order: img.sort_order,
                        })),
                    });
                }

                return product;
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

    async listProducts(query: ListQuery) {
        const { lang } = query;

        const qb = new QueryBuilder(query)
            .status()
            .category()
            .search()
            .price()
            .sort()
            .build();

        const include = this.buildTranslationInclude(lang);

        const result = await paginate(prisma.products, query as any, {
            where: qb.where,
            orderBy: qb.orderBy,
            include,
        });

        if (lang) {
            result.items = result.items.map((p: ProductWithRelations) =>
                this.transformWithLang(p),
            );
        }

        return result;
    }

    async getDetailBySlug(slug: string, lang?: string) {
        const include = this.buildTranslationInclude(lang);

        const product = await prisma.products.findFirst({
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
            include,
        });

        if (!product) return null;

        if (lang) {
            return this.transformWithLang(product);
        }

        return product;
    }

    async getById(id: string, lang?: string) {
        const product = await prisma.products.findUnique({
            where: { id },
            include: this.buildTranslationInclude(lang),
        });

        if (!product) return null;

        if (lang) {
            return this.transformWithLang(product);
        }

        return product;
    }

    async updateProduct(id: string, data: UpdateProductDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                // 1️⃣ Check product tồn tại
                const existing = await tx.products.findUnique({
                    where: { id },
                });

                if (!existing) {
                    throw new AppError("Product not found", 404);
                }

                // 2️⃣ Check slug conflict (exclude current product)
                if (data.translations?.length) {
                    await checkSlugConflict({
                        tx,
                        model: "product_translations",
                        slugs: data.translations.map((t) => t.slug),
                        excludeId: id,
                    });
                }

                // 3️⃣ Load languages theo code
                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in:
                                data.translations?.map(
                                    (t) => t.language_code,
                                ) || [],
                        },
                    },
                });

                const languageMap = new Map(
                    languages.map((l) => [l.code, l.id]),
                );

                // 4️⃣ Update product info
                const product = await tx.products.update({
                    where: { id },
                    data: {
                        category_id: data.category_id,
                        price: data.price,
                        sale_price: data.sale_price,
                        stock: data.stock,
                        thumbnail: data.thumbnail,
                        status: data.status,
                    },
                });

                // 5️⃣ Upsert translations (code → id)
                if (data.translations?.length) {
                    for (const t of data.translations) {
                        const languageId = languageMap.get(t.language_code);

                        if (!languageId) {
                            throw new AppError(
                                `Invalid language_code: ${t.language_code}`,
                                400,
                            );
                        }

                        await tx.product_translations.upsert({
                            where: {
                                product_id_language_id: {
                                    product_id: id,
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
                                product_id: id,
                                language_id: languageId,
                                title: t.title,
                                slug: t.slug,
                                description: t.description ?? null,
                                content: t.content ?? null,
                            },
                        });
                    }
                }

                // 6️⃣ Sync galleries (object version)
                if (data.galleries) {
                    const oldGalleries = await tx.product_galleries.findMany({
                        where: { product_id: id },
                    });

                    const oldMap = new Map(oldGalleries.map((g) => [g.id, g]));

                    const incomingIds = data.galleries
                        .filter((g) => g.id)
                        .map((g) => g.id as string);

                    // 🔴 1. Delete galleries bị remove
                    const galleriesToDelete = oldGalleries.filter(
                        (g) => !incomingIds.includes(g.id),
                    );

                    if (galleriesToDelete.length) {
                        await tx.product_galleries.deleteMany({
                            where: {
                                id: { in: galleriesToDelete.map((g) => g.id) },
                            },
                        });
                    }

                    // 🟢 2. Update + Create
                    for (const g of data.galleries) {
                        if (g.id && oldMap.has(g.id)) {
                            // Update sort_order nếu đã tồn tại
                            await tx.product_galleries.update({
                                where: { id: g.id },
                                data: {
                                    sort_order: g.sort_order,
                                    image: g.file_url,
                                },
                            });
                        } else {
                            // Create mới
                            await tx.product_galleries.create({
                                data: {
                                    product_id: id,
                                    image: g.file_url,
                                    sort_order: g.sort_order,
                                },
                            });
                        }
                    }
                }

                return product;
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

    async getRelatedProducts(query: RelatedProductQuery) {
        const {
            lang,
            productId,
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

        const where: Prisma.productsWhereInput = {
            ...(isActive && { status: "active" }),

            translations: {
                some: {
                    language: { code: lang },
                },
            },

            ...(productId && {
                id: { not: productId },
            }),

            ...(excludeIds?.length && {
                id: { notIn: excludeIds },
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

        const products = await prisma.products.findMany({
            where,
            take,
            include: {
                translations: {
                    where: { language: { code: lang } },
                },
                category: {
                    include: {
                        translations: {
                            where: { language: { code: lang } },
                        },
                    },
                },
            },
            orderBy: random ? undefined : { created_at: "desc" },
        });

        // Nếu random true -> shuffle ở JS
        let result = products;

        if (random) {
            result = products.sort(() => 0.5 - Math.random());
        }

        return result.map((p) => this.transformWithLang(p));
    }

    async toggleStatus(id: string) {
        const product = await prisma.products.findUnique({
            where: { id },
        });

        if (!product) throw new Error("Product not found");

        const newStatus = product.status === "active" ? "inactive" : "active";

        return prisma.products.update({
            where: { id },
            data: { status: newStatus },
        });
    }

    async deleteProduct(id: string) {
        return prisma.products.delete({
            where: { id },
        });
    }

    async bulkDelete(ids: string[]) {
        if (!ids?.length) {
            throw new AppError("No IDs provided", 400);
        }

        return await prisma.$transaction(async (tx) => {
            // Xoá galleries trước (FK)
            await tx.product_galleries.deleteMany({
                where: { product_id: { in: ids } },
            });

            // Xoá translations
            await tx.product_translations.deleteMany({
                where: { product_id: { in: ids } },
            });

            // Xoá products
            const deleted = await tx.products.deleteMany({
                where: { id: { in: ids } },
            });

            return {
                deletedCount: deleted.count,
            };
        });
    }
}

export default new ProductService();
