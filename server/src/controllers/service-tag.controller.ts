import {
    ServiceTagPayload,
    serviceTagService,
} from "@/services/service-tag.service";
import { Request, Response } from "express";

class ServiceTagController {
    async create(req: Request, res: Response) {
        const payload: ServiceTagPayload = req.body;
        const result = await serviceTagService.create(payload);
        return res.success(result);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const payload: ServiceTagPayload = req.body;
        const result = await serviceTagService.update(id as string, payload);
        return res.success(result);
    }

    async list(req: Request, res: Response) {
        const { lang, search } = req.query as {
            lang?: string;
            search?: string;
        };

        const result = await serviceTagService.list({ lang, search });
        return res.success(result);
    }

    async detail(req: Request, res: Response) {
        const { id } = req.params;
        const result = await serviceTagService.detail(id as string);
        return res.success(result);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await serviceTagService.delete(id as string);
        return res.success(true);
    }
}

export const serviceTagController = new ServiceTagController();
