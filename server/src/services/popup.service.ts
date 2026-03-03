import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

export type PopupTranslationPayload = {
    title: string;
    content: string;
    language_code: string;
};

export type CreatePopupDTO = {
    thumbnail?: string;
    status?: string;
    sort_order?: number;
    translations: PopupTranslationPayload[];
};

export type UpdatePopupDTO = {
    thumbnail?: string;
    status?: string;
    sort_order?: number;
    translations?: PopupTranslationPayload[];
};

export interface ListPopupQuery {
    search?: string;
    status?: string;
    lang?: string;
    page?: string;
    limit?: string;
}

export const popupService = {
    /* =========================
       CREATE
    ========================= */
    async create(data: CreatePopupDTO) {
        const {
            thumbnail,
            status = "active",
            sort_order = 0,
            translations,
        } = data;

        if (!translations?.length) {
            throw new AppError("Translations are required", 400);
        }

        return prisma.$transaction(async (tx) => {
            const popup = await tx.popups.create({
                data: {
                    thumbnail,
                    status,
                    sort_order,
                },
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

                await tx.popup_translations.create({
                    data: {
                        popup_id: popup.id,
                        language_id: language.id,
                        title: t.title,
                        content: t.content,
                    },
                });
            }

            return popup;
        });
    },

    /* =========================
       LIST + SEARCH
    ========================= */
    async findAll(query: ListPopupQuery) {
        const { search, status, lang } = query;

        const where: Prisma.popupsWhereInput = {};

        if (status) {
            where.status = status;
        }

        if (search || lang) {
            where.translations = {
                some: {
                    ...(search && {
                        OR: [
                            { title: { contains: search } },
                            { content: { contains: search } },
                        ],
                    }),
                    ...(lang && {
                        language: { code: lang },
                    }),
                },
            };
        }

        const result = await paginate(prisma.popups, query, {
            where,
            include: {
                translations: {
                    include: {
                        language: {
                            select: { code: true },
                        },
                    },
                },
            },
            orderBy: [{ sort_order: "asc" }, { created_at: "desc" }],
        });

        /* =============================
       FLATTEN KHI CÓ LANG
    ============================== */
        if (lang) {
            result.items = result.items.map((popup: any) => {
                const translation = popup.translations.find(
                    (t: any) => t.language.code === lang,
                );

                if (!translation) {
                    return {
                        id: popup.id,
                        thumbnail: popup.thumbnail,
                        status: popup.status,
                        sort_order: popup.sort_order,
                        title: null,
                        content: null,
                        created_at: popup.created_at,
                        updated_at: popup.updated_at,
                    };
                }

                return {
                    id: popup.id,
                    thumbnail: popup.thumbnail,
                    status: popup.status,
                    sort_order: popup.sort_order,
                    title: translation.title,
                    content: translation.content,
                    created_at: popup.created_at,
                    updated_at: popup.updated_at,
                };
            });
        }

        return result;
    },

    /* =========================
       DETAIL
    ========================= */
    async findById(id: string, langCode?: string) {
        const popup = await prisma.popups.findUnique({
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

        if (!popup) {
            throw new AppError("Popup không tồn tại", 404);
        }

        /* =============================
       NẾU CÓ LANG → FLATTEN
    ============================== */
        if (langCode) {
            const translation = popup.translations.find(
                (t) => t.language.code === langCode,
            );

            return {
                id: popup.id,
                thumbnail: popup.thumbnail,
                status: popup.status,
                sort_order: popup.sort_order,
                title: translation?.title ?? null,
                content: translation?.content ?? null,
                created_at: popup.created_at,
                updated_at: popup.updated_at,
            };
        }

        return popup;
    },

    /* =========================
       UPDATE
    ========================= */
    async update(id: string, data: UpdatePopupDTO) {
        const popup = await prisma.popups.findUnique({
            where: { id },
        });

        if (!popup) {
            throw new AppError("Popup không tồn tại", 404);
        }

        return prisma.$transaction(async (tx) => {
            await tx.popups.update({
                where: { id },
                data: {
                    thumbnail: data.thumbnail ?? popup.thumbnail,
                    status: data.status ?? popup.status,
                    sort_order: data.sort_order ?? popup.sort_order,
                },
            });

            if (data.translations?.length) {
                for (const t of data.translations) {
                    const language = await tx.languages.findUnique({
                        where: { code: t.language_code },
                    });

                    if (!language) {
                        throw new AppError(
                            `Language ${t.language_code} not found`,
                            400,
                        );
                    }

                    await tx.popup_translations.upsert({
                        where: {
                            popup_id_language_id: {
                                popup_id: id,
                                language_id: language.id,
                            },
                        },
                        update: {
                            title: t.title,
                            content: t.content,
                        },
                        create: {
                            popup_id: id,
                            language_id: language.id,
                            title: t.title,
                            content: t.content,
                        },
                    });
                }
            }

            return { message: "Popup updated successfully" };
        });
    },

    /* =========================
       TOGGLE STATUS
    ========================= */
    async toggleStatus(id: string) {
        const popup = await prisma.popups.findUnique({
            where: { id },
        });

        if (!popup) {
            throw new AppError("Popup không tồn tại", 404);
        }

        const newStatus = popup.status === "active" ? "inactive" : "active";

        return prisma.popups.update({
            where: { id },
            data: { status: newStatus },
        });
    },

    async reorder(items: { id: string; sort_order: number }[]) {
        if (!items?.length) {
            throw new AppError("Danh sách sắp xếp không hợp lệ.", 400);
        }

        await prisma.$transaction(
            items.map((item) =>
                prisma.popups.update({
                    where: { id: item.id },
                    data: { sort_order: item.sort_order },
                }),
            ),
        );

        return { message: "Cập nhật thứ tự thành công" };
    },

    /* =========================
       DELETE
    ========================= */
    async delete(id: string) {
        return prisma.popups.delete({
            where: { id },
        });
    },

    async bulkDelete(ids: string[]) {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new AppError("Danh sách ID không hợp lệ.", 400);
        }

        const result = await prisma.popups.deleteMany({
            where: { id: { in: ids } },
        });

        return {
            deletedCount: result.count,
        };
    },
};
