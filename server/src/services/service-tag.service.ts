import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

export interface ServiceTagPayload {
    translations: {
        language_code: string;
        name: string;
        slug: string;
    }[];
}

class ServiceTagService {
    async create(payload: ServiceTagPayload) {
        try {
            return await prisma.$transaction(async (tx) => {
                const tag = await tx.service_tags.create({
                    data: {},
                });

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

                    await tx.service_tag_translations.create({
                        data: {
                            tag_id: tag.id,
                            language_id: language.id,
                            name: t.name,
                            slug: t.slug,
                        },
                    });
                }

                return tag;
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new AppError(`Slug already exists`, 409);
            }

            throw error;
        }
    }

    async update(id: string, payload: ServiceTagPayload) {
        try {
            return await prisma.$transaction(async (tx) => {
                // Optional: check tag tồn tại
                const existingTag = await tx.service_tags.findUnique({
                    where: { id },
                });

                if (!existingTag) {
                    throw new AppError("Tag not found", 404);
                }

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

                    await tx.service_tag_translations.upsert({
                        where: {
                            tag_id_language_id: {
                                tag_id: id,
                                language_id: language.id,
                            },
                        },
                        update: {
                            name: t.name,
                            slug: t.slug,
                        },
                        create: {
                            tag_id: id,
                            language_id: language.id,
                            name: t.name,
                            slug: t.slug,
                        },
                    });
                }

                return { message: "Tag updated successfully" };
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new AppError(`Slug already exists`, 409);
            }

            throw error;
        }
    }

    async list(params: { lang?: string; search?: string }) {
        const { lang, search } = params;

        const tags = await prisma.service_tags.findMany({
            where: search
                ? {
                      translations: {
                          some: {
                              name: { contains: search },
                              language: lang ? { code: lang } : undefined,
                          },
                      },
                  }
                : undefined,
            include: {
                translations: {
                    where: {
                        language: lang ? { code: lang } : undefined,
                        name: search ? { contains: search } : undefined,
                    },
                    select: {
                        name: true,
                        slug: true,
                        language: {
                            select: { code: true },
                        },
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });

        // 🎯 Nếu có lang → flatten
        if (lang) {
            return tags.map((tag) => {
                const t = tag.translations[0];

                return {
                    id: tag.id,
                    name: t?.name,
                    slug: t?.slug,
                    language_code: t?.language.code,
                    created_at: tag.created_at,
                };
            });
        }

        return tags;
    }

    async detail(id: string) {
        return await prisma.service_tags.findUnique({
            where: { id },
            include: {
                translations: {
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
    }

    async delete(id: string) {
        await prisma.service_tag_pivot.deleteMany({
            where: { tag_id: id },
        });

        await prisma.service_tag_translations.deleteMany({
            where: { tag_id: id },
        });

        await prisma.service_tags.delete({
            where: { id },
        });

        return true;
    }
}

export const serviceTagService = new ServiceTagService();
