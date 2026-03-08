import serviceService from "@/services/service.service";
import { Request, Response } from "express";

class ServiceController {
    async createService(req: Request, res: Response) {
        const result = await serviceService.createService(req.body);
        return res.success(result);
    }

    async updateService(req: Request, res: Response) {
        const result = await serviceService.updateService(
            req.params.id as string,
            req.body,
        );
        return res.success(result);
    }

    async listServices(req: Request, res: Response) {
        const result = await serviceService.listServices(req.query);

        return res.success(result);
    }

    async getServiceDetail(req: Request, res: Response) {
        const { slug } = req.params;
        const { lang } = req.query;

        const result = await serviceService.getDetail(
            slug as string,
            typeof lang === "string" ? lang : undefined,
        );

        return res.success(result);
    }

    async getRelatedServices(req: Request, res: Response) {
        const {
            lang,
            serviceId,
            categorySlug,
            isActive,
            limit,
            excludeIds,
            random,
        } = req.query;

        const result = await serviceService.getRelatedServices({
            lang: typeof lang === "string" ? lang : undefined,
            serviceId: typeof serviceId === "string" ? serviceId : undefined,
            categorySlug:
                typeof categorySlug === "string" ? categorySlug : undefined,
            isActive: isActive === "true" ? true : undefined,
            limit: limit as string,
            excludeIds:
                typeof excludeIds === "string"
                    ? excludeIds.split(",").filter(Boolean)
                    : undefined,
            random: random === "true",
        });

        return res.success(result);
    }

    async toggleStatus(req: Request, res: Response) {
        const result = await serviceService.toggleStatus(
            req.params.id as string,
        );
        return res.success(result);
    }

    async deleteService(req: Request, res: Response) {
        const result = await serviceService.deleteService(
            req.params.id as string,
        );
        return res.success(result);
    }

    async getServiceById(req: Request, res: Response) {
        const { id } = req.params;
        const { lang } = req.query;

        const service = await serviceService.getServiceById(
            id as string,
            typeof lang === "string" ? lang : undefined,
        );

        return res.success(service);
    }

    async bulkDeleteServices(req: Request, res: Response) {
        const { ids } = req.body;

        if (!Array.isArray(ids) || !ids.length) {
            return res.status(400).json({
                message: "ids must be a non-empty array",
            });
        }

        await serviceService.bulkDelete(ids);

        return res.success("Services deleted successfully");
    }
}

export default new ServiceController();
