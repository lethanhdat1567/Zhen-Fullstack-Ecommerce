import { popupService } from "@/services/popup.service";
import { Request, Response } from "express";

export const popupController = {
    async create(req: Request, res: Response) {
        const result = await popupService.create(req.body);
        return res.success(result, 201);
    },

    async findAll(req: Request, res: Response) {
        try {
            const { search, status, lang } = req.query;

            const result = await popupService.findAll({
                search: search as string | undefined,
                status: status as string | undefined,
                lang: lang as string | undefined,
            });

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async findOne(req: Request, res: Response) {
        try {
            const lang = req.query.lang as string | undefined;

            const result = await popupService.findById(
                req.params.id as string,
                lang,
            );

            if (!result) {
                return res.error("Popup không tồn tại", 404);
            }

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async update(req: Request, res: Response) {
        try {
            const result = await popupService.update(
                req.params.id as string,
                req.body,
            );

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async toggleStatus(req: Request, res: Response) {
        const result = await popupService.toggleStatus(req.params.id as string);
        return res.success(result);
    },

    async reorder(req: Request, res: Response) {
        const { items } = req.body;

        const result = await popupService.reorder(items);

        return res.success(result);
    },

    async delete(req: Request, res: Response) {
        await popupService.delete(req.params.id as string);
        return res.success({ message: "Xóa thành công" });
    },

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;
        const result = await popupService.bulkDelete(ids);
        return res.success(result);
    },
};
