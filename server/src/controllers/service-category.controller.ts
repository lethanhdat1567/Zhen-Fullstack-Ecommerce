import { Request, Response } from "express";
import {
    ServiceCategoryPayload,
    serviceCategoryService,
} from "@/services/service-category.service";

class ServiceCategoryController {
    // =========================
    // CREATE
    // =========================
    async create(req: Request, res: Response) {
        const payload: ServiceCategoryPayload = req.body;

        const result = await serviceCategoryService.create(payload);

        return res.success(result);
    }

    // =========================
    // UPDATE
    // =========================
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const payload: ServiceCategoryPayload = req.body;

        const result = await serviceCategoryService.update(
            id as string,
            payload,
        );

        return res.success(result);
    }

    // =========================
    // TOGGLE STATUS
    // =========================
    async toggleStatus(req: Request, res: Response) {
        const { id } = req.params;

        const result = await serviceCategoryService.toggleStatus(id as string);

        return res.success(result);
    }

    // =========================
    // LIST (SEARCH)
    // =========================
    async list(req: Request, res: Response) {
        const { search, lang, page, limit, isActive } = req.query;

        const result = await serviceCategoryService.list({
            search: search as string | undefined,
            lang: lang as string | undefined,
            page: page as string,
            limit: limit as string,
            isActive: isActive as string,
        });

        return res.success(result);
    }

    // =========================
    // LIST BY LANG
    // =========================

    // =========================
    // DETAIL
    // =========================
    async detail(req: Request, res: Response) {
        const { id } = req.params;
        const { lang } = req.query;

        const result = await serviceCategoryService.detail(
            id as string,
            lang as string | undefined,
        );

        return res.success(result);
    }

    // =========================
    // GET BY SLUG
    // =========================
    async getBySlug(req: Request, res: Response) {
        const { slug } = req.params;
        const { lang } = req.query;

        const result = await serviceCategoryService.getBySlug(
            slug as string,
            lang as string | undefined,
        );

        return res.success(result);
    }

    // =========================
    // DELETE
    // =========================
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const result = await serviceCategoryService.delete(id as string);

        return res.success(result);
    }

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body as { ids: string[] };

        const result = await serviceCategoryService.bulkDelete(ids);

        return res.success(result);
    }
}

export const serviceCategoryController = new ServiceCategoryController();
