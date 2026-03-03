import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

export interface CreateNavDTO {
    name: string;
    code: string;
    status?: string;
}

export interface UpdateNavDTO {
    name?: string;
    status?: string;
}

export const navService = {
    async create(data: CreateNavDTO) {
        const existing = await prisma.navs.findUnique({
            where: { code: data.code },
        });

        if (existing) {
            throw new AppError("Code đã tồn tại.", 400);
        }

        return prisma.navs.create({
            data: {
                name: data.name,
                code: data.code,
                status: data.status ?? "active",
            },
        });
    },

    async findAll() {
        return prisma.navs.findMany({
            orderBy: { created_at: "desc" },
        });
    },

    async findById(id: string) {
        const nav = await prisma.navs.findUnique({
            where: { id },
        });

        if (!nav) {
            throw new AppError("Nav không tồn tại.", 404);
        }

        return nav;
    },

    async update(id: string, data: UpdateNavDTO) {
        await this.findById(id);

        return prisma.navs.update({
            where: { id },
            data: {
                name: data.name,
                status: data.status,
            },
        });
    },

    async toggleStatus(id: string) {
        const nav = await this.findById(id);

        const newStatus = nav.status === "active" ? "inactive" : "active";

        return prisma.navs.update({
            where: { id },
            data: {
                status: newStatus,
            },
        });
    },

    async delete(id: string) {
        await this.findById(id);

        return prisma.navs.delete({
            where: { id },
        });
    },

    async bulkDelete(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new AppError("Danh sách id không hợp lệ.", 400);
        }

        return prisma.navs.deleteMany({
            where: {
                id: { in: ids },
            },
        });
    },
};
