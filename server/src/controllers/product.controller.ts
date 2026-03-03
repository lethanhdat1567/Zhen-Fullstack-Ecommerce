import productService from "@/services/product.service";
import { Request, Response } from "express";

class ProductController {
    async createProduct(req: Request, res: Response) {
        const result = await productService.createProduct(req.body);
        return res.success(result);
    }

    async updateProduct(req: Request, res: Response) {
        const result = await productService.updateProduct(
            req.params.id as string,
            req.body,
        );
        return res.success(result);
    }

    async listProducts(req: Request, res: Response) {
        const { search, lang, page, limit, categorySlug, isActive } = req.query;

        const result = await productService.listProducts({
            search: typeof search === "string" ? search : undefined,
            lang: typeof lang === "string" ? lang : undefined,
            categorySlug:
                typeof categorySlug === "string" ? categorySlug : undefined,
            isActive: isActive === "true" ? true : undefined,
            page: page as string,
            limit: limit as string,
        });

        return res.success(result);
    }

    async getProductDetail(req: Request, res: Response) {
        const { slug } = req.params;
        const { lang } = req.query;

        const result = await productService.getDetail(
            slug as string,
            typeof lang === "string" ? lang : undefined,
        );

        return res.success(result);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const { lang } = req.query;

        const product = await productService.getById(
            id as string,
            lang as string | undefined,
        );

        if (!product) {
            return res.error("Product not found");
        }

        return res.success(product);
    }

    async getRelatedProducts(req: Request, res: Response) {
        const {
            lang,
            productId,
            categorySlug,
            isActive,
            limit,
            excludeIds,
            random,
            samePriceRange,
        } = req.query;

        const result = await productService.getRelatedProducts({
            lang: typeof lang === "string" ? lang : undefined,
            productId: typeof productId === "string" ? productId : undefined,
            categorySlug:
                typeof categorySlug === "string" ? categorySlug : undefined,
            isActive: isActive === "true" ? true : undefined,
            limit: limit as string,
            excludeIds:
                typeof excludeIds === "string"
                    ? excludeIds.split(",")
                    : undefined,
            random: random === "true",
            samePriceRange: samePriceRange === "true",
        });

        return res.success(result);
    }

    async toggleStatus(req: Request, res: Response) {
        const result = await productService.toggleStatus(
            req.params.id as string,
        );
        return res.success(result);
    }

    async deleteProduct(req: Request, res: Response) {
        const result = await productService.deleteProduct(
            req.params.id as string,
        );
        return res.success(result);
    }

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;

        const result = await productService.bulkDelete(ids);
        return res.success(result);
    }
}

export default new ProductController();
