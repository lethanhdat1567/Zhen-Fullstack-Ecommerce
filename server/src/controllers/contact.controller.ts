import { contactService } from "@/services/contact.service";
import { Request, Response } from "express";

export const contactController = {
    async create(req: Request, res: Response) {
        const result = await contactService.create(req.body);
        return res.success(result, 201);
    },

    async findAll(req: Request, res: Response) {
        try {
            const { search } = req.query;

            const result = await contactService.findAll({
                search: search as string | undefined,
            });

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const result = await contactService.findById(id as string);

            if (!result) {
                return res.error("Liên hệ không tồn tại", 404);
            }

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async delete(req: Request, res: Response) {
        await contactService.delete(req.params.id as string);
        return res.success({ message: "Xóa thành công" });
    },

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;

        const result = await contactService.bulkDelete(ids);

        return res.success(result);
    },
};
