import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

interface CheckSlugOptions {
    tx: Prisma.TransactionClient;
    model:
        | "post_category_translations"
        | "service_translations"
        | "service_category_translations"
        | "post_translations"
        | "product_category_translations"
        | "product_translations"
        | "media_category_translations"
        | "media_album_translations";
    slugs: string[];
    excludeId?: string;
}

export async function checkSlugConflict({
    tx,
    model,
    slugs,
    excludeId,
}: CheckSlugOptions) {
    let existing;

    if (model === "post_translations") {
        existing = await tx.post_translations.findFirst({
            where: {
                slug: { in: slugs },
                ...(excludeId && {
                    post: {
                        id: {
                            not: excludeId,
                        },
                    },
                }),
            },
            select: { slug: true },
        });
    }

    if (model === "product_category_translations") {
        console.log(excludeId);

        existing = await tx.product_category_translations.findFirst({
            where: {
                slug: { in: slugs },
                ...(excludeId && {
                    category: {
                        id: {
                            not: excludeId,
                        },
                    },
                }),
            },
            select: { slug: true },
        });
    }

    if (model === "product_translations") {
        existing = await tx.product_translations.findFirst({
            where: {
                slug: { in: slugs },
                ...(excludeId && {
                    product: {
                        id: {
                            not: excludeId,
                        },
                    },
                }),
            },
            select: { slug: true },
        });
    }

    if (model === "service_translations") {
        existing = await tx.service_translations.findFirst({
            where: {
                slug: { in: slugs },
                ...(excludeId && {
                    service: {
                        id: {
                            not: excludeId,
                        },
                    },
                }),
            },
            select: { slug: true },
        });
    }

    if (model === "service_category_translations") {
        existing = await tx.service_category_translations.findFirst({
            where: {
                slug: { in: slugs },
                ...(excludeId && {
                    category: {
                        id: {
                            not: excludeId,
                        },
                    },
                }),
            },
            select: { slug: true },
        });
    }

    if (model === "post_category_translations") {
        existing = await tx.post_category_translations.findFirst({
            where: {
                slug: { in: slugs },
                ...(excludeId && {
                    category_id: { not: excludeId },
                }),
            },
            select: { slug: true },
        });
    }

    if (model === "media_category_translations") {
        existing = await tx.media_category_translations.findFirst({
            where: {
                slug: { in: slugs },
                ...(excludeId && {
                    category: {
                        id: {
                            not: excludeId,
                        },
                    },
                }),
            },
            select: { slug: true },
        });
    }

    if (model === "media_album_translations") {
        existing = await tx.media_album_translations.findFirst({
            where: {
                slug: { in: slugs },
                ...(excludeId && {
                    album: {
                        id: {
                            not: excludeId,
                        },
                    },
                }),
            },
            select: { slug: true },
        });
    }

    if (existing) {
        throw new AppError(
            `Slug '${existing.slug}' đã tồn tại. Vui lòng chọn slug khác.`,
            409,
        );
    }
}
