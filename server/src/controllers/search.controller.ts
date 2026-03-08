import { searchService } from "@/services/search.service";
import { Request, Response } from "express";

export const searchController = {
    async suggest(req: Request, res: Response) {
        try {
            const { q, lang } = req.query;

            const result = await searchService.suggest({
                q: q as string | undefined,
                lang: lang as string | undefined,
            });

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async search(req: Request, res: Response) {
        try {
            const { q, lang, page, limit } = req.query;

            const result = await searchService.search({
                q: q as string | undefined,
                lang: lang as string | undefined,
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 10,
            });

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },
};
