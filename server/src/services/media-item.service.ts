import { prisma } from "@/lib/prisma";

export interface CreateMediaItemDTO {
    album_id: string;
    type: string; // image | video
    file_url: string;
    sort_order?: number;
}

export interface UpdateMediaItemDTO {
    type?: string;
    file_url?: string;
    sort_order?: number;
}

export const mediaItemService = {
    async create(data: CreateMediaItemDTO) {
        return prisma.media_items.create({
            data: {
                album_id: data.album_id,
                type: data.type,
                file_url: data.file_url,
                sort_order: data.sort_order ?? 0,
            },
        });
    },

    async createMany(items: CreateMediaItemDTO[]) {
        return prisma.media_items.createMany({
            data: items,
        });
    },

    async findByAlbum(albumId: string) {
        return prisma.media_items.findMany({
            where: { album_id: albumId },
            orderBy: {
                sort_order: "asc",
            },
        });
    },

    async update(id: string, data: UpdateMediaItemDTO) {
        return prisma.media_items.update({
            where: { id },
            data,
        });
    },

    async delete(id: string) {
        return prisma.media_items.delete({
            where: { id },
        });
    },
};
