import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { checkSlugConflict } from "@/services/slug.service";
import { AppError } from "@/utils/appError";
import { Prisma, ServiceStatus } from "@prisma/client";

/* =========================
   DTOs
========================= */

export interface ServiceTranslationInput {
    language_code: string;
    title: string;
    slug: string;
    description?: string;
    content?: string;
}

export interface CreateServiceDTO {
    capacity?: number;
    price?: number;
    thumbnail?: string;
    status?: ServiceStatus;
    category_id: string;
    translations: ServiceTranslationInput[];
    galleries?: {
        file_url: string;
        sort_order: number;
    }[];
}

export interface UpdateServiceDTO {
    capacity?: number;
    price?: number;
    thumbnail?: string;
    status?: ServiceStatus;
    category_id?: string;
    translations?: ServiceTranslationInput[];
    galleries?: {
        file_url: string;
        sort_order: number;
    }[];
}

export interface ListServiceQuery {
    search?: string;
    lang?: string;
    page?: string;
    limit?: string;
    categorySlug?: string;
    isActive?: boolean;
}

export interface RelatedServiceQuery {
    lang?: string;
    serviceId?: string;
    categorySlug?: string;
    isActive?: boolean;
    limit?: string;
    excludeIds?: string[];
    random?: boolean;
}

/* =========================
   SERVICE CLASS
========================= */

class ServiceService {
    /* =========================
       PRIVATE HELPERS
    ========================= */

    private async mapLanguages(
        tx: Prisma.TransactionClient,
        translations: ServiceTranslationInput[],
    ): Promise<Map<string, string>> {
        const languages = await tx.languages.findMany({
            where: {
                code: {
                    in: translations.map((t) => t.language_code),
                },
            },
            select: {
                id: true,
                code: true,
            },
        });

        if (languages.length !== translations.length) {
            throw new AppError("Invalid language_code", 400);
        }

        return new Map<string, string>(languages.map((l) => [l.code, l.id]));
    }

    private transformWithLang(service: any) {
        const { translations, category, ...rest } = service;
        const t = translations?.[0];
        const ct = category?.translations?.[0];

        return {
            ...rest,
            lang: t?.language?.code ?? null,
            title: t?.title ?? null,
            slug: t?.slug ?? null,
            description: t?.description ?? null,
            content: t?.content ?? null,
            category: category
                ? {
                      id: category.id,
                      name: ct?.name ?? null,
                  }
                : null,
        };
    }

    /* =========================
       CREATE
    ========================= */

