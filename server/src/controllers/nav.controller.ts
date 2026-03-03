import { Request, Response } from "express";
import { navService } from "@/services/nav.service";

export const navController = {
    async create(req: Request, res: Response) {
        const result = await navService.create(req.body);
        return res.success(result, 201);
    },

    async findAll(req: Request, res: Response) {
        const result = await navService.findAll();
        return res.success(result);
    },

    async findOne(req: Request, res: Response) {
        const result = await navService.findById(req.params.id as string);
        return res.success(result);
    },

    async update(req: Request, res: Response) {
        const result = await navService.update(
            req.params.id as string,
            req.body,
        );

        return res.success(result);
    },
    async toggleStatus(req: Request, res: Response) {
        const result = await navService.toggleStatus(req.params.id as string);

        return res.success(result);
    },

    async delete(req: Request, res: Response) {
        await navService.delete(req.params.id as string);
        return res.success({ message: "Xóa thành công" });
    },

    async bulkDelete(req: Request, res: Response) {
        const result = await navService.bulkDelete(req.body.ids);
        return res.success(result);
    },
};
