import { mediaAlbumService } from "@/services/media-album.service";
import { Request, Response } from "express";

export const mediaAlbumController = {
    async create(req: Request, res: Response) {
        const result = await mediaAlbumService.create(req.body);
        return res.success(result, 201);
    },

    async findAll(req: Request, res: Response) {
        try {
            const { lang, search, categorySlug, isActive, page, limit } =
                req.query;

            const result = await mediaAlbumService.findAll({
                lang: typeof lang === "string" ? lang : undefined,
                search: typeof search === "string" ? search : undefined,
                categorySlug:
                    typeof categorySlug === "string" ? categorySlug : undefined,
                isActive: isActive === "true" ? true : undefined,
                page: page as string,
                limit: limit as string,
            });

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { lang } = req.query;

            const result = await mediaAlbumService.findById(
                id as string,
                lang as string | undefined,
            );

            if (!result) {
                return res.error("Media album not found", 404);
            }

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },
    async findBySlug(req: Request, res: Response) {
        const { slug } = req.params;
        const { lang } = req.query;

        const result = await mediaAlbumService.findBySlug({
            slug: slug as string,
            lang: typeof lang === "string" ? lang : undefined,
        });

        return res.success(result);
    },

    async toggleStatus(req: Request, res: Response) {
        const { id } = req.params;

        const result = await mediaAlbumService.toggleStatus(id as string);

        return res.success(result);
    },
    async update(req: Request, res: Response) {
        try {
            const result = await mediaAlbumService.update(
                req.params.id as string,
                req.body,
            );

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async delete(req: Request, res: Response) {
        try {
            await mediaAlbumService.delete(req.params.id as string);
            return res.success({ message: "Deleted successfully" });
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;

        const result = await mediaAlbumService.bulkDelete(ids);

        return res.success(result);
    },
};
