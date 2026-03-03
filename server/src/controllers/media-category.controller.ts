import { mediaCategoryService } from "@/services/media-category.service";
import { Request, Response } from "express";

export const mediaCategoryController = {
    async create(req: Request, res: Response) {
        const result = await mediaCategoryService.create(req.body);
        return res.success(result, 201);
    },

    async findAll(req: Request, res: Response) {
        try {
            const { lang, search, page, limit, isActive } = req.query;

            const result = await mediaCategoryService.findAll({
                lang: typeof lang === "string" ? lang : undefined,
                search: typeof search === "string" ? search : undefined,
                isActive: isActive === "true" ? true : undefined,
                page: page as string,
                limit: limit as string,
            });

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async findBySlug(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            const { lang } = req.query;

            const result = await mediaCategoryService.findBySlug(
                slug as string,
                typeof lang === "string" ? lang : undefined,
            );

            if (!result) {
                return res.error("Media category not found", 404);
            }

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { lang } = req.query;

            const result = await mediaCategoryService.findById(
                id as string,
                lang as string | undefined,
            );

            if (!result) {
                return res.error("Media category not found", 404);
            }

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async toggleStatus(req: Request, res: Response) {
        const { id } = req.params;

        const result = await mediaCategoryService.toggleStatus(id as string);

        return res.success(result);
    },
    async update(req: Request, res: Response) {
        try {
            const result = await mediaCategoryService.update(
                req.params.id as string,
                req.body,
            );

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async delete(req: Request, res: Response) {
        await mediaCategoryService.delete(req.params.id as string);
        return res.success({ message: "Deleted successfully" });
    },
    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;

        const result = await mediaCategoryService.bulkDelete(ids);

        return res.success(result);
    },
};
