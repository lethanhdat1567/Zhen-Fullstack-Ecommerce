import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { AppError } from "@/utils/appError";
import { Prisma } from "@prisma/client";

export interface RecruitmentTranslationInput {
    language_code: string;
    title: string;
}

export interface CreateRecruitmentDTO {
    address?: string;
    quantity?: number;
    status?: "active" | "inactive";
    translations: RecruitmentTranslationInput[];
}

export interface UpdateRecruitmentDTO {
    address?: string;
    quantity?: number;
    status?: "active" | "inactive";
    translations?: RecruitmentTranslationInput[];
}

export interface ListRecruitmentQuery {
    lang?: string;
    page?: string;
    limit?: string;
    isActive?: boolean;
}

class RecruitmentService {
    private transformWithLang(item: any) {
        const { translations, ...rest } = item;
        const t = translations?.[0];

        return {
            ...rest,
            title: t?.title ?? null,
        };
    }

    /* =========================
       CREATE
    ========================= */

    async createRecruitment(data: CreateRecruitmentDTO) {
        const { address, quantity, status, translations } = data;

        return prisma.$transaction(async (tx) => {
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

            const languageMap = new Map(languages.map((l) => [l.code, l.id]));

            const recruitment = await tx.recruitments.create({
                data: {
                    address,
                    quantity,
                    status: status ?? "active",
                },
            });

            await tx.recruitment_translations.createMany({
                data: translations.map((t) => ({
                    recruitment_id: recruitment.id,
                    language_id: languageMap.get(t.language_code)!,
                    title: t.title,
                })),
            });

            return recruitment;
        });
    }

    /* =========================
       LIST
    ========================= */

    async listRecruitments(query: ListRecruitmentQuery) {
        const { lang, isActive } = query;

        const where: Prisma.recruitmentsWhereInput = {
            ...(isActive !== undefined && {
                status: isActive ? "active" : "inactive",
            }),
            ...(lang && {
                translations: {
                    some: {
                        language: { code: lang },
                    },
                },
            }),
        };

        const include: Prisma.recruitmentsInclude = {
            translations: lang
                ? {
                      where: {
                          language: { code: lang },
                      },
                  }
                : {
                      include: {
                          language: { select: { code: true } },
                      },
                  },
        };

        const result = await paginate(prisma.recruitments, query as any, {
            where,
            include,
            orderBy: { created_at: "desc" },
        });

        if (lang) {
            result.items = result.items.map((r: any) =>
                this.transformWithLang(r),
            );
        }

        return result;
    }

    /* =========================
       GET BY ID
    ========================= */

    async getById(id: string, lang?: string) {
        const recruitment = await prisma.recruitments.findUnique({
            where: { id },
            include: {
                translations: lang
                    ? {
                          where: { language: { code: lang } },
                      }
                    : {
                          include: {
                              language: { select: { code: true } },
                          },
                      },
            },
        });

        if (!recruitment) return null;

        if (lang) {
            return this.transformWithLang(recruitment);
        }

        return recruitment;
    }

    /* =========================
       UPDATE
    ========================= */

    async updateRecruitment(id: string, data: UpdateRecruitmentDTO) {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.recruitments.findUnique({
                where: { id },
            });

            if (!existing) {
                throw new AppError("Recruitment not found", 404);
            }

            const recruitment = await tx.recruitments.update({
                where: { id },
                data: {
                    address: data.address,
                    quantity: data.quantity,
                    status: data.status,
                },
            });

            if (data.translations?.length) {
                const languages = await tx.languages.findMany({
                    where: {
                        code: {
                            in: data.translations.map((t) => t.language_code),
                        },
                    },
                });

                const languageMap = new Map(
                    languages.map((l) => [l.code, l.id]),
                );

                for (const t of data.translations) {
                    const languageId = languageMap.get(t.language_code);

                    if (!languageId) {
                        throw new AppError(
                            `Invalid language_code: ${t.language_code}`,
                            400,
                        );
                    }

                    await tx.recruitment_translations.upsert({
                        where: {
                            recruitment_id_language_id: {
                                recruitment_id: id,
                                language_id: languageId,
                            },
                        },
                        update: {
                            title: t.title,
                        },
                        create: {
                            recruitment_id: id,
                            language_id: languageId,
                            title: t.title,
                        },
                    });
                }
            }

            return recruitment;
        });
    }

    /* =========================
       TOGGLE STATUS
    ========================= */

    async toggleStatus(id: string) {
        const recruitment = await prisma.recruitments.findUnique({
            where: { id },
        });

        if (!recruitment) {
            throw new AppError("Recruitment not found", 404);
        }

        const newStatus =
            recruitment.status === "active" ? "inactive" : "active";

        return prisma.recruitments.update({
            where: { id },
            data: { status: newStatus },
        });
    }

    /* =========================
       DELETE
    ========================= */

    async deleteRecruitment(id: string) {
        return prisma.$transaction(async (tx) => {
            await tx.recruitment_translations.deleteMany({
                where: { recruitment_id: id },
            });

            return tx.recruitments.delete({
                where: { id },
            });
        });
    }

    async bulkDelete(ids: string[]) {
        if (!ids?.length) {
            throw new AppError("No IDs provided", 400);
        }

        return prisma.$transaction(async (tx) => {
            await tx.recruitment_translations.deleteMany({
                where: { recruitment_id: { in: ids } },
            });

            const deleted = await tx.recruitments.deleteMany({
                where: { id: { in: ids } },
            });

            return {
                deletedCount: deleted.count,
            };
        });
    }
}

export default new RecruitmentService();
