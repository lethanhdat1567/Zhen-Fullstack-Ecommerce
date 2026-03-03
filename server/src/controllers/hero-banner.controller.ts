import { heroBannerService } from "@/services/hero-banner.service";
import { Request, Response } from "express";

export const heroBannerController = {
    async create(req: Request, res: Response) {
        const result = await heroBannerService.create(req.body);
        return res.success(result, 201);
    },

    async findAll(req: Request, res: Response) {
        try {
            const result = await heroBannerService.findAll();
            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async findOne(req: Request, res: Response) {
        try {
            const result = await heroBannerService.findById(
                req.params.id as string,
            );

            if (!result) {
                return res.error("Banner không tồn tại", 404);
            }

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async update(req: Request, res: Response) {
        const result = await heroBannerService.update(req.body);
        return res.success(result);
    },

    async delete(req: Request, res: Response) {
        await heroBannerService.delete(req.params.id as string);
        return res.success({ message: "Xóa thành công" });
    },

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;
        const result = await heroBannerService.bulkDelete(ids);
        return res.success(result);
    },
};
