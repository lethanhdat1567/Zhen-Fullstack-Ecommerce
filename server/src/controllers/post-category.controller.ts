import postCategoryService from "@/services/post-category.service";
import { Request, Response } from "express";

class PostCategoryController {
    async createCategory(req: Request, res: Response) {
        const result = await postCategoryService.createCategory(req.body);
        return res.success(result);
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params;

        const result = await postCategoryService.updateCategory(
            id as string,
            req.body,
        );

        return res.success(result);
    }

    async listCategories(req: Request, res: Response) {
        const { lang, search, page, limit, isActive } = req.query;

        const result = await postCategoryService.listCategories({
            lang: typeof lang === "string" ? lang : undefined,
            search: typeof search === "string" ? search : undefined,
            isActive: isActive === "true" ? true : undefined,
            page: page as string,
            limit: limit as string,
        });

        return res.success(result);
    }

    async getDetail(req: Request, res: Response) {
        const { slug } = req.params;
        const { lang } = req.query;

        const result = await postCategoryService.getDetail(
            slug as string,
            typeof lang === "string" ? lang : undefined,
        );

        return res.success(result);
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { lang } = req.query;

            const result = await postCategoryService.getById(
                id as string,
                lang as string | undefined,
            );

            if (!result) {
                return res.status(404).error("Category not found");
            }

            return res.success(result);
        } catch (error: any) {
            return res.status(500).error(error.message);
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;

        const result = await postCategoryService.deleteCategory(id as string);

        return res.success(result);
    }
    async bulkDeleteCategory(req: Request, res: Response) {
        const { ids } = req.body;

        if (!Array.isArray(ids) || !ids.length) {
            return res.status(400).error("Ids must be a non-empty array");
        }

        const result = await postCategoryService.bulkDeleteCategory(ids);

        return res.success(result);
    }

    async toggleStatus(req: Request, res: Response) {
        const { id } = req.params;

        const result = await postCategoryService.toggleStatus(id as string);

        return res.success(result);
    }
}

export default new PostCategoryController();