    async createService(data: CreateServiceDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                await checkSlugConflict({
                    tx,
                    model: "service_translations",
                    slugs: data.translations.map((t) => t.slug),
                });

                const languageMap = await this.mapLanguages(
                    tx,
                    data.translations,
                );

                const service = await tx.services.create({
                    data: {
                        capacity: data.capacity,
                        price: data.price,
                        thumbnail: data.thumbnail,
                        status: data.status ?? "active",
                        category_id: data.category_id,
                    },
                });

                await tx.service_translations.createMany({
                    data: data.translations.map((t) => ({
                        service_id: service.id,
                        language_id: languageMap.get(t.language_code)!,
                        title: t.title,
                        slug: t.slug,
                        description: t.description ?? null,
                        content: t.content ?? null,
                    })),
                });

                if (data.galleries?.length) {
                    await tx.service_galleries.createMany({
                        data: data.galleries.map((g) => ({
                            service_id: service.id,
                            image: g.file_url,
                            sort_order: g.sort_order,
                        })),
                    });
                }

                return service;
            });
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new AppError("DUP_SKU", 409);
            }
            throw error;
        }
    }

    /* =========================
       LIST
    ========================= */

    async listServices(query: ListServiceQuery) {
        const { search, lang, categorySlug, isActive } = query;

        const where: any = {
            deleted_at: null,
        };

        // ✅ filter active
        if (isActive) {
            where.status = "active";
        }

        // ✅ filter category slug
        if (categorySlug) {
            where.category = {
                translations: {
                    some: {
                        slug: categorySlug,
                        ...(lang && { language: { code: lang } }),
                    },
                },
            };
        }

        // ✅ filter search + lang
        if (search || lang) {
            where.translations = {
                some: {
                    ...(lang && { language: { code: lang } }),
                    ...(search && {
                        OR: [
                            { title: { contains: search } },
                            { slug: { contains: search } },
                        ],
                    }),
                },
            };
        }

        const result = await paginate(prisma.services, query, {
            where,
            include: {
                translations: lang
                    ? { where: { language: { code: lang } } }
                    : {
                          include: {
                              language: {
                                  select: { code: true },
                              },
                          },
                      },
                category: {
                    include: {
                        translations: lang
                            ? {
                                  where: { language: { code: lang } },
                                  include: {
                                      language: {
                                          select: { code: true },
                                      },
                                  },
                              }
                            : false,
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        if (lang) {
            result.items = result.items.map((s: any) =>
                this.transformWithLang(s),
            );
        }

        return result;
    }

    /* =========================
       DETAIL BY SLUG
    ========================= */

    async getDetail(slug: string, lang?: string) {
        const service = await prisma.services.findFirst({
            where: {
                deleted_at: null,
                translations: {
                    some: {
                        slug,
                        ...(lang && { language: { code: lang } }),
                    },
                },
            },
            include: {
                translations: lang
                    ? { where: { language: { code: lang } } }
                    : true,
                galleries: { orderBy: { sort_order: "asc" } },
                category: {
                    include: {
                        translations: lang
                            ? { where: { language: { code: lang } } }
                            : true,
                    },
                },
            },
        });

        if (!service) return null;

        return lang ? this.transformWithLang(service) : service;
    }

    /* =========================
       UPDATE
    ========================= */

    async updateService(id: string, data: UpdateServiceDTO) {
        try {
            return await prisma.$transaction(async (tx) => {
                const existed = await tx.services.findUnique({
                    where: { id },
                });

                if (!existed) {
                    throw new AppError("Service not found", 404);
                }

                if (data.translations?.length) {
                    await checkSlugConflict({
                        tx,
                        model: "service_translations",
                        slugs: data.translations.map((t) => t.slug),
                        excludeId: id,
                    });
                }

                const service = await tx.services.update({
                    where: { id },
                    data: {
                        ...(data.capacity !== undefined && {
                            capacity: data.capacity,
                        }),
                        ...(data.price !== undefined && { price: data.price }),
                        ...(data.thumbnail !== undefined && {
                            thumbnail: data.thumbnail,
                        }),
                        ...(data.status !== undefined && {
                            status: data.status,
                        }),
                        ...(data.category_id !== undefined && {
                            category_id: data.category_id,
                        }),
                    },
                });

                if (data.translations?.length) {
                    const languageMap = await this.mapLanguages(
                        tx,
                        data.translations,
                    );

                    for (const t of data.translations) {
                        await tx.service_translations.upsert({
                            where: {
                                service_id_language_id: {
                                    service_id: id,
                                    language_id: languageMap.get(
                                        t.language_code,
                                    )!,
                                },
                            },
                            update: {
                                title: t.title,
                                slug: t.slug,
                                description: t.description ?? null,
                                content: t.content ?? null,
                            },
                            create: {
                                service_id: id,
                                language_id: languageMap.get(t.language_code)!,
                                title: t.title,
                                slug: t.slug,
                                description: t.description ?? null,
                                content: t.content ?? null,
                            },
                        });
                    }
                }

                if (data.galleries) {
                    await tx.service_galleries.deleteMany({
                        where: { service_id: id },
                    });

                    if (data.galleries.length) {
                        await tx.service_galleries.createMany({
                            data: data.galleries.map((g) => ({
                                service_id: id,
                                image: g.file_url,
                                sort_order: g.sort_order,
                            })),
                        });
                    }
                }

                return service;
            });
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new AppError("Duplicate field detected", 400);
            }
            throw error;
        }
    }

    /* =========================
       TOGGLE STATUS
    ========================= */

    async toggleStatus(id: string) {
        const service = await prisma.services.findUnique({
            where: { id },
        });

        if (!service) {
            throw new AppError("Service not found", 404);
        }

        const newStatus: ServiceStatus =
            service.status === "active" ? "inactive" : "active";

        return prisma.services.update({
            where: { id },
            data: { status: newStatus },
        });
    }

    /* =========================
       SOFT DELETE
    ========================= */

    async deleteService(id: string) {
        return prisma.services.delete({
            where: { id },
        });
    }

    async getServiceById(id: string, lang?: string) {
        const service = await prisma.services.findFirst({
            where: { id, deleted_at: null },
            include: {
                translations: lang
                    ? { where: { language: { code: lang } } }
                    : true,
                galleries: { orderBy: { sort_order: "asc" } },
                category: {
                    include: {
                        translations: lang
                            ? { where: { language: { code: lang } } }
                            : true,
                    },
                },
            },
        });

        if (!service) {
            throw new AppError("Service not found", 404);
        }

        return lang ? this.transformWithLang(service) : service;
    }
    async getRelatedServices(query: RelatedServiceQuery) {
        const {
            lang,
            serviceId,
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

        // 🔥 gộp id filter
        const idFilter: Prisma.StringFilter = {};

        if (serviceId) {
            idFilter.not = serviceId;
        }

        if (excludeIds?.length) {
            idFilter.notIn = excludeIds;
        }

        const where: Prisma.servicesWhereInput = {
            deleted_at: null,

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

        const services = await prisma.services.findMany({
            where,
            take,
            include: {
                translations: {
                    where: { language: { code: lang } },
                    include: {
                        language: { select: { code: true } },
                    },
                },
                category: {
                    include: {
                        translations: {
                            where: { language: { code: lang } },
                        },
                    },
                },
                galleries: {
                    orderBy: { sort_order: "asc" },
                },
            },
            orderBy: random ? undefined : { created_at: "desc" },
        });

        let result = services;

        if (random) {
            result = services.sort(() => 0.5 - Math.random());
        }

        return result.map((s) => this.transformWithLang(s));
    }

    async bulkDelete(ids: string[]) {
        return prisma.services.deleteMany({
            where: {
                id: { in: ids },
            },
        });
    }
}

export default new ServiceService();
