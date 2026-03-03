import productCategoryService from "@/services/product-category.service";
import { Request, Response } from "express";

class ProductCategoryController {
    async createCategory(req: Request, res: Response) {
        const result = await productCategoryService.createCategory(req.body);
        return res.success(result);
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params;
        const result = await productCategoryService.updateCategory(
            id as string,
            req.body,
        );
        return res.success(result);
    }

    async listCategories(req: Request, res: Response) {
        const { lang, search, isActive } = req.query;

        const result = await productCategoryService.listCategories({
            lang: typeof lang === "string" ? lang : undefined,
            search: typeof search === "string" ? search : undefined,
            isActive: isActive as string,
        });

        return res.success(result);
    }

    async getDetail(req: Request, res: Response) {
        const { slug } = req.params;
        const { lang } = req.query;

        const result = await productCategoryService.getDetail(
            slug as string,
            typeof lang === "string" ? lang : undefined,
        );

        return res.success(result);
    }

    async getDetailById(req: Request, res: Response) {
        const { id } = req.params;
        const { lang } = req.query;

        const category = await productCategoryService.getById(
            id as string,
            lang as string | undefined,
        );

        return res.success(category);
    }

    async toggleStatus(req: Request, res: Response) {
        const { id } = req.params;

        const result = await productCategoryService.toggleStatus(id as string);

        return res.success(result);
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        const result = await productCategoryService.deleteCategory(
            id as string,
        );
        return res.success(result);
    }

    async bulkDeleteCategory(req: Request, res: Response) {
        const { ids } = req.body;

        const result = await productCategoryService.bulkDeleteCategory(ids);

        return res.success(result);
    }
}

export default new ProductCategoryController();
